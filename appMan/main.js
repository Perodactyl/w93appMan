//This one goes in /a/appMan! Make sure it stays there!
var container = document.getElementById("appMan-container")
container.innerHTML = "<h3>App Manager</h3>Hello. Welcome to App Manager! This is really WIP.<button onclick=\"uninstallappMan()\">Uninstall</button>"
window.uninstallappMan = function(){
  	console.log("Deleting...")
	  $file.delete("/a/boot/appMan.js")
    $file.delete("/a/appMan/main.js")
    $file.delete("/a/appMan/main.html")
    $file.delete("/a/appMan/")
    $notif("Uninstalled App Manager!")
    $log("Attempt to uninstall app manager.")
}
