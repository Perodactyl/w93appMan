(async function(silent=false){
	var pack = await (await fetch("https://perodactyl.github.io/w93appMan/pack.json")).json()
	var promises = [];
	for(var i in pack){
		if(i.startsWith("_"))continue;
		var file = pack[i];
		console.log(`Write ${i} to ${file}`);
		$file.save(i, file, $noop);
	}
	if(!silent){
		$alert(`AppMan V${pack._version} has been installed.`);
	}
})