---
layout: plugins
title: 轻量级的JS代码高亮插件-jshighlight
category: plugins
---


<img class="aligncenter size-full wp-image-443" title="jshighlight" src="http://blog.sanjh.cn/wp-content/uploads/2013/05/jshighlight.jpg" alt="jshighlight" width="752" height="auto" />

jshighlight-一款基于javascript的轻量级的代码着色插件，这个插件使用比较简单，而且代码比较少。虽然原生只支持html、css、javascript，但是它也可以被扩展以支持其他的语言，下面会讲到怎么去扩展它，本博客已经将原来臃肿的插件替换成了jshighlight，具体效果可以查看这篇文章中的代码，下面简要介绍一下她的一些信息：
<h3>插件特点</h3>
<ol>
	<li>真正轻量级，JS代码压缩后3K左右；</li>
	<li>调用方便，引入jshighlight核心js文件即可；</li>
	<li>不依赖于任何其他库；</li>
	<li>原生支持HTML、CSS、Javascript；</li>
	<li>支持其他语言的轻松扩展；</li>
	<li>显示行号，直接复制代码不会复制行号；</li>
	<li>提供四套主题可选，默认使用Monokai样式主题；</li>
</ol>
<h3><a name="-1" href="https://github.com/daiying-zhang/jshighlight#-1"></a>使用步骤</h3>
<ol>
	<li>在&lt;head&gt;中引入相应的样式文件：
<pre data-language="html">&lt;!--默认样式--&gt; 
&lt;link href="../theme/jshighlight-default.css" rel="stylesheet" /&gt;</pre>
</li>
	<li>在&lt;/body&gt;前中引入相应js文件：
<pre data-language="html">&lt;!--核心js文件--&gt; 
&lt;script src="../js/jshighlight.core-v1.0.1.min.js"&gt;&lt;/script&gt;</pre>
</li>
	<li>在需要着色的pre标签中加入'data-language'属性，取值为：'javascript'|'html'|'css'，扩展后可以设置其他的值；</li>
</ol>
<h3><a name="-2" href="https://github.com/daiying-zhang/jshighlight#-2"></a>如何扩展</h3>
<ol>
	<li>在&lt;/body&gt;中引入相应js文件：
<pre><code>&lt;script src="../js/jshighlight.core-v1.0.0.min.js"&gt;&lt;/script&gt; </code></pre>
</li>
	<li>自定义需要着色的语言所需要的样式，例如：
<pre data-language="css">.php-com{
    color: #CCC;
}
.php-mrk{
    color: red;
    font-weight: bold;
}
.php-bol{
    color: #F92665;
    font-style: italic;
}
.php-var{
    color: #A6E22E;
}
/*.......*/
/* 也可以使用默认的样式，传入默认样式类名即可，
 * 样式名称可以自由使用，比如注释对应的样式也可以用.key
 * 默认样式如下：
 */
