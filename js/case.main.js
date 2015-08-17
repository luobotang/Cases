// 根据传入页面的查询字符串显示对应的患者初诊页面

var $ = require('jquery');

var ImageViewer = require('./w-image_viewer');
var PageRender = require('./m-page_render');
var CaseImgs = require('./v-case_imgs');
var Catalog = require('./w-catalog');
var CaseQuery = require('./m-case_query');

function initImgs() {
	$("img").each(function () {
		var src = decodeURI($(this).attr("src"));
		$(this).attr({ title: src, alt: src });
	});
}

$(document.body).click(function (e) {
	var target = e.target;
    if (target.tagName == 'IMG' /* always uppercase for HTML */ && target.src) {
        ImageViewer.show(target.src);
    }
});

// 根据查询字符串的内容获取路径
var p = decodeURIComponent(window.location.search.replace("?p=", ""));

CaseQuery.getCaseInfo(p, function (data, path) {
	document.title = data["基本信息"]["姓名"] + " - " + document.title;
	$("#content").html(PageRender.render(data, CaseImgs.from(path)));
	Catalog.create();
	initImgs();
}, function () {
	$("#content").html("抱歉，没有查找到相关信息");
});
