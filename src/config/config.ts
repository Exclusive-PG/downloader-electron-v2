import { ConfigType } from "../scripts/types/types";
import { videoInfo } from "ytdl-core"
import { fs, path } from "../scripts/requiredLib"



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
	public setConfig(config: ConfigType) {
		this.config = config;
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

	public validateFileName(fileName: string) : boolean {
		let rg1=/^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
		let rg2=/^\./; // cannot start with dot (.)
		let rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names

		return rg1.test(fileName) && !rg2.test(fileName) && !rg3.test(fileName);

	}
}

