---
layout: default
title: 那些牛逼的题目
category: article
---

### 关于this指向

#### T1

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
