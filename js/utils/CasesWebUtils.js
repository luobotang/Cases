var $ = require('jquery')

var URL_CASE_LIST = "cases/caselist.txt"

module.exports = {

	getCaseList: function () {
		var d = $.Deferred();
		$.get(URL_CASE_LIST)
			.done(function (data) {
				if (typeof data === 'string') {
					caselist = data.split("\r\n")
						.filter(Boolean) // 去除空串
						.sort()
						.reverse(); // 最新数据放在前
					d.resolve(caselist);
				}
			})
			.always(function () {
				d.reject();
			});
		return d.promise();
	},

	getCaseInfo: function (path) {
		var d = $.Deferred();
		$.getJSON('cases/' + path + '/case.txt')
			.done(function (data) {
				if (data) {
					d.resolve(data);
				}
			}).fail(function () {
				d.reject();
			});
		return d.promise();
	}
}