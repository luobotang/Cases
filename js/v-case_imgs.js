// 根据指定路径返回包含所有图像路径的对象

function generateFromPath(baseUrl) {
	return {
		"正面-正常": baseUrl + "正面-正常.jpg",
		"正面-正常-画线": baseUrl + "正面-正常-画线.jpg",
		"正面-微笑": baseUrl + "正面-微笑.jpg",
		"正面-微笑-画线": baseUrl + "正面-微笑-画线.jpg",
		"侧面-45度": baseUrl + "侧面-45度.jpg",
		"侧面-90度": baseUrl + "侧面-90度.jpg",
		"侧面-90度-画线": baseUrl + "侧面-90度-画线.jpg",
		"侧面-90度-画线1": baseUrl + "侧面-90度-画线1.jpg",
		"全牙列": baseUrl + "全牙列.jpg",
		"上牙弓": baseUrl + "上牙弓.jpg",
		"下牙弓": baseUrl + "下牙弓.jpg",
		"左侧咬合": baseUrl + "左侧咬合.jpg",
		"右侧咬合": baseUrl + "右侧咬合.jpg",
		"覆HE覆盖": baseUrl + "覆HE覆盖.jpg",
		"全口曲面断层片": baseUrl + "全口曲面断层片.jpg",
		"头颅侧位片": baseUrl + "头颅侧位片.jpg"
	}
}

module.exports = {
	from: generateFromPath
};
