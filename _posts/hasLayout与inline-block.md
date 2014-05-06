---
layout: default
title: hasLayout与inline-block
category: article
---

首先看一张效果：

![正确的效果](/images/content/article/haslayout-display-inlineblock-1.png)

支持`inline-block`的流量器中代码可简单的写为：

<pre data-language="css">
#demo li{
    padding:10px;
    background:#CCC;
    display:inline-block;
    vertical-align:top;
}
#demo li div{
    width:100px;
    background:#F00;
}
</pre>

<pre data-language="html">
<ul id="demo">
	<li><div style="height:25px;"></div></li>
    <li><div style="height:50px;"></div></li>
    <li><div style="height:25px;"></div></li>
    <li><div style="height:30px;"></div></li>
    <li><div style="height:65px;"></div></li>
    <li><div style="height:100px;"></div></li>
    <li><div style="height:45px;"></div></li>
    <li><div style="height:25px;"></div></li>
    <li><div style="height:30px;"></div></li>
    <li><div style="height:65px;"></div></li>
    <li><div style="height:100px;"></div></li>
</ul>
</pre>

但是IE6下面的效果却变成了：

![IE6下面的效果](/images/content/article/haslayout-display-inlineblock-2.png)

原因很简单：IE6不支持`inline-block`,要达到这个效果，我们可以为IE6加上特定代码：

<pre data-language="css">
    #demo li{
		padding:10px;
		background:#CCC;
		display:inline-table;
		vertical-align:top;
		zoom:1;/*触发hasLayout*/
		*display:inline;
	}
</pre>

可见：*如果具有`layout` 的元素同时也有 `display: inline` ，那么它的行为和 `inline-block` 很类似*

然后IE6效果就正确了：

![正确的效果](/images/content/article/haslayout-display-inlineblock-3.png)