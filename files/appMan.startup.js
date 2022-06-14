//!This file runs upon startup, immediately after jquery is loaded.
_appMan.startup = function(){
	le._apps.appMan = {
		accept: ".ami", //AMI: AppMan Installer
		categories: "Tools",
		exec: _appMan.open,
		ext: ["ami"],
		icon: "/c/files/images/icons/radio_small.png",
		name: "App Manager",
	}
}
//: Stylize the template.
_appMan.stylizeTemplate = function(template){
	try{
		var env = {
			apps: _appMan.apps,
			errors: _appMan.errors,
			version: _appMan.version,
		}
		template = template.replace(/\$(\w+);/g, (match, name)=>{
			return env[name] || `[${name}]`;
		});
		template = template.replace(/\$\{(\w+)\}/g, (match, name)=>{
			//Evaluate the expression.
			try{
				return eval(name);
			}catch(e){
				return `[${name}: ${e}]`;
			}
		});
	}catch(e){
		console.error(e);
		return `[Template Error (${e})]`;
	}
}