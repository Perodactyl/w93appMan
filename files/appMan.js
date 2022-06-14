//!This file gets run when AppMan gets opened.
_appMan.open = function(){
	_appMan.instance = $window(
		{
			title: "AppMan",
			html: "haha appman go brrr",
			onactive: ()=>location.hash = "#!appMan",
			ondestroy: ()=>_appMan.instance = null,
			animationIn:"fadeIn",
			animationOut:"fadeOut",
			resizable: false,
			draggable: false,
			maximizable: false,
			height:innerHeight,
			center:false,
			header:false,
			menu:[
				{
					name:"Options",
					items:[
						{
							name:"Reload",
							action: ()=>{
								_appMan.apps = [];
								_appMan.errors = [];
								_appMan.load();
							}
						},
						{
							name: "Uninstall",
							action: async ()=>{
								var sure = await confirm("Are you sure you want to uninstall AppMan?");
								if(!sure)return;
								for(var file in $fs.utils.getFolderObj("/a/.appMan")){
									$file.delete(`/a/.appMan/${file}`);
								}
								$file.delete("/a/boot/appMan.boot.js");
							}
						}
					]
				}
			]
		}
	)
}