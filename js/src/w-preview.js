// 页面部件：就诊患者基本信息
define(function () {

	// 页面预览部件的 HTML 结构
	var struct = "<div class='preview_img_wrapper'>" +
		"<img src='{img}'></img></div>" +
		"<div class='preview_info'><p>姓名：<span class='name'>{name}</span></p>" +
		"<p>初诊日期：<span class='date'>{date}</span></p></div>";

	// 根据目录，提取就诊患者相关信息，用于生成 HTML
	// path like: 
	// >>  20140130-张三
	// 前面部分为就诊日期，后面部分为姓名
	function renderHTML(path) {
		var parts = path.split("-");
		return struct.replace( // 头像
			"{img}", "cases/" + path + "/正面-微笑.jpg"
			).replace( // 名称
			"{name}", parts[1]
			).replace( // 日期
			"{date}", parts[0]);
	}

	return {
		create: function (path) {
			return $("<div>", {
				"class": "case_preview fix-float"
			}).html(renderHTML(path));
		}
	}
});