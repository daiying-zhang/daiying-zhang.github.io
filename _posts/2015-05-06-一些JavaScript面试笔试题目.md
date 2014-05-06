---
layout: default
title: 一些JavaScript面试笔试题目[收集]
category: snippets
---

这里会收集一些比较“深奥”的题目，争取把其中的原因弄懂。写得「通俗易懂」，不是科技文，也没那么严谨，表述的也不好。没办法，语文没学好 :(

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

* `fn()`作为函数调用，`this`</code>指向`window`
* `arguments[0]()`作为方法调用，`this`指向调用者`arguments`
    
## T2

    <script>
        var f = {};
        f.c = f = [];
        console.log(f.c);
        //答案
        //undefined
    </script>
   
>   
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
>  

上面是ECMA262中得内容，从上面的规定可以看出：

* 先把`f.c`解析成`reference`：`lref`
    
* `rval`的值为执行`f=[]`的返回值`[]`,此时`f`已经不再指向`{}`了
    
* 再将`rval`赋给`lref`

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

感觉很深奥（对于少数人来说：不深奥）

* 如果调用函数的括号`()`左边包含`Reference`,那么`this`值由`Reference`的`base`提供；

* 如果不包含`Reference`，`this`值为`null`，但是`null`对于`this`来说没有任何意义，被设置成`global`；

第一种情况`foo.bar`在中间过程中产生的`Reference`为:

    var fooBarReference = {
        base : foo,
        referenceName : 'bar'
    }

`this`为`foo`

第二种情况，分组表达式没有触发`GetValue`来获取实际值，返回的依旧是`Reference`，所以~~~~，你懂得

第三种情况，简单赋值操作符`=`，会获取`foo.bar`的实际值，并将这个实际值作为表达式的返回值，此时函数调用的括号左边已经不是`Reference`，所以，`this`为`null` ==> `global` ==> `window`

至于为什么`this`为`null`时会转换成`global`，看看下面的就知道了:

> 10.4.3 Entering Function Code
>
> The following steps are performed when control enters the execution context for function code contained in function object F, a caller provided thisArg, and a caller provided argumentsList:  
>
> 1.If the function code is strict code, set the ThisBinding to thisArg.  
>
> 2.Else if thisArg is `null` or `undefined`, set the ThisBinding to the global object.  
>
> 3.Else if Type(thisArg) is not Object, set the ThisBinding to ToObject(thisArg).  
>
> 4.Else set the ThisBinding to thisArg.  
>
> 5.Let localEnv be the result of calling NewDeclarativeEnvironment passing the value of the [[Scope]] internal property of F as the argument.  
>
> 6.Set the LexicalEnvironment to localEnv.  
>
> 7.Set the VariableEnvironment to localEnv.  
>
> 8.Let code be the value of F‘s [[Code]] internal property.  
>
> 9.Perform Declaration Binding Instantiation using the function code code and argumentsList as described in 10.5.  

第四种情况，跟第三种情况差不多，你应该也懂得~~~ :(

## T4

    a = 10;
    alert(window.a);
    alert(delete a);
    alert(window.a);
    
    var b = 20;
    alert(window.b);
    alert(delete b);
    alert(window.b);
    
    eval('var a = 10;');
    alert(window.a);
    alert(delete a);
    alert(window.a);
        
    //答案
    // 10
    // true
    // undefined
    
    // 20
    // false
    // 20
    
    // 10
    // true
    // undefined
    
**说明**：变量不能通过`delete`删除，引用一段Dmitry Soshnikov的话：

> There is one more important point concerning variables. Variables, in contrast with simple properties, have attribute `{DontDelete}`, meaning impossibility to remove a variable via the `delete` operator
    
> However there is one execution context on which this rule **does not affect**. It is the `eval` context: there `{DontDelete}` attribute is not set for variables

(2015-05-06)

持续更新中。。。
