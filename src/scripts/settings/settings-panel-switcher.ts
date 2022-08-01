import { AnimationContoller } from "./../animations/DownloadAnimationController";
import { ManipulateDOM } from "./../manipulateDOM";

const BtnsSettingsPanelSwitcher = document.querySelectorAll<HTMLDivElement>(".icons_mode_settings > div");
const IconsSettingsPanelSwitcher = document.querySelectorAll<HTMLDivElement>(".icons_mode_settings > div > i");
const HeadlineCurrentSettings = document.querySelector<HTMLHeadingElement>(".headline_current_settings");
const PanelsSettings = document.querySelectorAll<HTMLDivElement>(".panels_settings > div");

const AttrSettingsPanel: string = "data-current-settings-panel";
const AttrSettingsPanelForOpen: string = "data-current-settings-panel-open";
const animationgController = new AnimationContoller(HeadlineCurrentSettings);

let timeoutSwitchIcons: NodeJS.Timeout;
let manipulateDOM = new ManipulateDOM();
const msAnimationSlideHeadline = 700;

BtnsSettingsPanelSwitcher.forEach((item: HTMLDivElement) => {
	item.addEventListener("click", (e: Event) => {
		clearInterval(timeoutSwitchIcons);

		let elem = e.currentTarget as HTMLDivElement;
		manipulateDOM.toggleElements(BtnsSettingsPanelSwitcher, { state: false });
		let activeElemAttr = elem.getAttribute("data-current-settings-panel");

		for (let currentElem of IconsSettingsPanelSwitcher) {
			currentElem.classList.remove("active");
		}
		document.querySelector(`div[${AttrSettingsPanel}='${activeElemAttr}']`).children.item(0).classList.add("active");

		for (let currentElem of PanelsSettings) {
			currentElem.getAttribute(AttrSettingsPanelForOpen) === activeElemAttr ? currentElem.classList.add("active-panel") : currentElem.classList.remove("active-panel");
		}

		animationgController.StartAnimation("animating");
		HeadlineCurrentSettings.textContent = elem.title;
		timeoutSwitchIcons = setTimeout(() => {
			animationgController.ExitAnimation(["animating"]);
			manipulateDOM.toggleElements(BtnsSettingsPanelSwitcher, { state: true });
		}, msAnimationSlideHeadline);
	});
});
