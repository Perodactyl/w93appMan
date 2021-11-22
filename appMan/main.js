//This file belongs in /a/boot
//Make sure it stays there!
$kernel.on("splash:ready",()=>setTimeout(()=>{$notif("App Manager loaded, press Alt+A to open.")}, 3000))
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
            animationOut:"fadeOut",
            resizable:false,
			draggable:false,
            maximizable:false,
            height:innerHeight,
            center:false,
            header:false,
            menu:[
    				{
      					name: "Options",
      					items: [
        					{
          						name: "Uninstall",
          						action: promptAppManDestroy
          					}
                        ]
        			}
  			]
          })
        proc.el.base.style.left="0px"
		proc.el.base.style.top="0px"
    	initAppManKernel()
	})
}
setInterval(()=>{
	if(proc){
    	proc.el.base.style.height = innerHeight+"px"
    }
},500)
function initAppManKernel(){
	$file.open("/a/appMan/main.js", "String", (c)=>{eval(c)})
}
if(location.hash == "#!appMan"){
	startup()
}else{
  initAppManKernel()
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
window.uninstallAppMan = function(){
  	console.log("Deleting...")
	  $file.delete("/a/boot/appMan.js")
    $file.delete("/a/appMan/main.js")
    $file.delete("/a/appMan/main.html")
    $file.delete("/a/appMan/")
    $notif("Uninstalled App Manager!")
    $log("Attempt to uninstall app manager.")
}

window.promptAppManDestroy = ()=>{
	setTimeout(()=>{
		$confirm("Really uninstall?",(yes)=>{
			if(!yes)return
			uninstallAppMan()
			setTimeout(()=>{
				location.reload()
            },500)
		})
	},1)
}

$boot.TOOLONG.innerText = "App Manager Commonly makes boot take a while."
$boot.REINSTALL.innerText = "Boot Options"



//Add aliases:
$kernel.on("splash:ready", ()=>{
  document.body.addEventListener("DOMSubtreeModified", ()=>{
	document.querySelector("#s42_dock").classList.add("__bottomBar")
	document.querySelector("#s42_background").classList.add("__background")
    $("header.ui_window__head").toggleClass("__window-top",true).toggleClass("__background",true)
  })
})
