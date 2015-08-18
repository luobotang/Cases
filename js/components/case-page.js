var $ = require('jquery');
var UrlUtils = require('xsm-url-utils');
var ImageViewer = require('image-viewer');

var PageRender = require('./case-page-render');
var Catalog = require('./catalog');
var SearchStore = require('./search-store');

var PARAM_PATH = 'p';
var pageInfoContainer = "#content";

function initImgs() {
	$("img").each(function () {
		var src = decodeURI($(this).attr("src"));
		$(this).attr({ title: src, alt: src });
	});
}

function initEvents() {
	$(pageInfoContainer).on('click', 'img', function (e) {
		var src = e.target.src;
		if (src) {
			ImageViewer.show(src);
		}
	}).on('click', '.has_img, .img_link', function (e) {
		var src = $(e.target).attr('data-img-src');
		if (src) {
			ImageViewer.show(src);
		}
	});
}

function onFail() {
	$(pageInfoContainer).html("抱歉，没有查找到相关信息");
}

exports.init = function () {
	var path = UrlUtils.getParam(location.href, PARAM_PATH);
	if (!path) {
		return onFail();
	}

	SearchStore.getCaseInfo(path)
		.done(function (data) {
			document.title = data["基本信息"]["姓名"];
			$(pageInfoContainer).html(PageRender.render(data, path));
			Catalog.create();
			initEvents();
			initImgs();
		}).fail(onFail);
};