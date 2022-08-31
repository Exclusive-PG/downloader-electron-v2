export default class PaginationData {
	private config = {
		startIndex: 0,
		currentPage: 1,
		step: 10,
	};
	private outCurrentPageText: HTMLElement;

	constructor(itemPerPage: number) {
		this.config.step = itemPerPage;
	}

	public renderPagination = (data: Array<any>, itemPerPage: number = this.config.step, isOutCurrentPageText: boolean = false) => {
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
		if (this.config.startIndex + this.config.step >= dataLenght.length) return;

		this.config.startIndex += this.config.step;
		this.config.currentPage++;
	}
	public PreviousPage() {
		if (this.config.startIndex <= 0) return;
		this.config.startIndex -= this.config.step;
		this.config.currentPage--;
	}
	public setOutputPageStatus(el: HTMLElement) {
		this.outCurrentPageText = el;
	}
	public outputPageStatus(data: string) {
		this.outCurrentPageText.textContent = data;
	}
    public refreshDataPage() {
        this.config.startIndex = 0
    }


	set startIndex(value: number) {
		this.config.startIndex = value;
	}
	set currentPage(value: number) {
		this.config.currentPage = value;
	}
	get startIndex() {
		return this.config.startIndex;
	}
	get step() {
		return this.config.step;
	}
}
