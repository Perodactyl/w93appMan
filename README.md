# w93appMan
[Windows 93](https://www.windows93.net/) "Application" Manager

Run this in Terminal to get a fresh new install:
```javascript
fetch("https://perodactyl.github.io/w93appMan/install.js").then((r)=>{r.text().then((t)=>{eval(t)})})
```
It uses `fetch` to get an index of files and goes through them all and installs them, and this code can go through [minifier.com](https://minifier.com) without changing one bit.



Yes I know there's some weird official thing that might someday come out, but I'm bored of waiting for that!

P.S: To uninstall, open terminal and type `uninstallAppMan()`

P.P.S: If you want to add your app to the registry, submit a pull request that modifies the `registry.json` file. You can reference your own registry list or just refer a single package.

P.P.P.S: You can now add your own by running `api.js` after making sure to install it's dependencies and pass in the URL. It will fail if the URL specified doesn't match an `app.json` or another registry file. Add `|-` at the beginning of the path if the URL leads to a registry.json file.
