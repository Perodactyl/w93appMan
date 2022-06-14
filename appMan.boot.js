//! This is the file that goes in /a/boot. If it doesn't get run, then the app will not start.
//#region Utils
function loadFile(path){
	return new Promise(function(resolve, reject){
		try{
			$file.open(path, "String", resolve)
		}catch(e){
			console.warn(`Failed to open ${path}`);
		}
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
function makeGHRequest(file){
	return fetch(`https://perodactyl.github.io/w93appMan/${file}`); //!Files can be cached for up to 5 minutes (super annoying).
}
async function runFile(file, debugMode=true){
	if(debugMode){
		$loader.script(toURL(await loadFile(file), "text/javascript"));
	}else{
		eval(await loadFile(file));
	}
}
function sleep(time){
	return new Promise(r=>setTimeout(r, time));
}
//#endregion
var _appMan = {}
;(async ()=>{
	var latest = (await (await makeGHRequest("v.txt")).text()).trim();
	var current = (await loadFile("/a/.appMan/v.txt")).trim();
	_appMan.version = current;
	if(latest != current){
		var response = await confirm({
			msg:`An update is available(v${latest}). Would you like to update? (Current v${current})`,
			title: "App Manager Update"
		});
		if(response){
			var installer = await makeGHRequest("install.js");
			eval(await installer.text())(true);
		}
	}

	//Load CSS
	$loader.css(toURL(await loadFile("/a/.appMan/appMan.css"), "text/css"));

	await sleep(500);

	//Load jquery
	await runFile("/a/.appMan/jq.js", false);
	$boot.BIOS.innerText += "jquery ... ready"
	//Load the startup file
	await runFile("/a/.appMan/appMan.startup.js", false);
	//Load the mod loader
	await runFile("/a/.appMan/loadApps.js", false);
	await _appMan.load();

	await onBoot();

	//Load appMan
	await runFile("/a/.appMan/appMan.js", false);
	await _appMan.startup();
	$boot.BIOS.innerText += "appman ... ready"
})();