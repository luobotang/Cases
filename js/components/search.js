var $ = require('jquery');

var Preview = require('./search-preview');
var Store = require('./search-store');

var $container;

function showMessage(message) {
	$container.find('.query_message').html(message).show();
}

function hideMessage() {
	$container.find('.query_message').hide();
}

function showPreview(path) {
	$container.find('.preview').html(Preview.create(path)).show();
}

function hidePreview() {
	$container.find('.preview').hide();
}

function showPrompt(prompts) {
	if (prompts && prompts.length) {
		$container
			.find('.prompt')
			.html('<ul>' + 
				prompts.map(function (item) {
					return '<li class="case-prompt-item" data-path="' + item[0] + '">' +
						item[1] +
						'<li>';
				}).join('') + 
				'</ul>')
			.show();
	} else {
		hidePrompt();
	}
}

function hidePrompt() {
	$container.find('.prompt').hide();
}

function getCondition() { return $container.find('input').val().trim(); }
function setCondition(val) { $container.find('input').val(val); }

function queryCase(name) {
	Store.queryPath(name, function (path) {
		if (path) {
			window.open("case.htm?p=" + encodeURIComponent(name), '_blank');
		} else {
			showMessage("没有找到相关的数据，检查一下是否输入有误？");
		}
	});
}

/*
 * @param {selector} container
 */
function init(container) {
	$container = $(container)
		.on('click', '.query_go', function () {
			hidePrompt();
			hideMessage();
			queryCase(getCondition());
		})
		.on('keyup', 'input', function () {
			var value = getCondition();
			hidePreview();
			hideMessage();
			if (value) {
				showPrompt(Store.searchPath(value));
			} else {
				hidePrompt();
			}
		})
		.on('click', '.case-prompt-item', function (e) {
			var path = $(e.currentTarget).attr('data-path');
			setCondition(path);
			showPreview(path);
			hidePrompt();
		})
		.on('click', '.query_message', function (e) {
			$(e.currentTarget).hide();
		});

	hidePrompt();
	hideMessage();
	hidePreview();

	return this;
}

module.exports = {
	init: init 
};
