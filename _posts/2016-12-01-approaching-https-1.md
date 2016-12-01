---
layout: post
title: 走近HTTPS[1]-基本概念和原理
tags: [https]
---

众所周知，未经加密的通讯，都会存在很多隐私和安全方面的漏洞。尤其是银行、电商这类网站，用户数据的安全是至关重要的，没有哪个用户愿意在没有使用HTTPS的网站上输入自己的个人隐私信息。

最近公司各个项目都切换了HTTPS。而且现在搜索引擎排名中，HTTPS也是一个很重要的因素。可见人们越来越重视个人隐私和数据的安全性，因此HTTPS也就非常重要了。

但是我发现很多人跟我一样：虽然会经常去看看某个网站是否加了一把绿色的锁，知道怎么去部署HTTPS，里面的一些概念和细节，还是不是很了解。我自己曾小范围内部署过HTTPS，也了解过一些基础知识。只可惜，时间一长也都快忘记了，所以现在重新学习一下，顺便记录下来，以后可以再看看。有理解偏差或着错误的地方，还望批评指正。

要学习HTTPS，我们需要了解的概念和细节很多，下面介绍一下其中主要的几个：

`HTTP`、`TCP`、`SSL/TLS`、`CA`和`证书`。

### HTTP

`HTTP`，超文本传输协议（**HyperText Transfer Protocol**），是当今互联网使用最广泛的一个网络协议，用来传输互联网上的各种资源。HTTP是无连接、无状态和基于对象的协议，位于[OSI模型](https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B)中的最顶层[应用层](https://zh.wikipedia.org/wiki/%E5%BA%94%E7%94%A8%E5%B1%82)，依赖于底层网络级协议（比如：TCP）来传输，详细介绍可以参考: [超文本传输协议](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE)



### TCP

`TCP`，传输控制协议（**Transmission Control Protocol**），是一种**面向连接**的、**可靠**的、**基于字节流**的传输层通信协议，位于[OSI模型](https://zh.wikipedia.org/wiki/OSI%E6%A8%A1%E5%9E%8B)中的传输层，提供面向连接的可靠数据传输服务，为应用进程提供端到端的通信服务



### SSL/TLS

`SSL`，安全套接层（**Secure Sockets Layer**），是网景公司（Netscape）为了保证网上交易的安全而推出的。这个协议是现在应用层和传输层中间，这样能在不影响应用层的情况下，为应用层程序提供安全的数据传输服务。

![SSL/TLS Layer](/images/content/article/https/IC197608.gif)
*TLS/SSL Protocol Layers*

最初的SSL 1.0版本，由于存在严重的安全漏洞，没有公开发布。2.0版本于1995年2月发布，但是也存在很多安全漏洞，所以很快被3.0取代了，3.0版本经过重新设计，于1996年发布，文献地址[RFC 6101](https://tools.ietf.org/html/rfc6101)。

后来，IETF将SSL标准化（[RFC2246](https://tools.ietf.org/html/rfc2246)）并且命名为`TLS`（**Transport Layer Security**），中文：**传输层安全协议**。

TLS 1.0版本从技术上讲，于其前身SSL的3.0版本差别非常小。随后又有了1.1（[RFC 4346](https://tools.ietf.org/html/rfc4346)）、1.2（[RFC5246](https://tools.ietf.org/html/rfc5246)）和1.3(草案)（[draft-ietf-tls-tls13-12](https://tools.ietf.org/html/draft-ietf-tls-tls13-12)）版本。

`SSL/TLS`主要提供了三个必要的服务：

* **数据加密** - 防止数据在传输中被窃取
* **身份验证** - 验证服务器或者客户端的身份
* **数据完整性** - 防止数据在传输过程中被篡改和伪造

SSL/TLS这里只简单介绍，详细的内容，后面会继续介绍。

### CA

数字证书认证机构（**Certificate Authority**），是权威、可信赖的第三方机构，主要负责签发、管理和认证数字证书。

这些机构一般都是收费的，常见国际权威的数字证书认证机构有：GlobalSign、VeriSign、GeoTrust和Comodo。

也有免费的机构，比如：CAcert、StartSSL和Let's Encrypt。

### SSL证书

SSL证书是由CA颁发的一种用于认证网站身份和加密传输数据的电子文件。目前，证书的格式和验证方法普遍遵循[X.509](https://en.wikipedia.org/wiki/X.509)国际标准。

SSL证书根据拥有的域名或子域的数量可以分为：

* **单一**  — 保护一个完全限定的域名或子域名
* **通配符** — 涵盖一个域名及无限数量的子域
* **多域**  — 保护多个域名

根据所需的验证级别可以分为:

* **域验证（DV: Domain Validation）** — 涵盖基本加密和对域名注册所有权的验证。
* **组织验证（OV: Organization Validatio）** — 除了基本加密和对域名注册所有权的验证以外，还将验证所有人的特定详情（例如，姓名和地址）。
* **扩展验证 (EV: Extended Validation)** — 在颁发证书之前执行全面检查，提供最高程度的安全性（严格遵守 SSL 证书行业治理联盟制定的指导说明）。


### HTTPS

说到这里，终于可以说HTTPS了！

HTTPS，超文本传输安全协议（**Hypertext Transfer Protocol Secure**或者**HTTP over TLS**、**HTTP over SSL**）是一种网络安全传输协议，是在HTTP协议的基础上使用SSL/TLS对数据进行加密，可以简单理解为HTTP + SSL/TLS。主要目的是：保护传输数据的隐私与完整性、提供身份校验。

HTTPS的基本原理：在TCP握手之后，数据传输之前，客户端和服务器需要在进行TLS握手，进行身份验证和密钥协商，密钥协商过程确定了接下来数据传输需要用到的对称加密密钥。

接下来，数据传输都会使用上面确定好的密钥进行加解密。这样就能起到保护数据安全、保障数据完整性和身份验证的作用。

详细的细节，后面会详细写。


### 总结


HTTPS在传输层（TCP）和应用层（HTTP）之间添加了一个安全层（SSL／TLS），通过这个安全层来加密数据以保障数据传输中的数据安全问题、完整性以及身份验证。其中需要用到CA认证机构颁发的证书。这里涉及到的概念很多，但是本文没有涉及到全部的概念，只是总结了下一些常用的概念，具体的后面分开总结。


### 参考链接

* [Transport Layer Security (TLS)](https://hpbn.co/transport-layer-security-tls/)
* [超文本传输安全协议](https://zh.wikipedia.org/wiki/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%AE%89%E5%85%A8%E5%8D%8F%E8%AE%AE)
