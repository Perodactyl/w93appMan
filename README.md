# w93appMan
[Windows 93](https://www.windows93.net/) "Application" Manager

Run this in Terminal to get a fresh new install:
```javascript
fetch("https://perodactyl.github.io/w93appMan/appMan.js").then((c)=>{$file.save("/a/boot/appMan.js", c.text())});fetch("https://perodactyl.github.io/w93appMan/appMan/main.js").then((c)=>{$file.save("/a/appMan/main.js", c.text())});fetch("https://perodactyl.github.io/w93appMan/appMan/main.html").then((c)=>{$file.save("/a/appMan/main.html", c.text())});
```
It uses `fetch` to get the file contents from github pages and then stores them to the filesystem.
