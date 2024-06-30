# 如何在知乎复制一些不那么好复制的内容~

反正技术问题，那么就用技术来解决呗。

没什么神奇的玩意，就一句代码。



打开对应的回答页面，如

假定所有程序员写的代码都不出bug， 会发生什么？
4 赞同 · 2 评论回答
在这个页面，F12打开浏览器控制台，输入下面这一行代码。
```js
document.getElementsByClassName("RichContent RichContent--unescapable")[0].innerText
```



然后大概能看到。