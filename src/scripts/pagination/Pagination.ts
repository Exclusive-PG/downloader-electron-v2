export default class PaginationData {
	private config = {
		startIndex: 0,
		currentPage: 1,
		step: 10,
	};
	private outputData : {outCurrentPageText:HTMLElement|null , isRender:boolean}  = {
		outCurrentPageText:null,
		isRender : false
	}

	constructor(itemPerPage: number) {
		this.config.step = itemPerPage;
	}
	public isEnd : boolean = false

	public renderPagination = (data: Array<any>, itemPerPage: number = this.config.step, isOutCurrentPageText: boolean = this.outputData.isRender) => {
		let { startIndex, currentPage, step } = this.config;

		let currentPoint = startIndex,
			goalPoint = currentPoint + itemPerPage,
			outerArray: any = [];

		for (let index = currentPoint; index < goalPoint; index++) {
			if (currentPoint === goalPoint) return;

			outerArray.push(data[index]);
			++currentPoint;
		}

		currentPoint = 0;

		isOutCurrentPageText && this.outputPageStatus(`${currentPage}/${Math.ceil(data.length / itemPerPage)}`);

		return outerArray;
	};

	public NextPage(dataLenght: Array<any>) {
		if (this.config.startIndex + this.config.step >= dataLenght.length) {this.isEnd = true;return};
		this.config.startIndex += this.config.step;
		this.config.currentPage++;
		this.isEnd = false;
	}
	public PreviousPage() {
		if (this.config.startIndex <= 0)  {this.isEnd = true;return};
		this.config.startIndex -= this.config.step;
		this.config.currentPage--;
		this.isEnd = false;
	}
	public setOutputPageStatus(el: HTMLElement,isRender?:boolean ) {
		this.outputData.outCurrentPageText = el;
		isRender && (this.outputData.isRender = isRender);
	}
	public outputPageStatus(data: string) {
		this.outputData.outCurrentPageText.textContent = data;
	}
    public refreshDataPage() {
        this.config.startIndex = 0
    }

	get startIndex() {
		return this.config.startIndex;
	}
	get step() {
		return this.config.step;
	}
}
