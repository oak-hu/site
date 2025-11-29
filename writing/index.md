---
layout: default
title: Writing
---

<h1>Writing</h1>

<ul class="writing-list">
    {% assign writing_pages = site.pages | where_exp: "item", "item.path contains 'writing/'" | where_exp: "item", "item.name != 'index.md'" | sort: 'date' | reverse %}
    {% for post in writing_pages %}
    <li class="writing-item">
        <span class="writing-date">{{ post.date | date: "%b %d, %Y" }}</span> 
        <a href="{{ post.url | relative_url }}" class="writing-title no-icon">{{ post.title }}</a>
    </li>
    {% endfor %}
</ul>
