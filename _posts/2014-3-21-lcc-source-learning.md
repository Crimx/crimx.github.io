--- 
layout:   post
title:    lcc内存对齐代码
category: Compiler
tagline: "&quot;A ship is safe in harbor, but that's not what ships are for.&quot; -Willam G.T. Shedd"
tags: 
- lcc
- 编译器
- 内存对齐
---

今天看lcc源码内存对齐时看到一个`roundup(x,n)`宏

    #define roundup(x,n) (((x)+((n)-1))&(~((n)-1)))

从字面意思看这个宏应该是用来向上取整的。但是`(x+n-1)&(~(n-1))`的确让人一时傻眼了。

这里要从头说起，首先`roundup(x,n)`的作用就是向上取整，即求出最小的`a * n`，使得`a*n >= x`，即
{% highlight python %}
x = a * n - b (0 <= b < n)
{% endhighlight %}

这里就要引入小学时的余数概念了：

>     除数 × 商 = 被除数 - 余数
> 
> 即对于任意两个正整数`x`和`n`，总存在整数`a`和`b`，使得:
> 
>     x = a * n + b (0 <= b < n)
> 
> 在C语言中求`a`和`b`非常简单：
> 
>     a = x / n;
>     b = x % n;


<!--more-->

所以，如果把`roundup(x,n)`转换，就可以求`a*n`了：

{% highlight python %}
x = a * n - b (0 <= b < n)
x+n = a * n - b + n
x+n = a*n + (n-b) (0 < (n-b) <= n)
x+n-1 = a*n + (n-b-1) (0 <= (n-b-1) < n)
{% endhighlight %}

于是：

{% highlight python %}
a = (x+n-1)/n
a*n = (x+n-1) / n * n
{% endhighlight %}

到这里就可以算出`a*n`了，但是很明显`roundup(x,n)`在这里继续对公式进行优化。

因为`n`是内存块的单位，一定是`2`的幂，于是有如下的特性：

* 设`n = 2^m`，则`m = n - 1`
* `n`的二进制必然是`100...`的形态，其中有`m`个`0`
* 对于`n`的乘除操作，可以用左移右移完成

所以看回算式

{% highlight python %}
a*n = (x+n-1) / n * n
{% endhighlight %}

可以看作是`(x+n-1)`右移`m`个位，在左移`m`个位，也就是把最低的`m`个位清零就可以了。

而从上面的属性可以知道，`n-1`的二进制必然是`111...`的形态，其中有`m`个`1`，所以清零只要对`m`的反码进行与操作就可以了。

于是

{% highlight python %}
a*n = (x+n-1)&(~(n-1))
{% endhighlight %}

多么优美的一行代码，虽然可读性不高，但是理解了之后心中还是会产生无比的敬仰，这就是编程的魔力啊，作者就像在尽情的揉捏语言，这感觉一定很棒吧！
