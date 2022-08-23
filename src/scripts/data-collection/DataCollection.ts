import { fs, path } from "../requiredLib";
import { DataCollectionType, HistoryItemType } from "../types/types";
import { configSetup } from "./../../config/currentConfig";
import FileManipulation from "./FileManipulation";

export default class DataCollection extends FileManipulation {
	private _data: DataCollectionType = {
		downloadedAllTimeSize: { current: 0, max: 10000 },
		currentDirectorySize: { current: 0, max: 10000 },
		currentFilesInDirectory: { current: 0, max: 100 },
		lastUpdateUnix: Date.now().toString(),
	};

	private _historyDownloadedFiles: Array<HistoryItemType> | any[] = [];

	private _paths = {
		pathToDataCollection: path.join("dc", "data", "data.json"),
		pathToHistory: path.join("dc", "data", "history.json"),
	};

	constructor() {
		super();
		try {
			this._data = this.loadData(this._paths.pathToDataCollection) || {};
			this._historyDownloadedFiles = this.loadData(this._paths.pathToHistory) || [];
			console.log(this._data);
			console.log(this._historyDownloadedFiles);
		} catch (e) {
			console.log((e as Error).message);
		}
	}

	public prepareData(pathDownloadedFile: string, pathToSetup: string) {
		console.log("preparing data");
		const { pathToDataCollection } = this._paths;

		let _data: DataCollectionType = {
			downloadedAllTimeSize: { current: this.convertSizes(fs.statSync(pathDownloadedFile).size, "MB"), max: 10000 },
			currentDirectorySize: { current: this.getTotalSize(pathToSetup, "MB"), max: 10000 },
			currentFilesInDirectory: { current: this.getAllFiles(pathToSetup, []).length, max: 100 },
			lastUpdateUnix: Date.now().toString(),
		};

		if (fs.existsSync(pathToDataCollection) && path.extname(pathToDataCollection) === ".json") {
			console.log("data log detected");
			let _findedData: DataCollectionType = JSON.parse(fs.readFileSync(pathToDataCollection, { encoding: "utf-8" }));
			_data.downloadedAllTimeSize.current = _findedData.downloadedAllTimeSize.current + this.convertSizes(fs.statSync(pathDownloadedFile).size, "MB");
			_data.currentDirectorySize.max = this.checkMaxSize(_data.currentDirectorySize.current, _findedData.currentDirectorySize.max);
			_data.currentFilesInDirectory.max = this.checkMaxSize(_data.currentFilesInDirectory.current, _findedData.currentFilesInDirectory.max);
			_data.downloadedAllTimeSize.max = this.checkMaxSize(_data.downloadedAllTimeSize.current, _findedData.downloadedAllTimeSize.max);
		}

		console.log(_data);

		return _data;
	}

	private checkMaxSize(size: number, maxSize: number) {
		return size >= maxSize ? maxSize * 2 : maxSize;
	}
	public refreshData() {
		const { pathToDataCollection } = this._paths;
		if (fs.existsSync(pathToDataCollection) && path.extname(pathToDataCollection) === ".json") {
			this._data = JSON.parse(fs.readFileSync(pathToDataCollection, { encoding: "utf-8" }));
		}
	}
	public addHistoryData(historyItem: HistoryItemType) {
		//	this._historyDownloadedFiles = this.loadData(this._paths.pathToHistory);
		this._historyDownloadedFiles.push(historyItem);
		return this._historyDownloadedFiles;
	}
	public loadData(pathToFile: string, ext: string = ".json") {
		let _loadData;
		if (fs.existsSync(pathToFile) && path.extname(pathToFile) === ext) {
			_loadData = JSON.parse(fs.readFileSync(this._paths.pathToHistory, { encoding: "utf-8" }));
		}

		return _loadData;
	}
	public get GetData() {
		this.refreshData();
		return {
			data: this._data,
			history: this._historyDownloadedFiles,
		};
	}

	public get Paths() {
		return {
			data: this._paths.pathToDataCollection,
			history: this._paths.pathToHistory,
		};
	}
}

export const dc = new DataCollection();

// if (fs.existsSync(this.PathToDataCollection)) {
// 	console.log("data log detected");
// 	this._data = JSON.parse(fs.readFileSync(this.PathToDataCollection, { encoding: "utf-8" }));
// }
