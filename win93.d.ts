type Func = (...args: any[]) => any;

declare type _AlertObject = WinObject & {
	msg: string;
	img: string;
}

/** @description Shows an alert box that the user can close. */
declare function $alert(options:_AlertObject, callback:Func)
declare function $alert(message:string, callback:Func)

/** @description Shows a confirmation alert box that the user can close. The same as $alert, except with a question mark icon and a OK and Cancel button, where the OK buttons returns true in a callback.*/
declare function $confirm(options:_AlertObject, callback:Func)
declare function $confirm(message:string, callback:Func)

/** @description Runs an application. You can also specify arguments like in the terminal. Returns true if the app exists, and false if it doesn't. */
declare function $exe(name:string): boolean

/** @description Opens a new file explorer window. Returns an ExplorerInstance. */
declare function $explorer(path:string): ExplorerInstance
declare interface ExplorerInstance {
	cfg: ExplorerCfg;
	el: HTMLElement[];
	getPath(): string;
	getSaveInput(): unknown; //todo: Document this
	getSelectionInput(): unknown; //todo: Document this
	getWindow(): WinInstance;
	go(path:string): void;
	id: number;
	refresh(): void;
	reorder(): unknown; //todo: Document this
}
declare interface ExplorerCfg {
	backgroundClass: string;
	browse: boolean; //todo: Document this
	footer: boolean;
	id: number;
	menu: boolean;
	nav: boolean;
	onclose(): void;
	onopen(): void;
	onready(): void;
	save: boolean;
	silent: boolean; //todo: Document this
	viewType: "icons" | "list";
}

declare interface $kernel{ //todo: proper documentation
	on(event: string, callback: Func): void;
	on(event: "splash:ready", callback: Func): void;
}
declare const $kernel: $kernel;

declare interface $log{
	(text: string): void;
	pass(text: string): void;
	fail(text: string): void;
	bold(text: string): void;
	italic(text: string): void;
	code(text: string): void;
	error(text: string): void;
	success(text: string): void;
	any_color(text: string): void; //Didn't recieve much info on this one.
}
declare const $log: $log;

declare function $notif(options:NotifObject): void;
declare function $notif(message: string): void;
declare interface NotifObject {
	msg: string;
	title?: string;
	img?: string;
	length?: number;
}

declare function $prompt(text:string, placeholder:string, callback:Func): void;
declare function $prompt(options: WinObject, placeholder:string, callback:Func): void;

declare interface $window{
	(options:WinObject): WinInstance;
	instances: WinInstance[];
	current(): WinInstance;
	form(form:string, callback:Func): WinInstance; //? Does this return a WinInstance?
	active(id: number): void;
	close(id: number): void;
	destroy(id: number): void;
	maximize(id: number): void;
	/** @throws This will throw an error if the specified window is not minimized. */
	restore(id: number): void;
}
declare const $window: $window;
declare interface WinInstance {
	active(): boolean;
	cfg: WinObject;
	changeFooter(text:string): void;
	changeIcon(icon:string): void;
	changeTitle(text:string): void;
	changeSize(width:number, height:number): void;
	close(): void;
	destroy(): void;
	el: HTMLElement[];
	id: number;
	maximize(): void;
	menu: MenuArr;
	minimize(): void;
	restore(): void;
}
declare interface WinObject {
	url?: string;
	title?: string;
	width: number;
	height: number;
	html?: string;
	icon?: string;
	header?: boolean;
	resizable?: boolean;
	maximizable?: boolean;
	minimizable?: boolean;
	draggable?: boolean;
	closable?: boolean;
	dockable?: boolean;
	center?: boolean;
	help?: string;
	menu?: MenuArr;
	footer?: string;
	contextmenu?: MenuArr;
	animationIn: AnimationIn;
	animationOut: AnimationOut;
	onactive(): void;
	oncancel(): void;
	onclose(): void;
	ondestroy(): void;
	ondrag(): void;
	ondragstop(): void;
	onminimize(): void;
	onok(): void;
	onopen(): void;
	onready(): void;
	automaximize?: boolean;
}

declare interface $db{}; //todo: proper documentation
declare const $db: $db;

declare interface $file{
	save(path:string, content:string, callback?:Func): void;
	open(path:string, type:"String"|"Object"|"Blob", callback?:Func): void;
	copy(fromPath:string, toPath:string, callback?:Func): void;
	delete(path:string, callback?:Func): void;
	download(path:string, name:string): void;
	format(callback: Func): void;
	move(fromPath:string, toPath:string, callback?:Func): void;
	rename(path:string, newName:string, callback?:Func): void;
	upload(callback: (files:FileList)=>void, todo)
}
declare const $file: $file;

