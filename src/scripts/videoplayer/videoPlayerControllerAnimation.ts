import { AnimationContoller } from "../animations/DownloadAnimationController";

const videoWrapper = document.querySelector<HTMLDivElement>(".video_details_wrapper");
const activePlayerClass = "active-player";
const videoPlayerAnimation = new AnimationContoller(videoWrapper);
const playControls = document.querySelector<HTMLDivElement>(".play-controls");
const sizeControls = 30;
const VolumeIcon = document.querySelector<HTMLDivElement>(".volume-icon");
const repeatModeOne = document.querySelector<HTMLDivElement>(":root");
const repeatModeBtn = document.querySelector<HTMLDivElement>(".repeat-mode");
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

export const repeatModeOffAnimation = () => {
	repeatModeOne.style.setProperty("--show-repeat-one-mode","none");
	repeatModeBtn.style.color = `#fff`
}
export const repeatModeOneAnimation  = () => {
	repeatModeOne.style.setProperty("--show-repeat-one-mode","inline-block");
	repeatModeBtn.style.color = `#fff`
}
export const repeatModeAllAnimation  = () => {
	repeatModeOne.style.setProperty("--show-repeat-one-mode","none");
	repeatModeBtn.style.color = `#f34336`
}
