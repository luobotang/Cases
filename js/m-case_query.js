// 查询模块，使得能够根据用户输入信息查找指定患者的相关信息
// 病例列表

var $ = require('jquery');
var CasesWebUtils = require('./utils/CasesWebUtils');

var caselist;
CasesWebUtils.getCaseList().done(function (data) {
	caselist = data;
});

// 根据条件查询病例列表，返回满足条件的病例的路径
// replaceFunc 用于对病例路径进行替换
function getCasePaths(condition, replaceFunc) {
	replaceFunc = replaceFunc || function (value) {
		return "<em>" + value + "</em>";
	};
	var cons = condition.split(/\s+/);
	if (!(cons && cons.length)) {
		return [];
	}
	// 从后向前查找，先返回最新的内容
	return caselist.reduceRight(function (result, item) {
		var success = 0, fail = 0;
		var rep = cons.reduce(function (replacement, con) {
			if (replacement.search(con) >= 0) {
				success++;
				return replacement.replace(con, replaceFunc);
			} else {
				fail++;
				return replacement;
			}
		}, item);
		// 匹配成功的次数不小于失败次数
		if (success + fail > 0 && success >= fail)  {
			result.push(rep);
		}
		return result;
	}, []);
}

// 查询路径
function queryPath(name, done) {
	// 未初始化病例列表时，先进行初始化
	if (caselist) {
		findPathThen(name, done);
	}

	CasesWebUtils.getCaseList()
		.done(function (data) {
			caselist = data;
			findPathThen(name, done);
		}).fail(function () {
			done(null);
		});
}

function findPathThen(path, done) {
	var index = findePath(name);
	return done(index > -1 ? caselist[index] : null);
}

function findePath(path) {
	name = name.trim();
	// 从后向前查找，首先返回最后录入的内容
	for (var i = caselist.length - 1; i >= 0; i--) {
		var path = caselist[i];
		if (path === name) {
			return i;
		}
	}
	return -1;
}

function getCaseInfo(path) {
	return CasesWebUtils.getCaseInfo(path);
}

module.exports = {
	queryPath: queryPath,
	getCaseInfo: getCaseInfo,
	getCasePaths: getCasePaths
};