module.exports = {
	formatDate: function (date) {
		return (
			date.substr(0, 4) + '年' +
			date.substr(4, 2) + '月' +
			date.substr(6, 2) + '日'
		);
	}
}