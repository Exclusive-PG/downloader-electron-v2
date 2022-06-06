import Swiper from "swiper";
import "swiper/css";

const headerComponents = document.querySelectorAll(".list");
const AttributeTarget = "data_index";
headerComponents.forEach((item: HTMLLIElement, index: number) => {
	item.setAttribute(AttributeTarget, `${index}`);
});


const activeLink = (e: any) => {
	console.log(e.target)
	
if(!e.path[1].hasAttribute(AttributeTarget) && !e.target.hasAttribute(AttributeTarget))
						return

	headerComponents.forEach((item: HTMLLIElement) => {
		item.classList.remove("active");
	});

	e.path[1].hasAttribute(AttributeTarget) ? e.path[1].classList.add("active") : e.target.classList.add("active");
};

headerComponents.forEach((item: HTMLLIElement) => {
	item.addEventListener("click", (e) => activeLink(e));
});


//TABS SETTINGS
const tabControls = [...document.querySelectorAll(".tabs__controls")];
const tabsContent = document.querySelector<HTMLElement>(".tabs__content");
let tabsSwiper;

const initTabControls = (swiper: any) => {
	tabControls.forEach((tab) => {
		tab.addEventListener("click", (event: any) => {
			if (event.path[1].classList.contains("tabs__tab")) {
				swiper.slideTo(event.path[1].dataset.tab);
			}
		});
	});
};

const initTabs = () => {
	tabsSwiper = new Swiper(tabsContent, {
		speed:500,
		autoHeight: true,
		allowTouchMove:false
	});
};

initTabs();
initTabControls(tabsSwiper);
