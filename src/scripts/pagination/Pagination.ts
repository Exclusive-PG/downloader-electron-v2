export default class PaginationData {
	private config = {
		startIndex: 0,
		currentPage: 1,
		step: 10,
	};

    public renderPagination = (data: Array<any>, itemPerPage: number, outCurrentPageText: HTMLElement) => {
        let {startIndex,currentPage,step} = this.config
        let currentPoint = startIndex,
            goalPoint = currentPoint + itemPerPage,
            outerArray: any = [];
    
        outCurrentPageText!.textContent = `${currentPage}/${Math.ceil(data.length / itemPerPage)}`;
    
        for (let index = currentPoint; index < goalPoint; index++) {
            if (currentPoint === goalPoint) return;
    
            outerArray.push(data[index]);
            ++currentPoint;
        }
    
        currentPoint = 0;
        console.log(outerArray)
       // if(outCurrentPageText === undefined) return;
        
        return outerArray;
    };

    set startIndex(value : number) {
        this.config.startIndex = value
    }
    set currentPage(value : number) {
        this.config.currentPage = value
    }
    get startIndex() {
       return this.config.startIndex;
    }
    get step() {
        return this.config.step;
     }
}
