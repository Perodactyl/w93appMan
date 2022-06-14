//: I really quickly wrote this to load pack.json.
var fsHandle = null
le._apps.loadPack = {	
  name: "load Pack",
  exec:async ()=>{
  	fsHandle = fsHandle || await showDirectoryPicker()
    var f = await fsHandle.getFileHandle("pack.json")
    var itms = JSON.parse(await (await f.getFile()).text())
    for(var i in itms){
    	if(i.startsWith("_"))continue
        $file.save(i, itms[i], $noop)
    }
  }
}