//!This file defines functions for loading apps.
_appMan.apps = [];
_appMan.errors = [];
_appMan.load = async function(registryLocation){
	registryLocation = registryLocation ?? await loadFile("/a/.appMan/registry.txt");
	var registry = await (await fetch(registryLocation.trim())).text();
	registry = JSON.parse(registry);
	for(var url of registry){
		if(url.startsWith("|-")){ //Branch to another registry.
			var name = url.substring(2);
			_appMan.load(name);
		}else{
			//: Remove a slash from the end of the url.
			if(url.endsWith("/")){
				url = url.substring(0, url.length - 1);
			}
			try{
				var dataFile = await (await fetch(`${url}/app.json`)).json();
			}catch(e){
				console.warn(`Failed to load data.json for ${url}`);
				_appMan.errors.push(`Failed to load data.json for ${url}`);
				continue;
			}
			_appMan.apps.push(dataFile);
		}
	}
}