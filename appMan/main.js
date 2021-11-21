//This one goes in /a/appMan! Make sure it stays there!
var container = document.getElementById("appMan-container")
var list = document.getElementById("appMan-appList")
var loadWindow = container && list
$log("AppMan process running.")
var foundApps = [
  
]
function loadAsPromise(path){
	return new Promise(r=>$file.open(path,r))
}
function confirmAsPromise(text){
 	return new Promise(r=>$confirm(text,r)) 
}
function saveAsPromise(path,text){
	return new Promise(r=>$file.save(path,text,r))
}
async function loadBranch(registryURL,isUrl=false){
  	try{
      	var registryFile = registryURL || "/a/appMan/registry.url.txt"
		var registry 
        if(isUrl){
          registry = await (await fetch(registryFile)).json()
        }else{
          registry = await (await fetch(await loadAsPromise(registryFile))).json()
        }
        console.log(registry)
    }catch(e){
      	$alert("Failed to fetch registry @"+registryFile+". Do you have internet access?\n"+e)
    	return
    }
    console.log(registry)
    for(var i in registry){
    	let url = registry[i]
        if(url.match(/^\|-/)){
           	var nUrl = url.replace(/^\|-/,"")
        	console.log("branch:",nUrl)
            loadBranch(nUrl,true)
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
  	finishAppLoad()
}
if(loadWindow)setTimeout(loadBranch,500)
function finishAppLoad(){
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
        el.onclick = async ()=>{
	    	if(await confirmAsPromise("Do you want to install \""+data.title+"?\"")){
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
              console.log("main:",mp)
	          eval(await loadAsPromise(mp))
              console.log("installed")
	        }
	    }
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
