//This file installs App Manager when run. It does not get saved.
fetch("https://perodactyl.github.io/w93appMan/files.json").then((c)=>{c.json().then((files)=>{
  if(typeof uninstallAppMan !== "undefined" && (!sessionStorage.getItem("AllowReinstall") || sessionStorage.getItem("AllowReinstall") != "yes")){
    $alert("AppMan already exists! reload after uninstalling and then rerun.")
    return
  }
  $log(files)
  var fetchesDone = 0
  var toRun = []
  var toCss = []
  Object.keys(files).forEach((path)=>{
    var loadURL = "https://perodactyl.github.io/w93appMan/"+files[path]
    $log("Load "+loadURL+" to "+path)
    fetch(loadURL).then((res)=>{
      if(path.startsWith(";")){
        if(path.endsWith(".css")){
          toCss.push(files[path])
          $log("AutoCSS: "+path)
        }else{
          toRun.push(path.replace(";", ""))
          $log("AutoRUN: "+path)
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
