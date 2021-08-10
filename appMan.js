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
