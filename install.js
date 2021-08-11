//This file installs App Manager when run. It does not get saved.
fetch("https://perodactyl.github.io/w93appMan/files.json").then((c)=>{c.json().then((files)=>{
  if(typeof uninstallappMan !== "undefined" && (!sessionStorage.getItem("AllowReinstall") || sessionStorage.getItem("AllowReinstall") != "yes")){
    $alert("AppMan already exists! reload after uninstalling and then rerun.")
    return
  }
  var fetchesDone = 0
  var toRun = []
  var toCss = []
  Object.keys(files).forEach((path)=>{
    fetch("https://perodactyl.github.io/w93appMan/"+files[path]).then((res)=>{
      if(path.startsWith(";")){
        if(path.endsWith(".css")){
          toCss.push(files[path])
        }else{
          toRun.push(path.replace(";", ""))
        }
        path = path.replace(";", "")
      }
      $file.save(path, res.text())
      fetchesDone++
      if(fetchesDone == Object.keys(files).length){
        $confirm("Do you want to make a desktop shortcut?", (y)=>{
          if(y){
            localStorage.setItem("desktop/AppManager.lnk42", "{\"exe\":\"js /a/appMan/start.js\",\"title\":\"App Manager\"}")
          }
          toRun.forEach((p)=>{
            $file.open(p, "String", (execCode)=>{eval(execCode)})
          })
          toCss.forEach((p)=>{
            $loader.css("https://perodactyl.github.io/w93appMan/"+p)
          })
          $notif("Install complete.")
        })
      }
    })
  })
})})
