// 查询模块，使得能够根据用户输入信息查找指定患者的相关信息
define(function () {
	// 病例列表
	var caselist;
	init();

	function init(onsuccess, onfail) {
		$.get("cases/caselist.txt", function (data) {
			caselist = data.split("\r\n");
			caselist.sort();
			$.isFunction(onsuccess) && onsuccess(caselist);
		}).fail(function () {
			$.isFunction(onfail) && onfail();
		});
	}

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
	function queryPath(name, onsuccess, onfail) {
		// 未初始化病例列表时，先进行初始化
		if (caselist) {
			var path = getPathBy(name);
			path
				? $.isFunction(onsuccess) && onsuccess(path)
				: $.isFunction(onfail) && onfail(path);
		} else {
			init(function () {
				queryPath(name, onsuccess, onfail);
			}, onfail)
		}
	}

	function getPathBy(name) {
		name = name.trim();
		// 从后向前查找，首先返回最后录入的内容
		for (var i = caselist.length - 1; i >= 0; i--) {
			var path = caselist[i];
			if (path === name) {
				return "cases/" + path + "/";
			}
		}
		return null;
	}

	// 根据名称获取病例信息
	// onsuccess(data, path)
	function getCaseInfo(name, onsuccess, onfail) {
		queryPath(name, function (path) {
			$.getJSON(path + "case.txt", function (data) {
				onsuccess(data, path);
			}).fail(onfail);
		}, onfail);
	}

	return {
		queryPath: queryPath,
		getCaseInfo: getCaseInfo,
		getCasePaths: getCasePaths
	}
});