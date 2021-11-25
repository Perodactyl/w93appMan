var GitHub = require('github-api')
var fetch = require("node-fetch")
var atob = require("atob")

var gh = new GitHub({
   username: 'Perodactyl',
   token: ''
});

var r = gh.getRepo("Perodactyl/w93appMan");
(async ()=>{
   var u = process.argv[2].match(/^\|-/) ? process.argv[2].replace("|-","") : process.argv[2]+"app.json"
   try{
      var f = await fetch(u).then(d=>d.json())
   }catch(e){
      console.error("Failed to test validity of URL:"+u+"\n"+e)
      return
   }
   console.log(f)
   var conts = await r.getContents()
   var registry = conts.data.filter(f=>f.name=="registry.json")[0]
   var fileConts = JSON.parse(atob((await fetch(registry.git_url).then(v=>v.json())).content))
   fileConts.push(process.argv[2])
   var strConts = JSON.stringify(fileConts,null,"\t")
   r.writeFile("master","registry.json",strConts,"API add file\n"+u)
})()