.com{ color:#75715E } /*普通注释*/
.doc{ color:#48BEEF } /*文档注释*/
.str{ color:#E6DB74 } /*字符串*/
.key{ color:#48BEEF; font-weight: bold; font-style: italic } /*关键字*/
.obj{ color:#AE81FF; font-weight:bold } /*内置对象、函数*/
.num{ color:#F92672 } /*数字*/
.ope{ color:#FD971F } /*操作符*/
.bol{ color:#FF5600; font-style: italic } /*布尔值*/

.mrk{ color:#F92665 } /*html标签*/
.attr{ color:#A6E22E } /*属性名称*/
.val{ color:#E6DB74 } /*属性值*/</pre>
</li>
	<li>定义提取需要着色的内容的正则，比如：
<pre data-language="javascript">'com' : /(\/\*[\s\S]*?\*\/|\/\/.*|&amp;lt;\!--[\s\S]*?--&amp;gt;)/, //普通注释 
'mrk' : /(&amp;lt;\?php|\?&amp;gt;)/, //标签 
'str' : /('(?:(?:\\'|[^'\r\n])*?)'|"(?:(?:\\"|[^"\r\n])*?)")/, //字符串</pre>
</li>
	<li>调用JSHL的extendLanguage方法：
<pre data-language="javascript">JSHL.extendLanguage('php',{
   /*
    * 每个分组对应的样式类名
    * 比如：'com'中有一个分组，'mrk'中有一个分组，'key'中有两个分组，
    * 那么： com中的分组对应'php-com','mrk'中的分组对应
    * 'php-mrk','key'中的第一个分组对应'str',第二个对应'key'，以此类推；
    */
   cls : ['php-com','php-mrk','str','key','php-var','obj','num','php-bol','ope'],
   reg : {
        'com' : /(\/\*[\s\S]*?\*\/|\/\/.*|&lt;\!--[\s\S]*?--&gt;)/,  //普通注释
        'mrk' : /(&lt;\?php|\?&gt;)/, //标签
        'str' : /('(?:(?:\\'|[^'\r\n])*?)'|"(?:(?:\\"|[^"\r\n])*?)")/, //字符串
        'key' : /(?:[^$_@a-zA-Z0-9])?(and|or|...|throw)(?![$_@a-zA-Z0-9])/, //关键字
        'var' : /(\$[\w][\w\d]*)/, //变量名
        'obj' : /(?:[^$_@A-Za-z0-9])?(echo|...|date)(?:[^$_@A-Za-z0-9])/, //内置函数(部分)
        'num' : /\b(\d+(?:\.\d+)?(?:[Ee][-+]?(?:\d)+)?)\b/,  //数字
        'bol' : /(?:[^$_@A-Za-z0-9])?(true|false)(?:[^$_@A-Za-z0-9])/, //布尔值
        'ope' : /(==|=|===|\+|-|\+=|-=|\*=|\\=|%=|&lt;|&lt;=|&gt;|&gt;=|\.)/  //操作符
    },
    //如果这个语言是包含在html中的设置下列属性
    wrapper: 'html',
    content : {
        lang : 'php', // 语言名称，在于pre标签的data-language一致
        wrapper : /()/g // 需要着色的代码被包裹的形式
    }
})</pre>
<h3>实际效果</h3>
<div>1. Default Theme--Monokai</div>
<div><a href="http://blog.sanjh.cn/wp-content/uploads/2013/05/default.png"><img class="aligncenter size-full wp-image-444" title="default" src="http://blog.sanjh.cn/wp-content/uploads/2013/05/default.png" alt="" width="827" height="408" /></a></div>
<div></div>
<div>2. iPlastic Theme</div>
<div><a href="http://blog.sanjh.cn/wp-content/uploads/2013/05/iPlastic.png"><img class="aligncenter size-full wp-image-445" title="iPlastic" src="http://blog.sanjh.cn/wp-content/uploads/2013/05/iPlastic.png" alt="" width="836" height="460" /></a></div>
<div></div>
<div>3. Eiffel Theme</div>
<div><a href="http://blog.sanjh.cn/wp-content/uploads/2013/05/Eiffel.png"><img class="aligncenter size-full wp-image-446" title="Eiffel" src="http://blog.sanjh.cn/wp-content/uploads/2013/05/Eiffel.png" alt="" width="835" height="467" /></a></div>
<div></div>
<div>4.Blackboard Theme</div>
<div><a href="http://blog.sanjh.cn/wp-content/uploads/2013/05/Blackboard.png"><img class="aligncenter size-full wp-image-447" title="Blackboard" src="http://blog.sanjh.cn/wp-content/uploads/2013/05/Blackboard.png" alt="" width="825" height="414" /></a></div>
<div></div>
<h3>插件主页</h3>
<div><a href="https://github.com/daiying-zhang/jshighlight">https://github.com/daiying-zhang/jshighlight</a></div>
<div></div>
<h3>升级记录</h3>
<div>version 1.0.2</div>
<div>1. 修复代码以"//...."形式结尾时末尾额外增加"|"的bug,在这里感谢<span style="color: #ff0000;"><strong>@枯叶</strong></span>反馈此bug；</div>
<div></div>
<h3>下载地址</h3>
<div><a class="download" title="点击下载" href="http://js.sanjh.cn/jshighlight/jshighlight-1.0.2.zip">点击下载</a></div>
<div></div></li>
</ol>
