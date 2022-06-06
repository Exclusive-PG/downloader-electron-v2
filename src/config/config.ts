import { videoInfo } from "ytdl-core"
import { fs, path } from "../scripts/requiredLib"

type ConfigType = {
	dirSave:string
	format:string
	playlist:string
}

let _defaultConfig : ConfigType = {
	format : ".mp4",
	dirSave : "downloads",
	playlist : "retro"
}

export default class Config {

    private config:ConfigType

	constructor(config?:ConfigType) {
		
		if (config === undefined) {
			this.config = _defaultConfig;
		}
        else{
			this.config = config;

        }
	
	}

	public get configDownloadFiles() {
		return {
			config: this.config
		};
	}

	public createDirectory(path: string = this.config.dirSave){
		if(!fs.existsSync(path)){
			fs.mkdirSync(path);
		}
	}
	public createPlaylist(playlistPath: string = this.config.playlist){
		if(!fs.existsSync(this.config.dirSave))
				return;

		if(!fs.existsSync(path.join(this.config.dirSave,playlistPath))){
			fs.mkdirSync(path.join(this.config.dirSave,playlistPath));

		}
	}

	public generatedPath(videoData: videoInfo) : string{
		const {dirSave,playlist,format} = this.config;
		return path.join(dirSave,playlist,`${videoData.videoDetails.title}${format}`)
	}
}

