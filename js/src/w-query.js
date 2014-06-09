// 查询部件
define(["w-preview"], function (w_pre) {

	// 构造查询部件的各个组成元素
	// 查询部件
	var ele_imgbg = $("<div>", {
		"class": "query_imgbg"
	});
	var ele_input = $("<div>", {
		"class": "query"
	});
	var ele_con = $("<input>", {
		"class": "query_condition",
		placeholder: "输入查询对象的就诊日期、姓名，例如：20140101 王伟"
	});
	var ele_btn = $("<span>", {
		"class": "query_go"
	});
	ele_con.appendTo(ele_input);
	ele_btn.appendTo(ele_input);
	// 输入提示
	var ele_prompt = $("<div>", {
		"class": "prompt",
		// 选择某条提示后，将提示的路径填入文本框，并显示预览
		click: function (e) {
			var t = e.target, path;
			if (t.tagName === "LI") {
				path = t.innerHTML.replace(/<[^>]*>/g, "");
				ele_con.val(path);
				showPreview(path);
				hidePrompt();
			}
		}
	});
	// 预览部件
	var ele_pre = $("<div>");
	// 消息部件
	var ele_message = $("<div>", {
		"class": "query_message",
		click: function () {
			ele_message.hide();
		}
	})
	
	function showMessage(message) {
		ele_message.html(message);
		ele_message.show();
	}
	function hideMessage() {
		ele_message.hide();
	}
	function showPreview(path) {
		ele_pre.html("");
		ele_pre.append(w_pre.create(path));
		ele_pre.show();
	}
	function hidePreview() {
		ele_pre.hide();
	}
	// 显示输入提示
	function showPrompt(prompts) {
		if (prompts && prompts.length) {
			ele_prompt.html(prompts.reduce(
			function (html, item) {
				return html + "<li>" + item + "</li>";
			}, "<ul>") + "</ul>");
			ele_prompt.show();
		} else {
			hidePrompt();
		}
	}
	function hidePrompt() {
		ele_prompt.hide();
	}

	return {
		// 初始化查询部件
		// @queryFunc 执行查询的函数
		// @genPromptsFunc 用于生成输入提示的函数
		init: function (queryFunc, genPromptsFunc) {
			// 执行查询
			ele_btn.click(function () {
				hidePrompt();
				hideMessage();
				queryFunc(ele_con.val());
			});
			ele_con.keyup(function () {
				var value = ele_con.val().trim();
				hidePreview();
				hideMessage();
				if (value) {
					showPrompt(genPromptsFunc(value));
				} else {
					hidePrompt();
				}
			});
			hidePrompt();
			hideMessage();
			hidePreview();
		},
		// 将部件添加到页面包裹元素中
		appendTo: function (element) {
			$(element).addClass("case_query").append(
				ele_imgbg, ele_input, ele_prompt, ele_pre, ele_message );
		},
		showMessage: showMessage
	};
});
