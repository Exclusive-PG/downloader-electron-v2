import { AnimationContoller } from "../animations/DownloadAnimationController";

const videoWrapper = document.querySelector<HTMLDivElement>(".video_details_wrapper");
const activePlayerClass = "active-player";
const videoPlayerAnimation = new AnimationContoller(videoWrapper);
const playControls = document.querySelector<HTMLDivElement>(".play-controls");
const sizeControls = 30;
const VolumeIcon = document.querySelector<HTMLDivElement>(".volume-icon");
export const startVideoPlayerAnimations = () => {
	videoPlayerAnimation.StartAnimation(activePlayerClass);
};

export const stopVideoPlayerAnimations = () => {
	videoPlayerAnimation.ExitAnimation([activePlayerClass]);
};

export const playControlsAnimations = (state: boolean) => {
	playControls.innerHTML = `<ion-icon style="font-size: ${sizeControls}px" name="${!state ? "play" : "pause"}"></ion-icon>`;
};

export const volumeIconAnimations = (volume: number) => {
	switch (true) {
		case volume >= 0.5:
			VolumeIcon.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
			break;

		case volume >= 0.025 && volume < 0.5:
			VolumeIcon.innerHTML = `<i class="fa-solid fa-volume-low"></i>`;
			break;

		case volume < 0.025 :
			VolumeIcon.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
			break;
    }
};
