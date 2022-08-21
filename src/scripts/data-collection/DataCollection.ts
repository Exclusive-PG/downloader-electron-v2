import { fs, path } from "../requiredLib";
import { DataCollectionType, HistoryItemType } from "../types/types";
import { configSetup } from "./../../config/currentConfig";

export default class DataCollection {
	private _data: DataCollectionType = {
		downloadedAllTimeSize: { current: 0, max: 10000 },
		currentDirectorySize: { current: 0, max: 10000 },
		currentFilesInDirectory: { current: 0, max: 100 },
		lastUpdateUnix: Date.now().toString(),
	};

	private _historyDownloadedFiles: Array<HistoryItemType> | any[] = []

	
	private PathToDataCollection: string = path.join("dc", "data", "data.json");
	private PathToHistory:string = path.join("dc","data","history.json");

	constructor() {
		// if (fs.existsSync(this.PathToDataCollection)) {
		// 	console.log("data log detected");
		// 	this._data = JSON.parse(fs.readFileSync(this.PathToDataCollection, { encoding: "utf-8" }));
		// }
		this._data = this.loadData(this.PathToDataCollection)
		this._historyDownloadedFiles = this.loadData(this.PathToHistory)
		console.log(this._data);
	}

	public getAllFiles(dirPath: string, arrayOfFiles: string[]) {
		let files = fs.readdirSync(dirPath);

		arrayOfFiles = arrayOfFiles || [];

		files.forEach((file: string) => {
			if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
				this.getAllFiles(path.join(dirPath, file), arrayOfFiles);
			} else {
				arrayOfFiles.push(path.resolve(path.join(dirPath, file)));
			}
		});

		return arrayOfFiles;
	}

	public getTotalSize = (dirPath: string, currentSize: string) => {
		const arrayOfFiles = this.getAllFiles(dirPath, []);
		let totalSize = 0;

		arrayOfFiles.forEach((filePath: string) => {
			totalSize += fs.statSync(filePath).size;
		});

		return this.convertSizes(totalSize, currentSize);
	};

	public convertSizes(amount: number, currentSize: string) {
		switch (currentSize) {
			case "KB":
				return amount / 1024;
			case "MB":
				return amount / (1024 * 1024);
			case "GB":
				return amount / (1024 * 1024 * 1024);
			default:
				return amount;
		}
	}

	public createJSONData(data: any, pathFile: string = this.PathToDataCollection) {
		fs.mkdirSync(path.dirname(pathFile), { recursive: true }, (err: Error) => {
			if (err) throw err;
		});

		try {
			fs.writeFileSync(path.resolve(pathFile), JSON.stringify(data));
		} catch (e) {
			console.log((e as Error).message);
		}
	}

	public prepareData(pathDownloadedFile: string, pathToSetup: string) {
		console.log("preparing data");

		
		let _data: DataCollectionType = {
			downloadedAllTimeSize: { current: this.convertSizes(fs.statSync(pathDownloadedFile).size, "MB"), max: 10000 },
			currentDirectorySize: { current: this.getTotalSize(pathToSetup, "MB"), max: 10000 },
			currentFilesInDirectory: { current: this.getAllFiles(pathToSetup, []).length, max: 100 },
			lastUpdateUnix: Date.now().toString(),
		};

		if (fs.existsSync(this.PathToDataCollection) && path.extname(this.PathToDataCollection) === ".json") {
			console.log("data log detected");
			let _findedData: DataCollectionType = JSON.parse(fs.readFileSync(this.PathToDataCollection, { encoding: "utf-8" }));
			_data.downloadedAllTimeSize.current = _findedData.downloadedAllTimeSize.current + this.convertSizes(fs.statSync(pathDownloadedFile).size, "MB");
			_data.currentDirectorySize.max = this.checkMaxSize(_data.currentDirectorySize.current, _findedData.currentDirectorySize.max);
			_data.currentFilesInDirectory.max = this.checkMaxSize(_data.currentFilesInDirectory.current, _findedData.currentFilesInDirectory.max);
			_data.downloadedAllTimeSize.max = this.checkMaxSize(_data.downloadedAllTimeSize.current, _findedData.downloadedAllTimeSize.max);
		}

		console.log(_data);

		return _data;
	}

	private checkMaxSize(size: number, maxSize: number) {
		return size >= maxSize ? maxSize*2 : maxSize; 
	}
	public refreshData(){	
		if (fs.existsSync(this.PathToDataCollection) && path.extname(this.PathToDataCollection) === ".json") {
			this._data = JSON.parse(fs.readFileSync(this.PathToDataCollection, { encoding: "utf-8" }));
		}
	}
	public addHistoryData(historyItem: HistoryItemType) {
		this._historyDownloadedFiles = this.loadData(this.PathToHistory);
		this._historyDownloadedFiles.push(historyItem);
		return this._historyDownloadedFiles;
	}
	public loadData(pathToFile:string,ext:string= ".json"){	
		let _loadData = [];
		if (fs.existsSync(pathToFile) && path.extname(pathToFile) === ext) {
			_loadData = JSON.parse(fs.readFileSync(this.PathToHistory, { encoding: "utf-8" }));
		}
		return _loadData;
	}
	public get GetData() {
		this.refreshData();
		return {
			data: this._data,
		};
	}

	public get pathToDC() {
		return this.PathToDataCollection;
	}
	public get pathToHistory() {
		return this.PathToHistory;
	}
	public get getHistory(){
		return this._historyDownloadedFiles;
	}
}

export const dc = new DataCollection();

//const dataCollection = new DataCollection();

//console.log(dataCollection.getTotalSize(configSetup.configDownloadFiles.config.dirSave, "MB"));
