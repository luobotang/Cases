$ = require 'jquery' 
DateUtils = require '../utils/DateUtils'

# 根据 case 路径返回预览 HTML 片段
# @param {string} path - 示例："20140130-张三"，前面为就诊日期，后面为姓名
exports.create = (path) ->
	i = path.indexOf "-"
	date = DateUtils.formatDate(path.slice 0, i)
	name = path.slice i + 1
	"""
	<div class="case-preview-item">
		<div class="image">
			<a href="case.htm?p=#{path}" target="_blank">
				<img src="cases/#{path}/正面-微笑.jpg">
			</a>
		</div>
		<div class="info">
			<p>姓名：<span class="name">#{name}</span></p>
			<p>初诊日期：<span class="date">#{date}</span></p>
		</div>
		<div class="cmd">
			<a href="case.htm?p=#{path}" target="_blank" class="btn"></a>
		</div>
	</div>
	"""
