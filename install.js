(async function(silent=false){
	var pack = await (await fetch("https://perodactyl.github.io/w93appman/pack.json")).json()
	var promises = [];
	for(var i in pack){
		if(i.beginsWith("_"))continue;
		var file = pack[i];
		var p = new Promise(function(resolve, reject){
			$file.save(file.path, file.contents, resolve);
		});
	}
	await Promise.all(promises);
	if(!silent){
		$alert(`AppMan V${pack._version} has been installed.`);
	}
})