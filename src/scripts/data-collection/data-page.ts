import { DataCollectionType, HistoryItemType } from "../types/types";
import { dc } from "./DataCollection";

export const renderCircleCards = (outerPlace: HTMLElement) => {
	try{
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
	console.log(arrayCards)
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
}catch(e){
	console.log(e)
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

	// require('electron').shell.openExternal("http://www.google.com")

	outerPlace.innerHTML = "";
	history.forEach((item: HistoryItemType) => {
		outerPlace.innerHTML += `
		<div class="history_item">
			<div class="history_item_title"><a>${item.title}</a></div>
			<div class="history_item_thumbnails"><img src="${item.thumbnails}"/></div>
			<div class="history_item_localPath">${item.localPath}</div>
			<div class="history_item_downloadTime">${item.downloadTime}</div>
			<div class="history_item_size">${item.size}</div>			
		</div>
		`;
	});
};
function openLink(link: string) {
	
	require('electron').shell.openExternal(link)
			
}
renderCircleCards(document.querySelector(".data_card_container"));
renderHistory(document.querySelector(".render_area_history"));