---
layout: post
title: 分(bao)享(cun)下我的bash_profile文件
---

这里保存下我的`.bash_profile`文件，哪天需要了再来取。

目前这个文件主要是定义了几个别名，简单的设置了下终端。

## 效果如下

![效果一](/images/content/article/bash_profile_1.png)

![效果二](/images/content/article/bash_profile_2.png)

## 内容

~~~bash
STARTCOLOR='\e[0;32m';
ENDCOLOR="\e[0m"
export PS1="$STARTCOLOR\u@\h > $ENDCOLOR"
# export PS1="Air@\u:\w > "

export CLICOLOR=1
export LSCOLORS="gxfxcxdxbxegedabagacad"

export PATH=/usr/local/bin:/usr/local/sbin:$PATH

# aliases
alias cd..="cd .."
alias l="ls"
alias ll="ls -al"
alias la="ls -a"

alias hosts="sudo vi /etc/hosts && tabTitle \"Host Edit\""

## nginx
alias ngconfig="cd /usr/local/etc/nginx/"
alias nglog="cd /usr/local/var/log/nginx"
alias ng="sudo nginx && tabTitle \"Nginx Server\""
alias ngs="sudo nginx -s stop"
alias ngr="sudo nginx -s reload"

# change tab title
function tabTitle {
    printf "\e]1;$1\a"
}
~~~

## 附：

用到的主题：<http://github.com/hukl/Smyck-Color-Scheme>
