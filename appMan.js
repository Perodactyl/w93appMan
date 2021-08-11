//This file belongs it /a/boot
//Make sure it stays there!
setTimeout(()=>{$notif("App Manager loaded, press Alt+A to open.")}, 10000)
var proc = null
document.addEventListener("keyup", (ev)=>{
	if(ev.key == "a" && ev.altKey){
		//ev.preventDefault()
      	if(proc != null){
    		//$alert("A process is still running.")
          	proc.close()
            proc = null
        	return
    	}
    	startup()
	}
})
function startup(){
	$file.open("/a/appMan/main.html", "String", (c)=>{
    	proc = $window(
    	  {
    	    title:"App Manager",
    	    html:c,
    	    onactive:()=>{location.hash = "#!appMan"},
    	    ondestroy:()=>{proc = null},
            animationIn:"fadeIn",
            animationOut:"fadeOut"
          })
    	$file.open("/a/appMan/main.js", "String", (c)=>{eval(c)})
	})
}
if(location.hash == "#!appMan"){
	startup()
}
$kernel.on("splash:ready", ()=>{
	fetch("https://perodactyl.github.io/w93appMan/v.txt").then((r)=>{r.text().then((t)=>{
      $file.open("/a/appMan/v.txt", "String", (v)=>{
      	if(v != t){
        	$confirm("App Manager has an update. Do you want to install it?", (y)=>{
            	if(y){
                  	sessionStorage.setItem("AllowReinstall", "yes")
                	uninstallappMan()
                    fetch("https://perodactyl.github.io/w93appMan/install.js").then((r)=>{r.text().then((t)=>{eval(t)})})
                }
            })
        }
      })
    })})
})
window.uninstallappMan = function(){
  	console.log("Deleting...")
	  $file.delete("/a/boot/appMan.js")
    $file.delete("/a/appMan/main.js")
    $file.delete("/a/appMan/main.html")
    $file.delete("/a/appMan/")
    $notif("Uninstalled App Manager!")
    $log("Attempt to uninstall app manager.")
}
