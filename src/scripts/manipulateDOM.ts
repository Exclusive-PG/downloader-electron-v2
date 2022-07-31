import { toggleElement } from "./types/types";

export class ManipulateDOM {
	public toggleElement(element: HTMLElement, stateElement: toggleElement): void {
		element.style.pointerEvents = stateElement.state ? "auto" : "none";
	}
	public toggleElements(elements: NodeListOf<HTMLElement>, stateElement: toggleElement): void {
		for (let element of elements) {
			element.style.pointerEvents = stateElement.state ? "auto" : "none";
		}
	}
	public toggleClass(element: string, className: string): void {
		document.querySelector<HTMLElement>(`.${element}`).classList.toggle(className);
	}
}
