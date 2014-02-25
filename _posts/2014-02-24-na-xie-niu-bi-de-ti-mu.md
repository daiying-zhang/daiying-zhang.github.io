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
    
> The production AssignmentExpression : LeftHandSideExpression = AssignmentExpression is evaluated as follows:  
>    1. Let lref be the result of evaluating LeftHandSideExpression.  
>    2. Let rref be the result of evaluating AssignmentExpression.  
>    3. Let rval be GetValue(rref).  
>    4. Throw a SyntaxError exception if the following conditions are all true:  
>        * Type(lref) is Reference is true  
>        * IsStrictReference(lref) is true  
>        * Type(GetBase(lref)) is Environment Record  
>        * GetReferencedName(lref) is either "eval" or "arguments"  
>    5. Call PutValue(lref, rval).  
>    6. Return rval.   

上面是ECMA262中得内容，从上面的规定可以看出：

* 先把<code>f.c</code>解析成<code>reference</code>：<code>lref</code>  
    
* <code>rval</code>的值为执行<code>f=[]</code>的返回值<code>[]</code>,此时<code>f</code>已经不再指向<code>{}</code>了
    
* 再将<code>rval</code>赋给<code>lref</code>

看看下面的代码，是否能够明白了？  

    <script>
        var f = a = {};
        f.c = f = [];
        console.log(f.c);
        console.log(a.c);
        //答案
        //undefined
        //[]
    </script>

##T3

    <script>
        var foo = {
            bar: function () {
               console.log(this);
            }
        };
                     
        foo.bar();
        (foo.bar)();
                     
        (foo.bar = foo.bar)();
        (foo.bar, foo.bar)();
        //答案
        //foo
        //foo
        //window
        //window
    </script>



持续更新中。。。
