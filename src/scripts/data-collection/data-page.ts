import { DataCollectionType } from "../types/types";
import { dc } from "./DataCollection";

const arrayCards = [
	{ title: "Current directory size", percent: (dc.GetData.data.currentDirectorySize / 10000) * 100, value: dc.GetData.data.currentDirectorySize },
	{ title: "Current files in directory", percent: (dc.GetData.data.currentFilesInDirectory / 100) * 100, value: dc.GetData.data.currentFilesInDirectory },
	{ title: "Downloaded all time size", percent: (dc.GetData.data.downloadedAllTimeSize / 10000) * 100, value: dc.GetData.data.downloadedAllTimeSize },
];

const renderCircleCards = (arrayData: Array<any>, outerPlace: HTMLElement) => {
	outerPlace.innerHTML = "";
	arrayData.forEach((data: any) => {
		outerPlace.innerHTML += `
        <div class="circular_card">
        <div class="circular-progress" style="background:${circleProgressBar(data.percent)}">
            <div class="value-container">${data.percent.toFixed(2)} %</div>
        </div>
        <div class="title_circle_card">${data.title}</div>
    </div>`;
	});
};

renderCircleCards(arrayCards, document.querySelector(".data_card_container"));

function circleProgressBar(progressPercent: number) {
	return `conic-gradient( #4d5bf9 ${progressPercent * 3.6}deg, #cadcff ${progressPercent * 3.6}deg ) `;
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

setTimeout(() => {
	circleProgressBar2(document.querySelectorAll(".circular-progress"), arrayCards);
}, 1000);
