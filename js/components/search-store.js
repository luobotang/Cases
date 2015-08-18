// 查询模块，使得能够根据用户输入信息查找指定患者的相关信息
// 病例列表

var $ = require('jquery');
var CasesWebUtils = require('../utils/CasesWebUtils');

var caselist;
CasesWebUtils.getCaseList().done(function (data) {
	caselist = data;
});

/*
 * 查询满足条件的路径
 * @param {string} condition - 可以是空格分隔的多个查询条件
 * @returns {Array[]|null} 成功返回匹配结果数组[[path, matchReplacePath], ...]，失败返回 null
 */
function searchPath(condition) {
	if (!caselist || !condition) {
		return null;
	}

	var cons = condition.split(/\s+/);
	var reg = new RegExp(cons.join('|'), 'g');

	// 从后向前查找，先返回最新的内容
	return caselist.reduce(function (result, path) {
		var success = 0;
		var replace = path.replace(reg, function (match) {
			success++;
			return "<em>" + match + "</em>";
		});
		if (success > 0)  {
			result.push([path, replace]);
		}
		return result;
	}, []);
}

// 查询路径
function queryPath(name, done) {
	// 未初始化病例列表时，先进行初始化
	if (caselist) {
		done(findPath(name));
	}

	CasesWebUtils.getCaseList()
		.done(function (data) {
			caselist = data;
			done(findPath(name));
		}).fail(function () {
			done(null);
		});
}

function findPath(path) {
	var index = caselist.indexOf(path); // Array.prototype.indexOf() IE9+
	return index > -1 ? caselist[index] : null;
}

function getCaseInfo(path) {
	return CasesWebUtils.getCaseInfo(path);
}

module.exports = {
	queryPath: queryPath,
	getCaseInfo: getCaseInfo,
	searchPath: searchPath
};