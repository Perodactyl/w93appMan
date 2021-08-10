//This one goes in /a/appMan! Make sure it stays there!
var container = document.getElementById("appMan-container")
var list = document.getElementById("appMan-appList")
$log("AppMan process running.")
var foundApps = [
  {
  	name:"test",
    type:"js",
    desc:`A test thingy`,
    fs:{
    	"foobar.js":"$notif(It's running!)"
    }
  }
]
list.innerHTML = ""
for(let idx in foundApps){
  	let data = foundApps[idx]
	let el = document.createElement("div")
    el.className = "appMan-app"
    //Style handled by /a/boot/appMan.css
    el.innerHTML = `<span class="appMan-app-title">${data.name}</span>
<span class="appMan-app-description">${data.desc.length > 50 ? data.desc.slice(0,50)+"..." : data.desc}</span>
<span class="appMan-app-type">${data.type}</span>`
    list.append(el)
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
