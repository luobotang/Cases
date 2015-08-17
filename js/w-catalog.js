// params will change the default setting of Catalog

var $ = require('jquery');

var items, activeItemIndex = -1,
	// 目录结构部件
	catalog, catalog_head, catalog_body, catalog_foot;

function toggleBodyDisplay () {
	catalog_body.toggle();
};

// 搜索所有的标题（h1-h6），生成对应的链接项添加到目录中
function searchAndInsertTocItems() {
	// 记录当前处理的各级标题编号
	var sectNums = [0, 0, 0, 0, 0, 0];
	function clearLowLevelSects(level) {
		for (var i = level; i < 6; i++) {
			sectNums[i] = 0;
		}
	}
	function getSectNum(level) {
		return sectNums.slice(0, level).join(".");
	}

	var headings = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
	// 构建数组后进行排序、处理
	[].slice.call(headings, 0).sort(function (a, b) {
		// 根据距文档顶部距离进行排序
		return a.offsetTop - b.offsetTop;
	}).forEach(function (head, index, heads) {
		// 依次处理每个标题元素
		var level = parseInt(head.tagName.charAt(1));
		sectNums[level - 1]++;
		clearLowLevelSects(level);
		var sectNum = getSectNum(level);
		
		// 用于包裹原有标题的 <a>
		var anchor = document.createElement("a");
		anchor.id = "TOC" + sectNum;
		head.parentNode.insertBefore(anchor, head);
		anchor.appendChild(head);
		
		// 作为目录项链接原标题的 <a>
		var headHtml = head.innerHTML.match(/^[^<]*/)[0];
		var link = $("<a>", {
			href: "#TOC" + sectNum,
			title: headHtml
		}).html(headHtml);

		// 包裹目录项的 <div>，便于设置样式
		var entry = $("<div>", {
			"class": "item level" + level
		});
		entry.append(link);
		catalog_body.append(entry);
		
		// 记录目录项信息到数组，用于页面滚动时查找、激活
		items.push({
			element: entry,
			linkObj: anchor
		});
	});
};

// 遍历目录项，返回当前活动目录项的索引位置
// 未找到返回 -1
function getActiveItemIndex(scrollTop) {
	var max = items.length - 1, min = 0;
	// 尽量减小查找范围
	if (activeItemIndex !== -1) {
		var curr = items[activeItemIndex].linkObj.offsetTop;
		if (curr > scrollTop) {
			max = activeItemIndex;
		} else {
			min = activeItemIndex;
		}
	}
	// 从后向前查找，返回第一个满足条件的位置
	for (var i = max; i >= min; --i) {
		if (items[i].linkObj.offsetTop <= scrollTop) {
			return i;
		}
	}
	return -1;
}

function onScroll(e) {
	// 确保目录已初始化
	if (items && items.length) {
		// 当前页面的滚动距离
		var scrollTop = document.documentElement.scrollTop + 
						document.body.scrollTop;
		if (scrollTop > 86/*页面头部高度*/) { 
			catalog.addClass("fixed");
		} else {
			catalog.removeClass("fixed");
		}
		// 还未滚动到目录第一项的范围
		if (activeItemIndex === -1 && items[0].linkObj.offsetTop > scrollTop) {
			return;
		} else if (activeItemIndex !== -1) {
			items[activeItemIndex].element.removeClass("active");
		}
		activeItemIndex = getActiveItemIndex(scrollTop);
		if (activeItemIndex !== -1) {
			items[activeItemIndex].element.addClass("active");
		}
	}
}

window.addEventListener('scroll', onScroll);

function create() {
	// 如已有 catalog 部件，先移除
	var tmp = $('#catalog'); if (tmp) { tmp.remove(); }

	catalog = $("<div>", {
		id: 'catalog'
	});
	catalog_head = $("<div>", {
		"class": 'catalog_head',
		click: toggleBodyDisplay
	});
	catalog_body = $("<div>", {
		"class": 'catalog_body'
	});
	catalog_foot = $("<div>", {
		"class": 'catalog_foot'
	});
	var btn_close = $("<div>", {
		"class": "catalog_close",
		click: function () { catalog.hide(); }
	}).html("×");
	catalog.append(catalog_head, catalog_body, catalog_foot, btn_close);

	items = [];
	searchAndInsertTocItems();
	$(document.body).append(catalog);
}
module.exports = {
	create: create
};
