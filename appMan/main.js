//This one goes in /a/appMan! Make sure it stays there!
var container = document.getElementById("appMan-container")
var list = document.getElementById("appMan-appList")
var loadWindow = container && list
$log("AppMan process running.")
var foundApps = [
  
]
window.loadAsPromise = function(path){
	return new Promise(r=>$file.open(path,r))
}
window.confirmAsPromise = function(text){
	return new Promise(r=>$confirm(text,r)) 
}
window.saveAsPromise = function(path,text){
	return new Promise(r=>$file.save(path,text,r))
}
window.modOverview = async function(mod){
  var p = $window({
		title:"Mod overview - "+mod.title,
	 	html:"Loading..."
  })
  var template = await loadAsPromise("/a/appMan/modTemplate.html")
  mod.installed = !!$fs.utils.exist("/a/manApps/"+mod.title)
  mod.proc = p.id
  var replaced = template.replace(/(?:@|_\$)(\w+)/g,(m,g1)=>mod[g1])
  replaced = replaced.replace(/\$:(.+?):\$/gs,(m,g1)=>eval(g1))
  p.el.body.innerHTML = replaced
}
window.toggleModInstalled = async (name,win=null)=>{
 	try{
		var app = w93Apps.filter(a=>a.title==name)[0]
	}catch(e){
		$alert("Failed to find mod named "+name)
	 	return
	}
	var dir
	if(dir = $fs.utils.exist("/a/manApps/"+name)){	
		for(p in dir){
		 await new Promise(r=>$file.delete("/a/manApps/"+name+"/"+p,r))
		}
 		$file.delete("/a/manApps/"+name+"/")
		$explorer.refresh()
		if(typeof window["uninstall_mod_"+name.replace(/\s/g,"_")] !== "undefined"){
		  window["uninstall_mod_"+name.replace(/\s/g,"_")]()
		}
	  $notif("Uninstalled '"+app.title+"'")
 	}else{
		w93InstallApp(app,false)
	}
 	if(win){
		$window.instances[win].close()
	}
}
window.loadBranch = async function(registryURL,isUrl=false,resetList=true){
 	if(resetList)foundApps = []
 	try{
	 	var registryFile = registryURL || "/a/appMan/registry.url.txt"
		var registry 
		if(isUrl){
		  registry = await (await fetch(registryFile)).json()
		}else{
		  registry = await (await fetch(await loadAsPromise(registryFile))).json()
		}
	}catch(e){
	 	$alert("Failed to fetch registry @"+registryFile+". Do you have internet access?\n"+e)
		return
	}
	for(var i in registry){
		let url = registry[i]
		if(url.match(/^\|-/)){
				var nUrl = url.replace(/^\|-/,"")
			console.log("branch:",nUrl)
			loadBranch(nUrl,true,false)
			continue
		}
	 	console.log("load:",url)
		try{
			var meta = await (await fetch(url+"app.json")).json()
			meta.url = url
			foundApps.push(meta)
		}catch(e){
			$alert("An app failed to load @"+url+":\n"+e)
		}
	}
 	window.w93Apps = foundApps
 	finishAppLoad()
}
window.w93InstallApp = async (data,confirm=true)=>{
 			if(!data){console.warn("Attempt to install undefined mod.");return}
			if(!confirm ? true : await confirmAsPromise("Do you want to install \""+data.title+"?\"")){
			 	console.log("install:",data.title)
				var f = data.files
				f.push("app.json")
				for(idx in f){
				 	let file = f[idx]
					let reqUrl = data.url+file
					let content = await (await fetch(reqUrl)).text()
					let p = "/a/manApps/"+data.title+"/"+file
					console.log("save:",p,"with:",content,"@:",reqUrl)
					await saveAsPromise(p,content)
				}
			  var m = data.main
			  var mp = "/a/manApps/"+data.title+"/"+m
			  var inst = data.inst || ""
			  console.log("install:",inst || "none")
			  if(inst){
			 	eval(await loadAsPromise("/a/manApps/"+data.title+"/"+inst))
			  }
			  console.log("main:",mp)
			  eval(await loadAsPromise(mp))
			  console.log("installed")
			  $notif("Installed '"+data.title+"'")
			}
		}
if(loadWindow)setTimeout(loadBranch,500)
function finishAppLoad(){
	list = document.getElementById("appMan-appList")
 	list.innerHTML = ""
	for(let idx in foundApps){
	 	let data = foundApps[idx]
		let el = document.createElement("div")
		el.className = "appMan-app"
		let styleTitle = data.title
		styleTitle = styleTitle.replace(/(\W)(\w)/g,(m,g1,g2)=>g1+g2.toUpperCase()).replace(/^(\w)/,(m,g1)=>g1.toUpperCase())
		//Style handled by /a/boot/appMan.css
		el.innerHTML = `<span class="appMan-app-title">${styleTitle}</span>
<span class="appMan-app-description">${data.description.length > 50 ? data.description.slice(0,50)+"..." : data.description}</span>
<span class="appMan-app-type">${data.type}</span>`
		el.onclick = ()=>{modOverview(data)}
		list.append(el)
	}
}


window.uninstallappMan = function(){
 	console.log("Deleting...")
	  $file.delete("/a/boot/appMan.js")
	$file.delete("/a/appMan/main.js")
	$file.delete("/a/appMan/main.html")
	$file.delete("/a/appMan/")
	$notif("Uninstalled App Manager!")
	$log("Attempt to uninstall app manager.")
}
if(!loadWindow){
	var apps = Object.keys($fs.utils.exist("/a/manApps"))
	console.log(apps)
	if(apps){
	  apps.forEach(async app=>{
		if(app.match(/^\.+$/)){
			console.log("skip:",app)
			return
	 	}
	 	var mPath = JSON.parse(await loadAsPromise("/a/manApps/"+app+"/app.json")).main
		var main = "/a/manApps/"+app+"/"+mPath
		console.log("initialize:",app,"main",main)
		eval(await loadAsPromise(main))
	  })
	}
}