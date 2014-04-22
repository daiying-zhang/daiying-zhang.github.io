---
layout : default
title : 匿名函数和闭包(来自stackoverflow)
category: article
---

引用一个stackoverflow的提问：

A:

>Hi,
>  
> I have been unable to find a definition that clearly explains the differences between a closure and an anonymous function.  
>   
> Most references I have seen clearly specify that they are distinct "things" yet I can't seem to get my head around why. 
>  
> Could someone please simplify it for me? What are the specific differences between these two language features? Which one is more appropriate in what scenarios?
 
 
Q:

> An anonymous function is just a function that has no name; nothing more. A closure is a function that captures the state of the surrounding environment.
>  
> An anonymous function does not necessarily need to create a closure, and a closure is not created only for anonymous functions.
>    
> Consider this hypothetical counter-example. Consider a language Foo which does not support closures but supports anonymous functions. This language may either not compile or throw an error for the code below because "greeting" is not defined in the scope of the inner function. The fact that it is anonymous is irrelevant.

    function outer() {
        var greeting = "hello ";
        
        (function(name) {
            alert(greeting + name);
        })("John Doe");
    }
    
> Let's consider an actual language now that does support closures - JavaScript. Taking the same example as above, but naming the inner function this time gives:

    function outer() {
        var greeting = "hello ";
    
        (function inner(name) {
            alert(greeting + name);
        })("John Doe");
    }
    
> Although the inner function is not anonymous anymore, it still captures state from the surrounding environment.
>  
> Closures provide much needed convenience, as otherwise we would be passing every single dependency of the function as an argument.

    function outer() {
        var greeting = "hello ";
    
        (function(name, greeting) {
            alert(greeting + name);
        })("John Doe", greeting);
    }
    
 原文地址： <http://stackoverflow.com/questions/4912116/closure-vs-anonymous-function-difference>
