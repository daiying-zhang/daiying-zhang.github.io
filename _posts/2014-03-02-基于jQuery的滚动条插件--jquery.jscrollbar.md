---
layout: plugins
title: 基于jQuery的滚动条插件-jquery.jscrollbar
category: plugins
---

jquery.jscrollbar 是一个基于jQuery的滚动条插件，支持水平滚动条和垂直滚动条，支持鼠标键盘事件

## 主要功能
1. 支持水平滚动条
2. 支持垂直滚动条
3. 自动判断水平滚动条和垂直滚动条是否显示
4. 支持外部调用来滚动内容
5. 支持滚动条部分样式自定义
6. 支持键盘方向键控制
7. 支持鼠标滚动(需要mousewheel插件)
8. 支持滚动条显示位置设置(外部|悬浮)
9. 支持手动更新界面

## 依赖的库
1. jQuery (http://jquery.com/)
2. jquery.jqdrag (https://github.com/daiying-zhang/jquery.jqdrag)
3. jquery.mousewheel (插件已经包含在本项目中，文件：jquery.mousewheel.min.js)

###使用步骤
1.在&lt;head&gt;&lt;/head&gt;或者&lt;body&gt;&lt;/body&gt;中引入下列文件:

    <!--必须引入-->
    <script type="text/javascript" src="your-path/jquery-1.8.1.min.js"></script>
    <!--如果需要支持鼠标滚动则引入，否则可以不引用-->
    <script type="text/javascript" src="your-path/require/jquery.mousewheel.min.js"></script>
    <!--必须引入-->
    <script type="text/javascript" src="your-path/require/jquery.jqdrag-1.0.min.js"></script>
    <!--必须引入-->
    <script type="text/javascript" src="your-path/min/jquery.jscrollbar-1.0.2.min.js"></script>

2.设置内容区域的大小:

    <!--设置区域大小，包括滚动条-->
    <div style="width:1300px;height:600px;">Some long text or other elements...</div>

3.调用插件：

    $(function(){
        $('#test1,#test2').jscrollbar({
            //some options
        });
    });

### 示例代码

    $(function(){
        $('#test1,#test2').jscrollbar({
            width:12, //滚动条宽度
            color:'orange', //滚动条颜色
            opacity:0.7, //透明度
            position:'inner', //滚动条位置
            mouseScrollDirection:'horizontal' //鼠标滚动时滚动的方向
        });

        var jsb2 = $('#test2').jscrollbar('getObject');

        setTimeout(function(){
            $('#test2 img').css({width:'4000px'});
                //滚动实例的链式调用，无法使用jQuery操作DOM的方法 [不推荐]
                jsb2.updateUI()
                     .scrollTo('x',100)
                     .scrollBy('x',50);

                //jQuery的链式调用，可以使用jQuery操作DOM的方法  [推荐]
                $('#test1').jscrollbar('scrollBy','x',10)
                           .jscrollbar('scrollTo','x',300)
                           .animate({'opacity':0.8},1000);
        },2000)
    });

### E-Mail

如果你有什么好的意见或者建议，或者发现Bug，欢迎与我交流：
97532151@qq.com

### Site

http://sanjh.cn
