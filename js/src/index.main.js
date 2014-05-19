require(["w-query", "m-case_query"],
function (Query, CaseQuery) {
	var ele_query = document.getElementById("query");
	Query.init(queryCase, CaseQuery.getCasePaths);
	Query.appendTo(ele_query);
	function queryCase(name) {
		CaseQuery.queryPath(name, function (path) {
			if (path) {
				window.open("case.htm?p=" + name);
			} else {
				Query.showMessage("没有找到相关的信息，检查一下是否输入有误？");
			}
		});
	}
});