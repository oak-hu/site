---
layout: default
title: Writing
permalink: /writing/
---

# Writing

<ul class="writing-list">
    {% for post in site.posts %}
    <li class="writing-item">
        <span class="writing-date">{{ post.date | date: "%b %d, %Y" }}</span>
        <a href="{{ post.url | relative_url }}" class="writing-title no-icon">{{ post.title }}</a>
    </li>
    {% endfor %}
</ul>
