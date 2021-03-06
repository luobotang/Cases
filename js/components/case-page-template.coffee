module.exports = """
<h1>基本信息<br /><span class="en">Basic Information</span></h1>
<div class="col">
	<div class="col-l">
		<div class="img">{img-正面-微笑}</div>
	</div>
	<div class="col-r">{data-基本信息}</div>
</div>

<h1>病史回顾<br /><span class="en">Medical History</span></h1>
<div class="col">{data-病史回顾}</div>

<h1>颜面检查<br /><span class="en">Evaluation of facial morphometrics</span></h1>
<h2>正面观<br /><span class="en">Frontal examination</span></h2>
<div class="col">
	<div class="img">
	    {img-正面-正常}
	    <a class="img_link" data-img-src="{url-正面-正常-画线}">三等分线</a>
	</div>
	<div class="img">
	    {img-正面-微笑}
	    <a class="img_link" data-img-src="{url-正面-微笑-画线}">中分线</a>
	</div>
</div>
<div class="col">{data-正面观}</div>
<h2>侧面观<br /><span class="en">lateral examination</span></h2>
<div class="col">
	<div class="img">{img-侧面-45度}</div>
	<div class="img">
	    {img-侧面-90度}
	    <a class="img_link" data-img-src="{url-侧面-90度-画线}">面型线</a>
	    <a class="img_link" data-img-src="{url-侧面-90度-画线1}">唇部位置线</a>
	</div>
</div>
<div class="col">{data-侧面观}</div>

<h1>颞下颌关节检查<br /><span class="en">temporomandibular joint</span></h1>
<div class="col">{data-颞下颌关节检查}</div>

<h1>牙合检查<br /><span class="en">occlusion examination</span></h1>
<h2>牙列<br /><span class="en">permanent dentition</span></h2>
<div class="col">
	<div class="col-l">
		<div class="img">{img-全牙列}</div>
	</div>
	<div class="col-r">{data-全牙列}</div>
</div>
<h2>覆HE覆盖<br /><span class="en">overbite & overjet</span></h2>
<div class="col">
	<div class="col-l">
		<div class="img">{img-覆HE覆盖}</div>
	</div>
	<div class="col-r">{data-覆HE覆盖}</div>
</div>
<h2>咬合关系<br /><span class="en">moral relationship</span></h2>
<div class="col">
	<div class="col-l">
		<div class="img">{img-左侧咬合}</div>
	</div>
	<div class="col-r">{data-左侧咬合关系}</div>
</div>
<div class="col">
	<div class="col-l">
		<div class="img">{img-右侧咬合}</div>
	</div>
	<div class="col-r">{data-右侧咬合关系}</div>
</div>
<h2>牙弓形态分析<br /><span class="en">symmetry of dental arch</span></h2>
<div class="col">
	<div class="col-l">
		<div class="img rotate">{img-上牙弓}</div>
		<div class="img rotate">{img-下牙弓}</div>
	</div>
	<div class="col-r">{data-牙弓形态分析}</div>
</div>

<h1>模型分析<br /><span class="en">dental cast analysis</span></h1>
<div class="col">{data-模型分析}</div>

<h1>影像学检查</h1>
<h2>全口曲面断层片<br /><span class="en">full mouth panoramic radiographs</span></h2>
<div class="col"><div class="img">{img-全口曲面断层片}</div></div>
<div class="col">{data-全口曲面断层片}</div>
<h2>头颅侧位片<br /><span class="en">cephalometrics</span></h2>
<div class="col"><div class="img">{img-头颅侧位片}</div></div>
<table class="result">
  <thead>
    <tr>
      <th class="field1">测量项目</th>
      <th class="field2">正常值</th>
      <th class="field3">测量值</th>
    </tr>
  </thead>
  <tbody>
    {record-头颅侧位片}
  </tbody>
</table>
<h3>意义</h3>
<div class="col">{data-意义}</div>

<h1>诊断<br /><span class="en">Diagnosis</span></h1>
<div class="col">{data-诊断}</div>

<h1>矫治方案<br /><span class="en">Treatment program</span></h1>
<div class="col">{data-矫治方案}</div>
<h2>矫治步骤</h2>
<ol class="col">{list-矫治步骤}</ol>

<h1>注意事项<br /><span class="en">Precautions</span></h1>
<ol class="col">{list-注意事项}</ol>
"""