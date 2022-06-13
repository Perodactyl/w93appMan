//!This file runs upon startup, immediately after jquery is loaded.
_appMan.startup = function(){
	le._apps.appMan = {
		accept: ".ami",
		categories: "Tools",
		exec: _appMan.open,
		ext: ["ami"],
		icon: "/c/files/images/icons/radio_small.png",
		name: "App Manager",
	}
}