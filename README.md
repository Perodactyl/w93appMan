# w93appMan
Windows 93 "Application" Manager

Run this in Terminal to get a fresh new install:
```javascript
fetch("https://pastebin.com/raw/sK9kmwcY").then((c)=>{$file.save("/a/boot/appMan.js", c.text())});fetch("https://pastebin.com/raw/C9yMHSqQ").then((c)=>{$file.save("/a/appMan/main.js", c.text())});fetch("https://pastebin.com/raw/BNBCzTzB").then((c)=>{$file.save("/a/appMan/appMan.html", c.text())});
```
It uses `fetch` to get the file contents from pastebin and then stores them to the filesystem.
