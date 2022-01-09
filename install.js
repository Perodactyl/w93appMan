//This file installs App Manager when run. It does not get saved.
(()=>{
	async function getFile(path){
		var root = "https://perodactyl.github.io/w93appMan/"
		if(typeof readFsHandle !== "undefined"){
			var segments = path.split("/")
			var final = segments.pop()
			/** @type {FileSystemDirectoryHandle} */
			var cur = readFsHandle
			for(seg of segments){
				cur = await cur.getDirectoryHandle(seg)
			}
			return await (await (await cur.getFileHandle(final)).getFile()).text()
		}else{
			return (await fetch(root+path)).text()
		}
	}
	getFile("files.json").then((c)=>{
		var files = JSON.parse(c)
		var verbose = sessionStorage.getItem("verboseMode") != "no"
		if(typeof uninstallAppMan !== "undefined" && sessionStorage.getItem("AllowReinstall") != "yes" && verbose){
			$alert("AppMan already exists! reload after uninstalling and then rerun.")
			return
		}
		$log(files)
		var fetchesDone = 0
		var toRun = []
		var toCss = []
		Object.keys(files).forEach((path)=>{
			var loadURL = files[path]
			$log("Load "+loadURL+" to "+path)
			getFile(loadURL).then((res)=>{
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
				$file.save(path, res)
				fetchesDone++
				if(fetchesDone == Object.keys(files).length){
					function finalInstall(){
						toRun.forEach((p)=>{
							$file.open(p, "String", (execCode)=>{eval(execCode)})
						})
						toCss.forEach((p)=>{
							$loader.css("https://perodactyl.github.io/w93appMan/"+p)
						})
						console.log("installed appman")
					}
					if(verbose){
						$confirm("Do you want to make a desktop shortcut?", (y)=>{
							if(y){
								localStorage.setItem("desktop/AppManager.lnk42", "{\"exe\":\"js /a/appMan/start.js\",\"title\":\"App Manager\"}")
							}
							finalInstall()
							$notif("Install complete.")
						})
					} else {
						finalInstall()
					}
				}
			})
		})
	})
})()