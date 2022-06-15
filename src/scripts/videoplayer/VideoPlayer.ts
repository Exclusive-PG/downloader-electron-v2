import { repeatMode } from "../types/types";

export default class VideoPlayer {
	private player: HTMLVideoElement;
	private repeatModeConfig: repeatMode;
	private listSrcVideos: Array<string>;

	constructor(player: HTMLVideoElement) {
		this.player = player;
		this.player.volume = 0.5;
		this.repeatModeConfig = {
			repeatOne: true,
			repeatAll: false,
			repeatOff: false,
		};

		this.listSrcVideos = [];

		console.log(this.player);
	}

	public play() {
		this.player.paused && this.player.play();
	}
	public pause() {
		!this.player.paused && this.player.pause();
	}
	public toggle() {
		this.player.paused ? this.player.play() : this.player.pause();
	}
	get isPlaying() {
		return {
			state: this.player.paused ? false : true,
		};
	}
	public setSourceStream(source: string) {
		this.player.src = source;
	}
	public setVideoVolume(volume: number) {
		this.player.volume = volume;
	}

	get SourceStream() {
		return this.player.src;
	}

	public setRepeatMode(inputStateRepeatMode: repeatMode) {
		let { repeatOne, repeatAll, repeatOff } = inputStateRepeatMode;

		if (repeatOne && repeatAll && repeatOff) {
			repeatAll = false;
			repeatOne = false;
			repeatOff = true;
			return;
		}

		this.repeatModeConfig = inputStateRepeatMode;
	}
	public repeatModeActive() {
		let { repeatOne, repeatAll, repeatOff } = this.repeatModeConfig;

		if (repeatOne) {
			this.player.ended && this.player.play();
			console.log("repeat one time");
		}

		if (repeatAll) {
			if (this.listSrcVideos.length === 0) return;

			console.log("repeat all list");
		}

		if (repeatOff) {
			console.log("repeat off");
		}

		console.log(this.repeatModeConfig);
	}

	get VariablesForRepeatMode() {
		return {
			repeatOne: "repeat-one",
			repatAll: "repeat-all",
			repeatOff: "repeat-off",
		};
	}
}
