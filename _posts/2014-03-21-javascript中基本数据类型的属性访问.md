---
layout: post
title: javascript中基本数据类型的属性访问
tag: [javascript]
---

应该说所有jser都知道，javascript中基本的数据类型也“拥有”一些属性或者方法，比如：`"javascript".length` ，
`"javascript".substring(0,3)`。

基本的数据类型不是一个对象，为什么能访问一些属性或者调用一些方法呢？

解释就是：*当对基本数据类型进行属性访问或者方法调用时，JS引擎会自动创建基本类型对应的包装对象（也就是`ToObject`），然后去访问这个包装对象的属性或者调用这个包装对象的方法。*

至于为什么是这样的，属性访问和标识符解析的时候，会产生引用（`reference`）,然后通过内部方法GetValue(V)
去获取实际值，看看ECMAScript规范中`GetValue`的描述：


>**8.7.1 GetValue (V)**
>
>1. If Type(*V*) is not **Reference**, return *V*.
>2. Let base be the result of calling GetBase(*V*).
>3. If IsUnresolvableReference(*V*), throw a **ReferenceError** exception.
>4. If IsPropertyReference(*V*), then  
>
>    a. If HasPrimitiveBase(*V*) is **false**, then let get be the [[Get]] internal method of base, otherwise let get be the special [[Get]] internal method defined below.  
>    b. Return the result of calling the get internal method using *base* as its **this** value, and passing GetReferencedName(*V*) for the argument.
>    
>5. Else, *base* must be an environment record.  
>    a. Return the result of calling the GetBindingValue (see 10.2.1) concrete method of base passing GetReferencedName(*V*) and IsStrictReference(*V*) as arguments.  
>  
>The following [[Get]] internal method is used by GetValue when *V* is a **property reference** with a primitive *base* value. It is called using *base* as its **this** value and with property *P* as its argument. The following steps are taken:
>
>1. Let *O* be ToObject(*base*).
>2. Let *desc* be the result of calling the [[GetProperty]] internal method of *O* with property name *P*.
>3. If *desc* is **undefined**, return **undefined**.
>4. If IsDataDescriptor(*desc*) is **true**, return *desc*.[[Value]].
>5. Otherwise, IsAccessorDescriptor(*desc*) must be **true** so, let getter be **desc**.[[Get]] (see 8.10).
>6. If getter is **undefined**, return **undefined**.
>7. Return the result calling the [[Call]] internal method of getter providing base as the this value and providing no arguments.
>  
>**NOTE** The object that may be created in step 1 is not accessible outside of the above method. An implementation might choose to avoid the actual creation of the object. The only situation where such an actual property access that uses this internal method can have visible effect is when it invokes an accessor function.

貌似有点多:(   
不过没办法，人家就是这么写得，其实关键的地方在`GetValue`的第4步，在4.a里面，如果`HasPrimitiveBase(V)`为`true`（也就是说引用的基值`base`为基本数据类型），就去调用下面那个特殊的[[get]]方法。

而在特殊定义的`[[get]]`方法的第一步，就将`base`转换成了`Object`，然后，然后就。。。。自己意会吧:)

英语不好，上面的东西就不翻译了，万一看不懂，那就[Google一下](https://www.google.com.hk/webhp?hl=zh-CN)吧。
