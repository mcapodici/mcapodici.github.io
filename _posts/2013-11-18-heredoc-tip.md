---
layout: post
title: Heredoc Tip
date: 2013-11-18 00:10:00
tags: [heredoc, ruby]
---

I do really like the Heredoc format allowing you easily create multiple lines explicit strings in Ruby. However you will suffer from a trailing newline which most of the time you won't want.

e.g.

```ruby
html_expected = <<eos
<!DOCTYPE html>
<html>
<head>
<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
</head>
<body>
<h1>Hello</h1>

</body>
</html>
eos
```

The simple remedy is the Ruby chop method. It removes the last character from the string. But if the last two characters are a carriage return then line feed it will remove both of them. In the case of a Heredoc here is how you use it:

```ruby
html_expected = <<eos.chop
<!DOCTYPE html>
<html>
<head>
<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'/>
</head>
<body>
<h1>Hello</h1>

</body>
</html>
eos
```