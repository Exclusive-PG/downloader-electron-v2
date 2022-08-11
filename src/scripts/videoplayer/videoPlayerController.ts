import { path } from "../requiredLib";
import VideoPlayer from "./VideoPlayer";
import {
	playControlsAnimations,
	repeatModeAllAnimation,
	repeatModeOffAnimation,
	repeatModeOneAnimation,
	startVideoPlayerAnimations,
	stopVideoPlayerAnimations,
	volumeIconAnimations,
} from "./videoPlayerControllerAnimation";
import { ManipulateDOM } from "./../manipulateDOM";

const videoElement = document.querySelector<HTMLVideoElement>("[data-video]");
const poster = document.querySelector<HTMLImageElement>("[data-poster-video]");
const playControls = document.querySelector<HTMLDivElement>(".play-controls");
const FullScreenControls = document.getElementById("full-screen-controls-predownload");
const PictureInPictureControls = document.getElementById("mini-player-controls-id");

const timeLineContainer = document.querySelector<HTMLDivElement>(".timeline-container");
const VolumeContainer = document.querySelector<HTMLDivElement>(".volume-container");
const volumeBar = document.querySelector<HTMLDivElement>(".volume-bar");
const durationVideoContainer = document.querySelector<HTMLDivElement>(".duration-video");
const currentTimeVideoContainer = document.querySelector<HTMLDivElement>(".current-time");
const allControlsPlayer = document.querySelector<HTMLDivElement>(".controls-videoplayer");
const RotatePosterAndVideoPlayer = document.getElementById("rotate-poster-videoplayer");
const repeatControls = document.querySelector<HTMLDivElement>("[data-state-repeat-mode]");
export const videoPlayer = new VideoPlayer(videoElement);
const manipulateDOM = new ManipulateDOM();

//Timeline
let isScrubbing = false;

function toggleScrubbing(e: MouseEvent) {
	const rect = timeLineContainer.getBoundingClientRect();
	const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

	isScrubbing = (e.buttons & 1) === 1;
	document.querySelector<HTMLDivElement>(".video_wrapper").classList.toggle("scrubbing");
	if (isScrubbing) {
		videoPlayer.pause();
	} else {
		videoElement.currentTime = percent * videoElement.duration;
		if (!videoPlayer.isPlaying.state) videoPlayer.play();
	}
	handeTimeLineUpdate(e);
}

function handeTimeLineUpdate(e: MouseEvent) {
	const rect = timeLineContainer.getBoundingClientRect();
	const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

	const percentVertical = Math.min(Math.max(0, e.y - rect.y), rect.height) / rect.height;
	//	console.log(percentVertical);
	//const previewImgNumber = Math.max(1,Math.floor((percent*videoElement.duration)/10))
	//const previewImgSrc= `${previewImgNumber}.jpg`
	//previewImg.src = previewImgSrc
	//console.log(path.dirname(videoPlayer.SourceStream).split(path.sep).pop())
	//console.log(percent)
	timeLineContainer.style.setProperty("--preview-position", percent.toString());

	if (isScrubbing) {
		e.preventDefault();
		//thumbnailImg.src = previewImgSrc;
		timeLineContainer.style.setProperty("--progress-position", percent.toString());
	}
}

videoElement.addEventListener("timeupdate", () => {
	const percent = videoElement.currentTime / videoElement.duration;
	durationVideoContainer.textContent = durationVideo(videoElement.duration);
	currentTimeVideoContainer.textContent = durationVideo(videoElement.currentTime);
	console.log(`${durationVideo(videoElement.currentTime)}/${durationVideo(videoElement.duration)}`);

	//	console.log(videoElement.currentTime)
	timeLineContainer.style.setProperty("--progress-position", percent.toString());
});

function PlayControls() {
	videoPlayer.toggle();
	console.log(videoPlayer.isPlaying);
	playControlsAnimations(videoPlayer.isPlaying.state);

	if (isRotateMode) rotateMode();
}

export const setPoster = (thumbnails: any) => {
	poster.src = thumbnails[thumbnails.length - 1].url;
	poster.dataset.posterVideo = "done";
	document.querySelector(".poster-video").classList.add("poster-done");
	setTimeout(() => {
		document.querySelector(".poster-video").classList.remove("poster-done");
	}, 1000);
};

export const disabledVideoPlayer = () => {
	videoPlayer.pause();
	stopVideoPlayerAnimations();
};
export const enabledVideoPlayer = () => {
	startVideoPlayerAnimations();
	videoElement.currentTime = 0;
	videoElement.load();
	videoPlayer.play();
};

export const toggleFullScreenMode = () => {
	if (document.fullscreenElement === null) {
		document.querySelector<HTMLDivElement>(".video_wrapper").requestFullscreen();
	} else {
		document.exitFullscreen();
	}
};

export const togglePictureInPictureMode = () => {
	if (document.pictureInPictureElement) {
		document.exitPictureInPicture();
	} else {
		if (document.pictureInPictureEnabled) {
			videoElement.requestPictureInPicture();
		}
	}
};

