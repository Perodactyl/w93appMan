//!This file gets run when AppMan gets opened.
_appMan.open = function(){
	_appMan.instance = $window(
		{
			title: "AppMan",
			html: "haha appman go brrr",
			onactive: ()=>location.hash = "#!appMan",
			ondestroy: _appMan.instance = null,
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
								$alert("WOW")
							}
						}
					]
				}
			]
		}
	)
}