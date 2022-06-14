import { repeatMode } from "../types/types";

export default class VideoPlayer {
	private player: HTMLVideoElement;
	private repeatModeConfig: repeatMode;

	constructor(player: HTMLVideoElement) {
		this.player = player;
		this.player.volume = 0.5;
		console.log(this.player);
		this.repeatModeConfig = {
			repeatOne: true,
			repeatAll: false,
			repeatOff: false,
		};
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
            console.log("repeat all list");
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
