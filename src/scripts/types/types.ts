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

export type ConfigType = {
	dirSave:string
	format:string
	playlist:string
}