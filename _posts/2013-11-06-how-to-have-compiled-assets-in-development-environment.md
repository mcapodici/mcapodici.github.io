---
layout: post
title: How to have compiled assets in development environment
date: 2013-11-06 09:26:00
tags: [ruby]
---

In Ruby on Rails I had a situation where I needed to test the minified Javascripts in development. It wasn't 100% straightforward, but after some digging I found the answer:

In development.rb, set these as follows:

`config.assets.compress = true  
config.assets.debug = false`

Then do this on the command line:

`RAILS_ENV=development rake assets:clean  
rm -rf public/assets`

Then restart your web server. 