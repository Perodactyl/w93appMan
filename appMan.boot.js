//! This is the file that goes in /a/boot. If it doesn't get run, then the app will not start.
//#region Utils
function loadFile(path){
	return new Promise(function(resolve, reject){
		$file.open(path, "String", resolve)
	});
}
function storeFile(path, contents){
	return new Promise(function(resolve, reject){
		$file.save(path, contents, resolve)
	});
}
function onBoot(){
	return new Promise(function(resolve, reject){
		$kernel.on("splash:ready", resolve);
	});
}
function toURL(contents, mimetype){
	return `data:${mimetype};base64,${btoa(contents)}`;
}
function ask(message, placeholder){
	return new Promise(function(resolve, reject){
		$prompt(message, placeholder, resolve);
	});
}
function alert(message){
	return new Promise(function(resolve, reject){
		$alert(message, resolve);
	});
}
function confirm(message){
	return new Promise(function(resolve, reject){
		$confirm(message, resolve);
	});
}
//#endregion
(async ()=>{
	function makeGHRequest(file){
		return fetch(`https://perodactyl.github.io/w93appman/${file}`); //!Files can be cached for up to 5 minutes (super annoying).
	}
	var latest = await makeGHRequest("v.txt");
	var current = await loadFile("/a/.appMan/v.txt");
	if(latest != current){
		var response = await confirm(`An update is available(v${latest}). Would you like to update? (Current v${current})`);
		if(response){
			var installer = await makeGHRequest("install.js");
			eval(await installer.text())(true);
		}
	}

	//Load jquery
	eval(await loadFile("/a/.appMan/jq.js"));
	$boot.BIOS.innerText += "Jquery ... ready"
	//Load appMan
	eval(await loadFile("/a/.appMan/appMan.startup.js"));
	$boot.BIOS.innerText += "AppMan ... ready"
})();