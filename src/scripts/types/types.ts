export type validateYotubeLinkType = {
	state:boolean,
	msg: string
}

export type toggleElement = {
    state:boolean
}
export type repeatMode = {
	repeatOne?:boolean
	repeatAll?:boolean
	repeatOff?:boolean
}

export type downloadsConfig = {
	dirSave:string
	format:string
	playlist:string
}
export type videoConfig = {
	//preset:string
	quality:"highest" | "lowest" | "highestaudio" | "lowestaudio" | "highestvideo" | "lowestvideo"|"" 
	filter: "audioandvideo" | "videoandaudio " | "videoonly" | "audioonly"| ""
}
export type ConfigType = {
	downloadsConfig:downloadsConfig
	videoConfig:videoConfig
}