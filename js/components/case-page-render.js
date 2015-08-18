// 根据输入的患者数据，生成渲染页面

var $ = require('jquery');

var CasePage = require('./case-page-template');
var CaseImages = require('../configs/case-page-config-case-images');
var EnglishTerms = require('../configs/case-page-config-english-terms');
var ReferenceImages = require('../configs/case-page-config-reference-images');

function renderData(key, value) {

	var hasImg = "", showImg = "", en = "";

	if (ReferenceImages[key]) {
		hasImg = " has_img";
		showImg = ' data-img-src="' + ReferenceImages[key] + '"';
	}

	if (EnglishTerms[key]) {
		en = "<br /><span class='en'>" + EnglishTerms[key] + "</span>";
	}

	// 牙列以对象方式记录，包含“上”、“下”属性
	if ($.isPlainObject(value)) {
		value = renderDentition(value);
	} else if ($.isArray(value)) {
		value = value.join("<br />");
	}

	return (
	'<div class="record">' +
		'<div class="key">' + 
			"<span class='name" + hasImg + "'" + showImg + ">" + key + "</span>" + en + 
		'</div>' +
		'<div class="value">' + value + '</div>' +
	'</div>'
	);
};

function renderList(id, item) {
	return "<li><p>" + parseArray(item) + "</p></li>";
};

function renderDentition(item) {
	return "<table class='dentition'>" +
		renderDetitionRow(item["上"]) +
		renderDetitionRow(item["下"]) +
	"</table>";
}

function renderDetitionRow(text) {
	var array = text.split("|");
	var span = "<span class='null'></span>";
	if (!array || array.length !== 2) {
		return "<tr>" +
			"<td>" + span + "</td>" +
			"<td>" + span + "</td>" +
		"</tr>";
	} else {
		return "<tr>" +
			"<td>" + ($.trim(array[0]) || span) + "</td>" +
			"<td>" + ($.trim(array[1]) || span) + "</td>" +
		"</tr>";
	}
}

function renderRecords(name, mValue) {

	// timeString("↓", 3) -> "↓↓↓"
	function timeString(str, num) {
		var s = "";
		while (--num >= 0) { s += str; }
		return s;
	}

	// 根据测量值偏离正常范围的程度进行渲染
	function renderValue() {
		var times = Math.floor(Math.abs(std_v - value) / v_ran);
		var cls = "", flag = "";
		if (times > 0 && value < std_v) {
			cls = "low"; flag = timeString("↓", times);
		} else if (times > 0 && value > std_v) {
			cls = "high"; flag = timeString("↑", times);
		}
		return "<span class='" + cls + "'>" + value + " " + flag + "</span>";
	}

	var std_v = mValue[0],
	    v_ran = mValue[1],
	    value = mValue[2],
	    renderedValue = renderValue();

	return  "<tr>" +
				"<td>" + name + "</td>" +
				"<td>" + std_v + " ± " + v_ran + "</td>" +
				"<td>" + renderedValue + "</td>" +
			"</tr>";
};

function parseArray(obj) {
	return $.isArray(obj) ? obj.join("<br />") : obj;
}

function renderPage(caseObj, path) {
	caseImgs = CaseImages.from(path)
	var baseUrl = "";
	return CasePage.replace(
	// 返回由数据填充的 html 文本
	// 1. img
	/{img-([^}]+)}/g, function (match, name) {
		var img = caseImgs[name];
		if (img) {
			return '<img src="' + img + '">';
		}
	}).replace(
	// 2. data
	/{data-([^}]+)}/g, function (match, name) {
		var obj = caseObj[name],
			html, item;
		if (obj) {
			html = "";
			for (item in obj) {
				if (obj.hasOwnProperty(item)) {
					html += renderData(item, obj[item]);
				}
			}
			return html;
		}
	}).replace(
	// 3. list
	/{list-([^}]+)}/g, function (match, name) {
		var list = caseObj[name],
			html = "";
		if (list) {
			list.forEach(function (item, index) {
				html += renderList(index, item);
			});
		}
		return html;
	}).replace(
	// 4.records
	/{record-([^}]+)}/g, function (match, name) {
		var records = caseObj[name], html, item;
		if (records) {
			html = "";
			for (item in records) {
				if (records.hasOwnProperty(item)) {
					html += renderRecords(item, records[item]);
				}
			}
			return html;
		}
	})
	// 5.图像路径
	.replace(/{url-([^}]+)}/g, function (match, name) {
		return caseImgs[name];
	});
};

module.exports = {
	render: renderPage
};