(async function(silent=false){
	var pack = await (await fetch("https://perodactyl.github.io/w93appMan/pack.json")).json()
	for(var i in pack){
		if(i.startsWith("_"))continue;
		var file = pack[i];
		console.log(`Write ${i} to ${file}`);
		$file.save(i, file, $noop);
	}
	$file.save("/a/.appMan/v.txt", pack._version, $noop);
	if(!silent){
		$alert({
			msg: `AppMan V${pack._version} has been installed.`,
			onok: location.reload
		})
	}
})