//!This file gets run when AppMan gets opened.
_appMan.open = async function(){
	if(_appMan.instance){
		await alert("AppMan is already open.");
		return;
	}
	var template = await loadFile("/a/.appMan/win.html");
	_appMan.instance = $window(
		{
			title: "AppMan",
			html: template,
			ondestroy: ()=>_appMan.instance = null,
			animationIn:"fadeIn",
			animationOut:"fadeOut",
			resizable: false,
			draggable: false,
			maximizable: false,
			height:innerHeight,
			left: "0px",
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
	);
	_appMan.root = document.getElementById("_AMroot");
	_appMan.getEl("version").innerHTML = `v${_appMan.version}`;
	_appMan.displayApps();
}
_appMan.getEl = function(id, jq=false){
	if(!_appMan.instance)return null;
	var e = document.getElementById(`_AM${id}`)
	return jq ? $(e) : e;
}
_appMan.displayApps = async function(){
	var lst = _appMan.getEl("appList", true);
	lst.innerHTML = "";
	for(var app of _appMan.apps){
		var el = $(`<div class="_AMapp" data-target="${app.title}" data-url="${app._url}"><h3>${app.title}</h3></div>`);
		var desc = $(`<span class="_AMdesc">${app.miniDescription || app.description}</span>`); //Mini-description(because it's in the list, not the overview).
		el.append(desc);
		var type = $(`<span class="_AMtype">${app.type}</span>`);
		el.append(type);
		if(app.volatile){
			el.prop("volatile", true);
			el.prop("data-volatile", true);
			el.attr("volatile", true);
			el.attr("data-volatile", true);
		}
		el.on("click", ()=>_appMan.overview(app));
		lst.append(el);
	}
}
_appMan.overview = async function(app){
	if(_appMan.appOverview){
		_appMan.appOverview.destroy();
	}
	_appMan.appOverview = $window({
		title: `App Overview: ${app.title}`,
		html: app.title,
		center:true,
	});
}