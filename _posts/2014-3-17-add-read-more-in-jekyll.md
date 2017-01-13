--- 
layout:   post
title:   'The Easiest Way to Creat Read More in Jekyll'
tagline: "&quot;Many people die at 25 and aren't buried untill they're 75.&quot; -Benjamin Franklin"
tags: 
- jekyll
- excerpt
---

##1

Add excerpt separator in `_config.yml`. For example:

    excerpt_separator: <!--more-->


##2

Edit index.html or index.md...(the page you want to list posts) and add something like these:

{% highlight html %}
{% raw %}
<ul>
  {% for post in site.posts %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
      <br/>
      <a href="{{ post.url }}"><code> --==Read More==-- </code></a>
      <br/>

    </li>
  {% endfor %}
</ul>
{% endraw %}
{% endhighlight %}

<!--more-->

##3

Insert `<!--more-->` into you posts.

Check this [Post excerpt](http://jekyllrb.com/docs/posts/).
