import { dc } from "./DataCollection";

const circle = document.querySelector<SVGCircleElement>(".circle-render")
const cardNum = document.querySelector<HTMLDivElement>(".card__number")

function circlePercent(percent:number, currentCircle: SVGCircleElement,cardNumber: HTMLDivElement) {
    let stroke = 565.49 - (565.49 * percent) / 100;
    currentCircle.style.strokeDashoffset = stroke.toString();
	cardNumber.textContent = `${percent.toFixed(2)} %`
};
circlePercent((dc.GetData.data.downloadedAllTimeSize/10000)*100,circle,cardNum)