// VOLUME
let isScrubbingVolume = false;
function handeVolumeUpdate(e: MouseEvent) {
	const rect = VolumeContainer.getBoundingClientRect();
	//console.log(rect);

	const percent = 1 - Math.min(Math.max(0, e.y - rect.y), rect.height) / rect.height;

	if (isScrubbingVolume) {
		e.preventDefault();
		volumeBar.style.setProperty("--progress-volume", percent.toString());
		volumeIconAnimations(percent);
		videoPlayer.setVideoVolume(percent);
	}
}

function scrubbingVolume(e: MouseEvent) {
	isScrubbingVolume = (e.buttons & 1) === 1;
	handeVolumeUpdate(e);
}

//DURATION VIDEO
const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
	minimumIntegerDigits: 2,
});

function durationVideo(time: number) {
	const seconds = Math.floor(time % 60);
	const minutes = Math.floor(time / 60) % 60;
	const hour = Math.floor(time / 3600);

	if (hour === 0) {
		return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
	} else {
		return `${hour}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`;
	}
}

//ROTATE POSTER AND VIDEO
let isRotateMode = true;

RotatePosterAndVideoPlayer.addEventListener("click", () => {
	isRotateMode = !isRotateMode;
	activeRotateMode();
});

function rotateMode() {
	if (isRotateMode) {
		videoPlayer.isPlaying.state ? startVideoPlayerAnimations() : stopVideoPlayerAnimations();
	}
}

function activeRotateMode() {
	manipulateDOM.toggleClass("rotate-poster-videoplayer", "rotate_mode_active");
}

//Repeat mode switcher
let currentState = 1;
const repeatModeSwitcher = () => {
	let isStatus = repeatControls.hasAttribute("data-state-repeat-mode");

	const { repatAll, repeatOff, repeatOne } = videoPlayer.VariablesForRepeatMode;
	const STATE = [repeatOff, repeatOne, repatAll];

	currentState === STATE.length - 1 ? (currentState = 0) : ++currentState;

	isStatus && repeatControls.setAttribute("data-state-repeat-mode", STATE[currentState]);
	console.log(STATE[currentState]);

	switch (STATE[currentState]) {
		case repeatOne:
			repeatModeOneAnimation();
			break;
		case repatAll:
			repeatModeAllAnimation();
			break;
		case repeatOff:
			repeatModeOffAnimation();
			break;
	}
};
// UI hide or show

let timeout: NodeJS.Timeout;

const toggleUIPlayer = (timeoutMS: number) => {
	clearTimeout(timeout);
	allControlsPlayer.style.opacity = "1";
	timeout = setTimeout(() => {
		allControlsPlayer.style.opacity = "0";
	}, timeoutMS);
};
//EVENTS BINDING

poster.addEventListener("click", PlayControls);

playControls.addEventListener("click", PlayControls);

FullScreenControls.addEventListener("click", toggleFullScreenMode);

PictureInPictureControls.addEventListener("click", togglePictureInPictureMode);

videoElement.addEventListener("play", () => playControlsAnimations(videoPlayer.isPlaying.state));
videoElement.addEventListener("pause", () => playControlsAnimations(videoPlayer.isPlaying.state));
videoElement.addEventListener("ended", () => {
	let isStatus = repeatControls.hasAttribute("data-state-repeat-mode");
	let valueStatus = repeatControls.getAttribute("data-state-repeat-mode");

	console.log(valueStatus);
	if (isStatus) {
		switch (valueStatus) {
			case videoPlayer.VariablesForRepeatMode.repeatOne:
				videoPlayer.setRepeatMode({ repeatOne: true });
				break;

			case videoPlayer.VariablesForRepeatMode.repatAll:
				videoPlayer.setRepeatMode({ repeatAll: true });
				break;

			case videoPlayer.VariablesForRepeatMode.repeatOff:
				videoPlayer.setRepeatMode({ repeatOff: true });
				break;
		}

		videoPlayer.repeatModeActive();
	}
});

repeatControls.addEventListener("click", repeatModeSwitcher);
videoElement.addEventListener("click", PlayControls);

timeLineContainer.addEventListener("mousemove", handeTimeLineUpdate);

timeLineContainer.addEventListener("mousedown", toggleScrubbing);

VolumeContainer.addEventListener("mousedown", scrubbingVolume);

videoElement.addEventListener("mousemove", () => toggleUIPlayer(1000));
allControlsPlayer.addEventListener("mouseleave", () => toggleUIPlayer(1000));

allControlsPlayer.addEventListener("mouseenter", () => {
	clearTimeout(timeout);
	allControlsPlayer.style.opacity = "1";
});

document.addEventListener("mouseup", (e) => {
	if (isScrubbing) {
		toggleScrubbing(e);
	}
	if (isScrubbingVolume) {
		scrubbingVolume(e);
	}
});

VolumeContainer.addEventListener("mousemove", handeVolumeUpdate);

document.addEventListener("load", () => {
	console.log("app is loaded");
});

document.addEventListener("fullscreenchange", function () {
	console.log("change full screen");
	document.fullscreenElement === null
		? (document.querySelector<HTMLDivElement>(".controls").style.left = "15%")
		: (document.querySelector<HTMLDivElement>(".controls").style.left = "2%");
});

// const previewImg = document.querySelector<HTMLImageElement>(".preview-img");
// const thumbnailImg = document.querySelector<HTMLDivElement>(".thumb-img");