declare interface $fs{ //todo: proper documentation
	utils: {
		exist(path:string): boolean;
		find(origin:string, term:string): string[];
		getMime(path:string): string;
		getFileName(file): string; //todo: Find out what this does
		getFolderName(file): string; //todo: Find out what this does
		getFolderObj(path:string): FolderObj;
		getFolderPath(file): string;
		getIcon(path:string): string;
		getName(path:string): string; //todo: Find out what this does
	}
}
declare const $fs: $fs;
declare interface FolderObj {
	cwd: string;
	obj: _FolderObjItem
}
/** @description Objects are subfolders, 0 means file. */
declare interface _FolderObjItem {
	[key:string]: _FolderObjItem | 0;
}

declare interface $store{}; //todo: proper documentation
declare const $store: $store;

/** @deprecated Used internally for making web requests using Ajax. Look into the Fetch API instead.*/
declare function $ajax(...args:unknown[]);

declare interface $animate{
	(el: HTMLElement, anim:string, cb: Func): void;
	i: AnimationIn[],
	o: AnimationOut[],
}
declare const $animate: $animate;

declare function $archive(path:string, name:string)

/** @description Wrapper of Howler.js */
declare interface $audio{} //todo: proper documentation (Wrapper of Howler.js)
declare const $audio: $audio;

declare interface $boot{
	BIOS: HTMLElement;
	BIOSERROR: HTMLElement;
	BOOTLOG: HTMLElement;
	REINSTALL: HTMLElement;
	TOOLONG: HTMLElement;
	VERSION: string;
	hasError: boolean;
	onerror(): void;
}
declare const $boot: $boot;

declare interface $box{ //todo: proper documentation
	overlap(elem1:HTMLElement, elem2:HTMLElement): boolean;
}
declare const $box: $box;

/** @deprecated Internal Function for creating a terminal. Instead, set cli & terminal to true in your le._apps entry*/
declare function $cli(e:HTMLElement, t:unknown) //!Internal

declare function $drag(element:HTMLElement, options: DragOptions): void;
declare interface DragOptions {
	constrain?: boolean;
	ghost?: boolean;
	grid?: boolean;
	handle?: HTMLElement;
	distance?: number; //:UNDOCUMENTED
	oninit?: Func;
	onstart?: Func;
	ondrag?: Func;
	onstop?: Func;
}

declare interface $loader{
	script(path:string): void;
	css(path:string): void;
}
declare const $loader: $loader;



declare type AnimationIn = 
	"rubberBand"		| 
	"swing"				|
	"tada"				|
	"wobble"			|
	"bounceIn"			|
	"bounceInDown"		|
	"bounceInLeft"		|
	"fadeIn"			|
	"fadeInDown"		|
	"fadeInDownBig"		|
	"fadeInLeft"		|
	"fadeInLeftBig"		|
	"fadeInRight"		|
	"flip"				|
	"flipInX"			|
	"flipInY"			|
	"lightSpeedIn"		|
	"rotateIn"			|
	"rotateInDownLeft"	|
	"rotateInDownRight"	|
	"rotateInUpRight"	|
	"slideInDown"		|
	"slideInLeft"		|
	"rollIn"			|
	"zoomIn"			|
	"zoomInDown"		|
	"zoomInLeft"		|
	"zoomInRight"		|
	"zoomInUp"			;

declare type AnimationOut =
	"bounceOut"			|
	"bounceOutDown"		|
	"bounceOutLeft"		|
	"bounceOutRight"	|
	"bounceOutUp"		|
	"fadeOut"			|
	"fadeOutDown"		|
	"fadeOutDownBig"	|
	"fadeOutLeft"		|
	"fadeOutLeftBig"	|
	"fadeOutRight"		|
	"fadeOutRightBig"	|
	"fadeOutUp"			|
	"lightSpeedOut"		|
	"rotateOut"			|
	"rotateOutDownLeft"	|
	"rotateOutDownRight"|
	"rotateOutUpLeft"	|
	"rotateOutUpRight"	|
	"slideOutUp"		|
	"slideOutLeft"		|
	"slideOutRight"		|
	"hinge"				|
	"rollOut"			|
	"zoomOut"			|
	"zoomOutDown"		|
	"zoomOutLeft"		|
	"zoomOutRight"		|
	"zoomOutUp"			;


declare type MenuArr = MenuSection[]
declare interface MenuSection {
	name: string;
	items: MenuItem[]
}
declare interface MenuItem {
	name: string | "---";
	action(): void;
}