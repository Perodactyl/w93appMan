# w93appMan
[Windows 93](https://www.windows93.net/) "Application" Manager

<span style="color:red">APPMAN IS CURRENTLY BEING REWRITTEN, MOST FEATURES DO NOT WORK</span>

Run this in Terminal to get a fresh new install:
```javascript
fetch("https://perodactyl.github.io/w93appMan/install.js").then((r)=>{r.text().then((t)=>{eval(t)})})
```

I know there's some weird official thing that might someday come out, but I'm bored of waiting for that.

P.S: To uninstall, open terminal and type `uninstallAppMan()`

P.P.S: If you want to add your app to the registry, submit a pull request that modifies the `registry.json` file. You can reference your own registry list or just refer a single package.
