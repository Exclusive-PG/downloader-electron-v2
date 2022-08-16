import { configSetup } from "./../../config/currentConfig";

const dropDowns = document.querySelectorAll(".dropdown");
const SectionForVideoQuality = document.querySelector<HTMLUListElement>(".menu-quality-section");
const SectionForVideoFilter = document.querySelector<HTMLUListElement>(".menu-filter-section");
const SelectTitleFilterVideo = document.querySelector<HTMLSpanElement>(".dropdown-filter-video-settings > .select > .select-title");
const SelectTitleQualityVideo = document.querySelector<HTMLSpanElement>(".dropdown-quality-video-settings > .select > .select-title");
const confirmAllSettingsBtn = document.querySelector<HTMLDivElement>(".confirm-video-settings-btn");

const { quality, filter, filterAttr, qualityAttr } = configSetup.videoPresetsSettings.presets;

const renderAllDropdownSections = () => {
	console.log(SectionForVideoQuality);

	(SectionForVideoQuality.innerHTML = ``), (SectionForVideoFilter.innerHTML = ``);

	quality.forEach((item) => {
		if (item.selectFirst) {
			SelectTitleQualityVideo.innerHTML = item.key;
			SelectTitleQualityVideo.setAttribute(qualityAttr, item.value);
		}

		SectionForVideoQuality.innerHTML += `
            <li ${qualityAttr}="${item.value}">${item.key}</li>
            `;
	});
	filter.forEach((item) => {
		if (item.selectFirst) {
			SelectTitleFilterVideo.innerHTML = item.key;
			SelectTitleFilterVideo.setAttribute(filterAttr, item.value);
		}
		SectionForVideoFilter.innerHTML += `
            <li ${filterAttr}="${item.value}">${item.key}</li>
            `;
	});
};

const confirmVideoSettings = () => {
	const videoSet: any = {
		quality: "",
		filter: "",
	};
	const menuItems = document.querySelectorAll(".dropdown > .select > .select-title");
	menuItems.forEach((item: HTMLLIElement) => {

		item.hasAttribute(qualityAttr) && (videoSet.quality = item.getAttribute(qualityAttr));
		item.hasAttribute(filterAttr) && (videoSet.filter = item.getAttribute(filterAttr));
	});
	console.log("TEMP CONFIG")
	console.log(videoSet);
	configSetup.setVideoConfig({ filter: videoSet.filter, quality: videoSet.quality });
	console.log("MAIN CONFIG")
	console.log(configSetup.allConfig)
};

renderAllDropdownSections();

//loop through all dropdown element
dropDowns.forEach((dropDown) => {
	//get inner elements from each dropdown
	const select = dropDown.querySelector(".select");
	const arrow = dropDown.querySelector(".arrow-dropdown");
	const menu = dropDown.querySelector(".menu-dropdown");
	const menuItems = dropDown.querySelectorAll(".menu-dropdown > li");
	const selectTitle = dropDown.querySelector<HTMLSpanElement>(".select-title");

	//add a click event to the select element
	select.addEventListener("click", () => {
		select.classList.toggle("select-clicked");
		arrow.classList.toggle("arrow-rotate");
		menu.classList.toggle("menu-open");
	});

	// loop throught all item element
	menuItems.forEach((item: HTMLLIElement) => {
		item.addEventListener("click", () => {
			selectTitle.textContent = item.textContent;
			item.hasAttribute(qualityAttr) ? selectTitle.setAttribute(qualityAttr, item.getAttribute(qualityAttr)) : selectTitle.setAttribute(filterAttr, item.getAttribute(filterAttr));

			select.classList.remove("select-clicked");
			arrow.classList.remove("arrow-rotate-dropdown");
			menu.classList.remove("menu-open");

			menuItems.forEach((item) => {
				item.classList.remove("active-dropdown");
			});

			item.classList.add("active-dropdown");
		});
	});
});

confirmAllSettingsBtn.addEventListener("click", confirmVideoSettings);

