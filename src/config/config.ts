import { ConfigType, downloadsConfig, videoConfig } from "../scripts/types/types";
import { videoInfo } from "ytdl-core";
import { fs, path } from "../scripts/requiredLib";

// let _defaultConfig : ConfigType = {
// 	format : ".mp4",
// 	dirSave : "downloads",
// 	playlist : "retro"
// }


export default class Config {
	private config: ConfigType;

	private _defaultConfig: ConfigType = {
		downloadsConfig: {
			format: ".mp4",
			dirSave: "downloads",
			playlist: "retro",
		},
		videoConfig: {
			quality: "",
			filter: "audioandvideo",
		},
	};

	private videoPresets = {
		qualityAttr: "data-quality-video",
		filterAttr: "data-filter-video",
		quality: [
			{ key: "Auto (Recommended)", value: "", selectFirst: true },
			{ key: "Highest", value: "highest" },
			{ key: "Lowest", value: "lowest" },
			{ key: "Highest audio", value: "highestaudio" },
			{ key: "Lowest video", value: "lowestvideo" },
			{ key: "Highest video", value: "highestvideo" },
			{ key: "Lowest video", value: "lowestvideo" },
		],
		filter: [
			{ key: "Auto", value: "" },
			{ key: "Audio and video (Recommended)", value: "audioandvideo", selectFirst: true },
			{ key: "Video only", value: "videoonly" },
			{ key: "Audio only", value: "audioonly" },
		],
	};

	constructor(config?: ConfigType) {
		if (config === undefined) {
			this.config = this._defaultConfig;
		} else {
			this.config = config;
		}
	}

	public get configDownloadFiles() {
		return {
			config: this.config.downloadsConfig,
		};
	}
	public get configVideoSettings() {
		return {
			config: this.config.videoConfig,
		};
	}
	public get allConfig() {
		return {
			config: this.config,
		};
	}
	public get videoPresetsSettings() {
		return {
			presets: this.videoPresets,
		};
	}
	public setAllConfig(config: ConfigType) {
		this.config = config;
	}
	public setdownloadsConfig(config: downloadsConfig) {
		this.config.downloadsConfig = config;
	}
	public setVideoConfig(config: videoConfig) {
		this.config.videoConfig = config;
	}
	public createDirectory(path: string = this.config.downloadsConfig.dirSave) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}
	}
	public createPlaylist(playlistPath: string = this.config.downloadsConfig.playlist) {
		if (!fs.existsSync(this.config.downloadsConfig.dirSave)) return;

		if (!fs.existsSync(path.join(this.config.downloadsConfig.dirSave, playlistPath))) {
			fs.mkdirSync(path.join(this.config.downloadsConfig.dirSave, playlistPath));
		}
	}

	public generatedPath(videoData: videoInfo): string {
		const { dirSave, playlist, format } = this.config.downloadsConfig;

		let title = [...videoData.videoDetails.title].map((symbol) => {
				
			return !this.validateFileName(symbol) ? "" : symbol;
			})
			.join("");

		return path.join(dirSave, playlist, `${title}${format}`);
	}

	public validateFileName(fileName: string): boolean {
		let rg1 = /^[^\\/:\*\?"<>\|]+$/; // forbidden characters \ / : * ? " < > |
		let rg2 = /^\./; // cannot start with dot (.)
		let rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i; // forbidden file names

		return rg1.test(fileName) && !rg2.test(fileName) && !rg3.test(fileName);
	}
}
