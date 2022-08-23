import { path } from "../requiredLib";
import { DataCollectionType, HistoryItemType } from "../types/types";
import { dc } from "./DataCollection";

 const renderCircleCards = (outerPlace: HTMLElement) => {
	try {
		const arrayCards = [
			{
				title: "Current directory size",
				percent: (dc.GetData.data.currentDirectorySize.current / dc.GetData.data.currentDirectorySize.max) * 100,
				value: dc.GetData.data.currentDirectorySize,
				color: "#f44336",
			},
			{
				title: "Current files in directory",
				percent: (dc.GetData.data.currentFilesInDirectory.current / dc.GetData.data.currentFilesInDirectory.max) * 100,
				value: dc.GetData.data.currentFilesInDirectory,
				color: "#ffa117",
			},
			{
				title: "Downloaded all time size",
				percent: (dc.GetData.data.downloadedAllTimeSize.current / dc.GetData.data.downloadedAllTimeSize.max) * 100,
				value: dc.GetData.data.downloadedAllTimeSize,
				color: "#0fc70f",
			},
		];
		console.log(arrayCards);
		outerPlace.innerHTML = "";
		arrayCards.forEach((data: any) => {
			outerPlace.innerHTML += `
        <div class="circular_card">
        <div class="circular-progress" style="background:${circleProgressBar(data.percent, data.color)}">
            <div class="value-container">${data.percent.toFixed(2)} %</div>
        </div>
        <div class="title_circle_card">${data.title}</div>
    </div>`;
		});
	} catch (e) {
		console.log(e);
	}
};

function circleProgressBar(progressPercent: number, color?: string) {
	let _value = Math.ceil(progressPercent * 3.6);
	return `conic-gradient( ${color === undefined ? "#4d5bf9" : color} ${_value}deg, #cadcff ${_value}deg ) `;
}

function circleProgressBar2(collectionCards: NodeListOf<HTMLElement>, data: Array<any>) {
	let start = 0;

	for (let index = 0; index < collectionCards.length; index++) {
		let progress = setInterval(() => {
			if (start >= data[index].percent) return;

			start++;
			collectionCards[index].style.background = `conic-gradient(
      #4d5bf9 ${start * 3.6}deg,
      #cadcff ${start * 3.6}deg
  )`;
		}, 50);
	}
}

// setTimeout(() => {
// 	//circleProgressBar2(document.querySelectorAll(".circular-progress"), arrayCards);
// }, 1000);

const renderHistory = (outerPlace: HTMLElement) => {
	let history = dc.getHistory;

	outerPlace.innerHTML = "";
	history.forEach((item: HistoryItemType) => {
		outerPlace.innerHTML += `
		<div class="history_item">
			<div class="history_item_thumbnails"><img src="${item.thumbnails}"/></div>
			<div class="history_txt_data">
				<div class="history_item_title"><a class="history_link_title" href="${item.video_url}">${item.title} <i class="fa-solid fa-arrow-up-right-from-square"></i></a></div>
				<div class="history_item_localPath" data-path="${item.localPath}">Open path <i class="fa-solid fa-folder-open"></i></div>
				<div class="history_item_downloadTime">${item.downloadTime}</div>
				<div class="history_item_size">${Math.round(item.size)} MB </div>	
				<div class="history_item_play" data-path="${item.localPath}"><i class="fa-solid fa-play fa-2x play-btn"></i></div>
			</div>		
		</div>
		`;
	});

	const links = document.querySelectorAll(".history_link_title");
	const localPaths = document.querySelectorAll(".history_item_localPath");
	const playBtns = document.querySelectorAll(".history_item_play");

	links.forEach((item: HTMLLinkElement) => {
		item.addEventListener("click", (e) => {
			e.preventDefault();
			require("electron").shell.openExternal(item.href);
		});
	});

	localPaths.forEach((item: HTMLDivElement) => {
		item.addEventListener("click", () => {
			let currentPath = path.resolve(item.getAttribute("data-path"));
			require("electron").shell.showItemInFolder(currentPath);
		});
	});

	playBtns.forEach((item: HTMLDivElement) => {
		item.addEventListener("click", () => {
			let currentPath = path.resolve(item.getAttribute("data-path"));
			require("electron").shell.openPath(currentPath);
		});
	});
};
  
renderCircleCards(document.querySelector(".data_card_container"));
renderHistory(document.querySelector(".render_area_history"));


export const refreshDataPage = () =>{
	renderCircleCards(document.querySelector(".data_card_container"));
	renderHistory(document.querySelector(".render_area_history"));
}