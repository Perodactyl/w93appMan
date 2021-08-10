# w93appMan
[Windows 93](https://www.windows93.net/) "Application" Manager

Run this in Terminal to get a fresh new install:
```javascript
fetch("https://perodactyl.github.io/w93appMan/install.js").then((r)=>{r.text().then((t)=>{eval(t)})})
```
It uses `fetch` to get an index of files and goes through them all and installs them.
