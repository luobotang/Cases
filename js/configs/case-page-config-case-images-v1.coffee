exports.from = (path) ->
	baseUrl = 'cases/' + path
	return
		"正面-正常":       "#{baseUrl}/1.jpg",
		"正面-正常-画线":  "#{baseUrl}/11.jpg",
		"正面-微笑":       "#{baseUrl}/2.jpg",
		"正面-微笑-画线":  "#{baseUrl}/21.jpg",
		"侧面-45度":       "#{baseUrl}/3.jpg",
		"侧面-90度":       "#{baseUrl}/4.jpg",
		"侧面-90度-画线":  "#{baseUrl}/44.jpg",
		"侧面-90度-画线1": "#{baseUrl}/444.jpg",
		"全牙列":          "#{baseUrl}/5.jpg",
		"上牙弓":          "#{baseUrl}/6.jpg",
		"下牙弓":          "#{baseUrl}/7.jpg",
		"左侧咬合":        "#{baseUrl}/9.jpg",
		"右侧咬合":        "#{baseUrl}/8.jpg",
		"覆HE覆盖":        "#{baseUrl}/0.jpg",
		"全口曲面断层片":   "#{baseUrl}/全口曲面断层片.jpg",
		"头颅侧位片":       "#{baseUrl}/头颅侧位片.jpg"
