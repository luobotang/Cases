// 图片全屏预览组件
define(['m-view_image'], function (ViewImage) {

	var box = $("<div>", {
		"class": "image_view",
		click: close
	});
	var box_bg = $("<div>", {
		"class": "image_view_bg"
	});
	var view_img;

	function show(img_src) {
		view_img = new ViewImage(img_src);
		box.append(view_img);
		box.show();
	};

	function close() {
		if (view_img) { // clear img
			$(view_img).remove();
			view_img = null;
		}
		box.hide();
	};

	// add handler on box no use, don't know why
	$(document.body).keydown(function (e) {
		if (e.keyCode == 27 /* ESC */) close();
	});

	box.hide().append(box_bg).appendTo(document.body);

	return {
		show: show
	};

});
