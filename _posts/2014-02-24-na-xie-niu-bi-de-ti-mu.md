---
layout: default
title: 那些牛逼的题目[收集]
category: snippets
---

这里会收集一些比较“深奥”的题目，争取把其中的原因弄懂。

程序员，没办法，习惯下标从0开始 :)

## T0

这个题目或许本身不难，但是请试试，能不能把它解释清楚。

    <script>
        function A(){}
        A.prototype = {x : 10}
        var a = new A();
        
        A.prototype = {x : 10, y : 20};
        var b = new A();
        
        console.log(a.x, a.y);
        console.log(b.x, b.y);
        
        //答案
        //10,undefined
        //10,20
    </script>

## T1

    <script>
        var length = 10;

        function test(fn){
            fn();  
            arguments[0]();
        }

        test(function(){
            alert(this.length)
        }, length);

        //答案
        //10,2
    </script>
    
主要是<code>this</code>指向

* <code>fn()</code>作为函数调用，<code>this</code>指向<code>window</code>
* <code>arguments\[0\]\(\)</code>作为方法调用，<code>this</code>指向调用者<code>arguments</code>
    
## T2

    <script>
        var f = {};
        f.c = f = [];
        console.log(f.c);
        //答案
        //undefined
    </script>
