import { path } from "../requiredLib";
import VideoPlayer from "./VideoPlayer";
import { playControlsAnimations, startVideoPlayerAnimations, stopVideoPlayerAnimations, volumeIconAnimations } from "./videoPlayerControllerAnimation";

const videoElement = document.querySelector<HTMLVideoElement>("[data-video]");
const poster = document.querySelector<HTMLImageElement>("[data-poster-video]");
const playControls = document.querySelector<HTMLDivElement>(".play-controls");
const FullScreenControls = document.getElementById("full-screen-controls-predownload");
const PictureInPictureControls = document.getElementById("mini-player-controls-id");
const previewImg = document.querySelector<HTMLImageElement>(".preview-img");
const thumbnailImg = document.querySelector<HTMLDivElement>(".thumb-img");
const timeLineContainer = document.querySelector<HTMLDivElement>(".timeline-container");
const VolumeContainer = document.querySelector<HTMLDivElement>(".volume-container");
const volumeBar = document.querySelector<HTMLDivElement>(".volume-bar");
const durationVideoContainer = document.querySelector<HTMLDivElement>(".duration-video");
const currentTimeVideoContainer = document.querySelector<HTMLDivElement>(".current-time")
const allControlsPlayer = document.querySelector<HTMLDivElement>(".controls-videoplayer");
const RotatePosterAndVideoPlayer = document.getElementById("rotate-poster-videoplayer")
export const videoPlayer = new VideoPlayer(videoElement);

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
	console.log(`${durationVideo(videoElement.currentTime)}/${durationVideo(videoElement.duration)}`)

//	console.log(videoElement.currentTime)
	timeLineContainer.style.setProperty("--progress-position", percent.toString());
});

function PlayControls() {
	videoPlayer.toggle();
	console.log(videoPlayer.isPlaying);
	playControlsAnimations(videoPlayer.isPlaying.state);
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
const leadingZeroFormatter = new Intl.NumberFormat(undefined,{
	minimumIntegerDigits:2
})

function durationVideo(time:number) {
const seconds = Math.floor(time % 60);
const minutes = Math.floor(time / 60) % 60;
const hour = Math.floor(time / 3600);

if(hour === 0){
	return `${minutes}:${leadingZeroFormatter.format(seconds)}`
}else{
	return `${hour}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(seconds)}`
}
}

//ROTATE POSTER AND VIDEO
let isRotateMode = true;

RotatePosterAndVideoPlayer.addEventListener("click",()=> {
	isRotateMode = !isRotateMode
	activeRotateMode()	
})

function rotateMode(){
	playControlsAnimations(videoPlayer.isPlaying.state)
	if(isRotateMode){
	RotatePosterAndVideoPlayer.style.color = "#f34336"
	videoPlayer.isPlaying.state ? startVideoPlayerAnimations() : stopVideoPlayerAnimations();
	}else{
		RotatePosterAndVideoPlayer.style.color = "#fff"
	}
}

function activeRotateMode(){
	isRotateMode ? RotatePosterAndVideoPlayer.style.color = "#f34336" : RotatePosterAndVideoPlayer.style.color = "#fff"
}
//EVENTS BINDING



poster.addEventListener("click", PlayControls);

playControls.addEventListener("click", PlayControls);

FullScreenControls.addEventListener("click", toggleFullScreenMode);

PictureInPictureControls.addEventListener("click", togglePictureInPictureMode);

videoElement.addEventListener("play", rotateMode);
videoElement.addEventListener("pause",  rotateMode);


videoElement.addEventListener("click", PlayControls);

timeLineContainer.addEventListener("mousemove", handeTimeLineUpdate);

timeLineContainer.addEventListener("mousedown", toggleScrubbing);

VolumeContainer.addEventListener("mousedown", scrubbingVolume);


let timeout : NodeJS.Timeout 

videoElement.addEventListener("mousemove",()=>{
	clearTimeout(timeout)
	allControlsPlayer.style.opacity = "1";
	timeout = setTimeout(()=>{allControlsPlayer.style.opacity = "0";},2000)
})

allControlsPlayer.addEventListener("mousemove",()=>{
	clearTimeout(timeout)
	allControlsPlayer.style.opacity = "1";
	timeout = setTimeout(()=>{allControlsPlayer.style.opacity = "0";},2000)
})




document.addEventListener("mouseup", (e) => {
	if (isScrubbing) {
		toggleScrubbing(e);
	}
	if(isScrubbingVolume){
		scrubbingVolume(e)
	}
});

VolumeContainer.addEventListener("mousemove", handeVolumeUpdate);
