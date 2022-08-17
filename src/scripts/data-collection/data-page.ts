import { DataCollectionType } from "../types/types";
import { dc } from "./DataCollection";

const circle = document.querySelector<SVGCircleElement>(".circle-render");
const cardNum = document.querySelector<HTMLDivElement>(".card__number");

function circlePercent(percent: number, currentCircle?: SVGCircleElement, cardNumber?: HTMLDivElement) {
	//let stroke
	// currentCircle.style.strokeDashoffset = stroke.toString();
	//cardNumber.textContent = `${percent.toFixed(2)} %`
	return 565.49 - (565.49 * percent) / 100;
}
//circlePercent((dc.GetData.data.downloadedAllTimeSize/10000)*100,circle,cardNum)

const MAX_VALUE = 1000;

const arrayCards = [
	{ title: "Current directory size", percent: 10000 / 10000 * 100 ,value : dc.GetData.data.currentDirectorySize  },
	{ title: "Current files in directory", percent: dc.GetData.data.currentFilesInDirectory / 100 * 100 , value : dc.GetData.data.currentFilesInDirectory },
	{ title: "Downloaded all time size", percent: dc.GetData.data.downloadedAllTimeSize / 10000 * 100 ,value :  dc.GetData.data.downloadedAllTimeSize },
];

const renderCircleCards = (arrayData: Array<any>, outerPlace: HTMLElement) => {
	outerPlace.innerHTML = "";

	arrayData.forEach((data: any) => {
		outerPlace.innerHTML += `
        <div class="card">
        <div class="card__percent">
            <svg>
                <defs>
                    <radialGradient id="gradient" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
                        <stop offset="30%" stop-color="var(--primary-dark)" />
                        <stop offset="100%" stop-color="var(--primary-light)" />
                    </radialGradient>
                </defs>
                <circle cx="90" cy="90" r="90" stroke="url(#gradient)" class="circle-render" style="stroke-dashoffset:${circlePercent(data.percent)}";></circle>
            </svg>
            <div class="circle"></div>
            <div class="circle circle__medium"></div>
            <div class="circle circle__small"></div>
            <div class="card__number">${parseInt(data.percent).toFixed(2).toString()} %</div>
        </div>
        <div class="card__description">
            <h2>${data.title}\n (${data.value.toFixed(0)})</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta cumque vitae iure voluptatem alias sed facilis quidem.</p>
        </div>
    </div>`;
	});
};

renderCircleCards(arrayCards, document.querySelector(".container-cards"));