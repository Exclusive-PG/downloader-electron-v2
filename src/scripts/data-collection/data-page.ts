import { path } from "../requiredLib";
import { HistoryItemType } from "../types/types";
import { dc } from "./DataCollection";
import PaginationData from "./../pagination/Pagination";

const outerPlaceForPagination = document.querySelector<HTMLElement>(".current_and_total_pages_history");
const outerPlaceForHistoryItems = document.querySelector<HTMLElement>(".render_area_history");
const pagination = new PaginationData(5);
pagination.setOutputPageStatus(outerPlaceForPagination, true);

const renderCircleCards = (outerPlace: HTMLElement) => {
	if (Object.keys(dc.GetData.data).length === 0) return;

	const { currentDirectorySize, currentFilesInDirectory, downloadedAllTimeSize } = dc.GetData.data;

	try {
		const arrayCards = [
			{
				title: "Current directory size",
				percent: (currentDirectorySize.current / currentDirectorySize.max) * 100,
				value: currentDirectorySize,
				color: "#f44336",
			},
			{
				title: "Current files in directory",
				percent: (currentFilesInDirectory.current / currentFilesInDirectory.max) * 100,
				value: currentFilesInDirectory,
				color: "#ffa117",
			},
			{
				title: "Downloaded all time size",
				percent: (downloadedAllTimeSize.current / downloadedAllTimeSize.max) * 100,
				value: downloadedAllTimeSize,
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

function circleProgressBar2(collectionCards: NodeListOf<HTMLElement>) {
	if (Object.keys(dc.GetData.data).length === 0) return;

	const { currentDirectorySize, currentFilesInDirectory, downloadedAllTimeSize } = dc.GetData.data;

	const arrayCards = [
		{
			title: "Current directory size",
			percent: (currentDirectorySize.current / currentDirectorySize.max) * 100,
			value: currentDirectorySize,
			color: "#f44336",
		},
		{
			title: "Current files in directory",
			percent: (currentFilesInDirectory.current / currentFilesInDirectory.max) * 100,
			value: currentFilesInDirectory,
			color: "#ffa117",
		},
		{
			title: "Downloaded all time size",
			percent: (downloadedAllTimeSize.current / downloadedAllTimeSize.max) * 100,
			value: downloadedAllTimeSize,
			color: "#0fc70f",
		},
	];

	let start = 0;

	for (let index = 0; index < collectionCards.length; index++) {
		let progress = setInterval(() => {
			if (start >= arrayCards[index].percent) return;

			start++;
			collectionCards[index].style.background = `conic-gradient( ${arrayCards[index].color === undefined ? "#4d5bf9" : arrayCards[index].color} ${start * 3.6}deg, #cadcff ${
				start * 3.6
			}deg ) `;
		}, 50);
	}
}

const renderHistory = (outerPlace: HTMLElement, history = dc.GetData.history) => {
	//let history = dc.GetData.history;

	if (history.length === 0 || pagination.isEnd) return;

	console.log(pagination.isEnd);
	outerPlace.innerHTML = "";
	try {
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
	} catch (e) {
		console.info("Pagination:Not full page");
	}
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
			console.log(item.getAttribute("data-path"));
			let currentPath = path.resolve(item.getAttribute("data-path"));
			require("electron").shell.openPath(currentPath);
		});
	});
};

export const renderDataPage = () => {
	// 	setTimeout(() => {
	// 	circleProgressBar2(document.querySelectorAll(".circular-progress"));
	// }, 1000);
	//renderHistory(document.querySelector(".render_area_history"));
	renderCircleCards(document.querySelector(".data_card_container"));
	renderHistory(outerPlaceForHistoryItems, pagination.renderPagination(dc.GetData.history));
};

document.querySelector(".next-history-page").addEventListener("click", () => {
	pagination.NextPage(dc.GetData.history);
	renderHistory(outerPlaceForHistoryItems, pagination.renderPagination(dc.GetData.history));
});

document.querySelector(".prev-history-page").addEventListener("click", () => {
	pagination.PreviousPage();
	renderHistory(outerPlaceForHistoryItems, pagination.renderPagination(dc.GetData.history));
});


