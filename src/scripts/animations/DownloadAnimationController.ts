export class AnimationContoller {
	protected elementAnimation: HTMLElement;

	constructor(element: HTMLElement) {
		this.elementAnimation = element;
	}

	public StartAnimation(classAnimationStart: string) {
		this.elementAnimation.classList.add(classAnimationStart);
	}
	public EndAnimation(classAnimationEnd: string) {
		this.elementAnimation.classList.add(classAnimationEnd);
	}
	public ExitAnimation(classes: Array<string>) {
		classes.forEach((classAnimation: string) => {
			this.elementAnimation.classList.remove(classAnimation);
		});
	}
}

export class AnimationDownloadingContoller extends AnimationContoller {
	public startHeightProgressBar(element: HTMLElement, progress: number, toFixedSymbols: number = 0) {
		element.style.height = `${progress.toFixed(toFixedSymbols)}%`;
	}
	public refreshHeightProgress(element: HTMLElement) {
		element.style.height = `0%`;
	}
    public outputStatusInPercents(element:HTMLElement,status:number,toFixedSymbols: number = 0){
        element.textContent = `${status.toFixed(toFixedSymbols)} %`;	
    }
}
