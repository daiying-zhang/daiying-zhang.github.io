---
layout: default
title: JavaScript鼠标拖动+自动吸附实例
category: article
---

学了几天的JavaScript，自己动手做了一个简单的鼠标拖动的实例，拖动过程中科自动检测与目标容器的距离，在一定的距离范围内可以自动将被拖动的
元素加入到目标容器中，希望对开始学习javascript的童鞋有用……

先看看效果图（Chrome、FireFox、Opera、Safari测试通过）：

![拖动效果图](/images/content/article/tuo-dong-xiao-guo.jpg)

效果图（虚线框：目标对象    蓝色填充透明框：临时拖动对象   红色填充框：被拖动对象）

主要思路：首先给要拖动的div添加一个鼠标按下(mousedown)事件、给document对象添加鼠标移动(mousemove)事件和鼠标弹起(mouseup)事件。鼠标
开始移动的时候创建一个临时的拖动对象（temp），移动过程中改变临时拖动目标的位置，鼠标释放时将被拖动的div（elem）的位置设置为临时拖动目标
temp的位置，然后移出临时拖动目标。移动过程中，同时还检测了拖动的对象和目标div的位置关系，如果碰撞（可以设置吸附的范围），则自动吸附
（将被拖动的对象加入到目标对象中），需要说明的是：这里简单起见，并没有真正的把被拖动对象加入到目标对象中，只是设置了被拖动对象的位置。

鼠标按下时：获取被拖动元素的位置和鼠标按下的位置，设置拖动的标志（isDrag）值为true。

    elem.onmousedown = function(event){//鼠标按下
        isDrag = true;
        startX = parseInt(this.style.left||getCSSValue(this,'left'));
        startY = parseInt(this.style.top||getCSSValue(this,'top'));
        mX = event.pageX;
        mY = event.pageY;
    };

鼠标移动时：如果isDrag为true，并且temp对象不存在，则创建temp对象，并根据鼠标的位置计算并设置temp的位置。

    document.onmousemove = function(event){//鼠标移动
        this.innerHTML = 'Mouse Position('+event.pageX+','+event.pageY+')';
        if(isDrag){//当前正在移动
            if(temp == undefined){//temp临时拖动目标不存在
                temp = document.createElement('div');
                temp.id = 'drag';
                temp.className = 'temp';
                document.body.appendChild(temp);//将temp临时拖动目标添加到页面中
            }
         //改变位置
         temp.style.left = (startX + event.pageX - mX) + 'px';
              temp.style.top = (startY + event.pageY - mY) + 'px';
              //检测是否在目标范围内
              if(checkIntersect(temp,$('target'),20)){
              //在范围内
                   $('target').style.border = '2px #F00 dashed';
                   $('target').style.webkitAnimationName = 'light';//闪烁动画
                   $('target').style.webkitAnimationDuration = '1s';
                   $('target').style.webkitAnimationDelay = '0.5s';
                   $('target').style.webkitAnimationIterationCount = '100';
               }else{
                   //不在范围内
                   $('target').style.border = '2px #09F dashed';
                   $('target').style.webkitAnimationName = '';
               }
         }
    };

说明：这里的mousemove事件并不是添加到被拖动对象（elem）上面，如果添加到elem上面，那么鼠标如果移动太快一旦鼠标离开了elem对象，
那么就会出现问题。

鼠标释放时：检测碰撞结果，根据情况设置被拖动对象（elem）的位置，如果以碰撞，则根据目标div的位置设置被拖动对象（elem）的位置，
否则根据temp的位置来设置被拖动对象（elem）的位置；

    document.onmouseup = function(){//鼠标释放
        isDrag = false;
        if(checkIntersect(temp,$('target'),20)){
             elem.style.left=$('target').offsetLeft+'px';
             elem.style.top=$('target').offsetTop+'px';
        }else{
            elem.style.left=temp.offsetLeft+'px';
            elem.style.top=temp.offsetTop+'px';
        }
        document.body.removeChild(temp);//移出临时拖动目标
        temp = null;
        $('target').style.border = '2px #09F dashed';
        $('target').style.webkitAnimationName = '';//取消闪烁
    };

用到的其他函数：在设计过程中，我们需要或许某个元素样式的一些值，如果我们采用行内式（即将样式写在元素标签里面的style属性里面），
我们可以采用`obj.style.left`类似这样的语法来或许，但是如果我们的样式采用了内嵌式（将CSS写在`head`中，并且用`<style>`和`</style>`
标记进行声明）或者链接式（用类似这样的`<link href="css.css" type="text/css" rel="stylesheet">`方式导入外部样式表）、
导入式（采用import语句），我们就无法从上面的方式中获取样式的相关值，但是我们可以用其他的方法：IE下元素有`currentStyle`对象，
其他浏览器采用`document.defaultView.getComputedStyle（）`方法，这样可以获取样式属性的值。代码如下：

    function getCSSValue(obj,key){//获取元素CSS值
        if(obj.currentStyle){//IE
            return obj.currentStyle[key];
        }else{//!IE
             return document.defaultView.getComputedStyle(obj,null)[key];
        }
    }

另外，检测碰撞的函数;

    function checkIntersect(obj1,obj2,distance){//检测碰撞,distance为吸附的范围
        var left1 = obj1.offsetLeft;
        var top1 = obj1.offsetTop;
        var left2 = obj2.offsetLeft;
        var top2 = obj2.offsetTop;
        var width1 = obj1.offsetWidth;
        var height1 = obj1.offsetHeight;
        var width2 = obj2.offsetWidth;
        var height2 = obj2.offsetHeight;
        return (
            ((left1-left2>=0&&left1-left2<width2+distance)||
            (left2-left1>=0&&left2-left1<width1+distance))&&
            ((top1-top2>=0&&top1-top2<height2+distance)||
            (top2-top1>=0&&top2-top1<height1+distance))
        );
    }

总结：这里面主要用到了javascript鼠标事件，简单的DOM节点操作，还有css3的一些新的东西，比如动画（`animation`）、圆角（`border-radius`）、
阴影（`box-shadow`）等知识。

完整代码：[点击下载](/attachment/shu-biao-tuo-dong.zip)