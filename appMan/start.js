//This file belongs in /a/appMan! Make sure it stays there!
//Run this to open a window.
// I would use it to make a desktop shortut, linking to:
//  js /a/appMan/start.js



if(typeof startAppMan !== "undefined"){
  startAppMan()
}else{
  $confirm("App Manager didn't initialize. Do you want to reboot and start it?", (y)=>{
    if(!y)return
    location.hash = "#!appMan"
    location.reload()
  })
}
