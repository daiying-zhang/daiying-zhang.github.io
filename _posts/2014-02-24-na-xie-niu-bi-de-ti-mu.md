---
layout: default
title: 那些牛逼的题目[收集]
category: snippets
---

这里会收集一些比较“深奥”的题目，争取把其中的原因弄懂。

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
    
## T2

    <script>
        var f = {};
        f.c = f = [];
        console.log(f.c);
        //答案
        //undefined
    </script>
