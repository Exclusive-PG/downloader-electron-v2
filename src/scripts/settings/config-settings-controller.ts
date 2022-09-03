import { configSetup } from "./../../config/currentConfig";
import { ManipulateDOM } from "./../manipulateDOM";

const collectionInputsConfig = document.querySelectorAll<HTMLInputElement>(".input-config");
const collectionStatusInput = document.querySelectorAll<HTMLSpanElement>(".status-input-lock");
const ConfigPanel = document.querySelector<HTMLDivElement>(".content_block_settings");
const cancelBtn = document.querySelector<HTMLDivElement>(".cancel-config-btn");
const openSettingsBtn = document.querySelector<HTMLDivElement>(".settings_wrapper");
const confirmConfigBtn = document.querySelector<HTMLDivElement>(".confirm-config-btn");
const cancelVideoSettingsBtn = document.querySelector<HTMLDivElement>(".cancel-video-settings-config-btn");
const manipulateDOM = new ManipulateDOM();

const keys = Object.keys(configSetup.configDownloadFiles.config);
const values = Object.values(configSetup.configDownloadFiles.config);

const fillInput = () => {
	collectionInputsConfig.forEach((item: HTMLInputElement, indexInput: number) => {
		for (let i = 0; i < keys.length; i++) {
			if (item.getAttribute("data-input-config") === keys[i]) {
				item.value = values[i];
			}
		}
	});
};

const toggleSettingsPanel = () => {
	manipulateDOM.toggleClass("settings_panel", "hide");
};

const addEventForChangeInputs = () => {
	collectionInputsConfig.forEach((item: HTMLInputElement) => {
		item.addEventListener("input", (e: Event) => {
			let currentAttr = item.getAttribute("data-input-config");

			let copyConfig: any = configSetup.configDownloadFiles.config;

			copyConfig[currentAttr] === item.value ? item.setAttribute("data-change", "false") : item.setAttribute("data-change", "true");

			confirmConfigBtn.innerHTML = "<p>OK</p>";
			for (const iterator of collectionInputsConfig) {
				if (iterator.getAttribute("data-change") === "true") {
					confirmConfigBtn.innerHTML = "<p>Apply</p>";
				}
			}
		});
	});
};

const toggleIconLock = (sizeIconLock: number) => {
	const COLOR_ICON_LOCK_CLOSE = `#f34336`;
	const COLOR_ICON_LOCK_OPEN = `#2ECC71`;

	for (let index = 0; index < collectionInputsConfig.length; index++) {
		if (collectionInputsConfig[index].disabled) {
			collectionStatusInput[index].innerHTML = `<i style="color:${COLOR_ICON_LOCK_CLOSE}" class="fa-solid fa-lock fa-${sizeIconLock}x"></i>`;
		} else {
			collectionStatusInput[index].innerHTML = `<i style="color:${COLOR_ICON_LOCK_OPEN}" class="fa-solid fa-lock-open fa-${sizeIconLock}x"></i>`;
		}
	}
};

const validateAllInput = (inputCollection: NodeListOf<HTMLInputElement>) => {
	let outputValidateInput: Array<boolean> = [];

	inputCollection.forEach((item: HTMLInputElement) => {
		if (item.getAttribute("data-validate") === "validate") {
			outputValidateInput.push(configSetup.validateFileName(item.value));
		}
	});

	return outputValidateInput;
};

const showAlertIcon = (valideInputs: Array<boolean>, IconsCollection: NodeListOf<HTMLSpanElement>) => {
	for (let index = 0; index < valideInputs.length; index++) {
		if (valideInputs[index]) {
			IconsCollection[index].classList.add("hide");
		} else {
			IconsCollection[index].classList.remove("hide");
		}
	}
};

const confirmSetConfig = () => {
	collectionInputsConfig.forEach((item: HTMLInputElement) => {
		let currentAttr = item.getAttribute("data-input-config");

		let copyConfig: any = configSetup.configDownloadFiles.config;

		copyConfig[currentAttr] === item.value ? item.setAttribute("data-change", "false") : item.setAttribute("data-change", "true");

		confirmConfigBtn.innerHTML = "<p>OK</p>";
		for (const iterator of collectionInputsConfig) {
			if (iterator.getAttribute("data-change") === "true") {
				confirmConfigBtn.innerHTML = "<p>Apply</p>";
			}
		}
		console.log("ALL");
		console.log(configSetup.allConfig);
	});
};
fillInput();
toggleIconLock(2);
addEventForChangeInputs();

export const ToggleSettingsPanelController = () => {
	cancelBtn.addEventListener("click", toggleSettingsPanel);
	openSettingsBtn.addEventListener("click", toggleSettingsPanel);
	cancelVideoSettingsBtn.addEventListener("click", toggleSettingsPanel);
};

confirmConfigBtn.addEventListener("click", () => {
	let tempConfig: any = {};
	let validateInputsArray = validateAllInput(collectionInputsConfig);
	showAlertIcon(validateInputsArray, document.querySelectorAll(".error-input-current_config"));

	if (validateInputsArray.includes(false)) return;

	collectionInputsConfig.forEach((item: HTMLInputElement) => {
		tempConfig[item.getAttribute("data-input-config")] = item.value;
	});

	configSetup.setdownloadsConfig(tempConfig);
	confirmSetConfig();
	console.log("main config");
	console.log(configSetup.configDownloadFiles.config);
});
