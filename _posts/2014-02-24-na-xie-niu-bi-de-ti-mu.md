---
layout: default
title: 那些牛逼的题目
category: article
---


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
