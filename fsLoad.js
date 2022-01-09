async function restartAppManInstall(fsHandle){
	sessionStorage.setItem("verboseMode", "no")
	var installHandle = await fsHandle.getFileHandle("install.js")
	var installFile = await installHandle.getFile()
	var text = await installFile.text()
	var readFsHandle = fsHandle
	eval(text)
}
(async ()=>{
	var fsHandle = await showDirectoryPicker()
	document.addEventListener("keydown", (ev)=>{
		if(ev.key == "r" && ev.altKey){
			restartAppManInstall(fsHandle)
		}
	})
})()