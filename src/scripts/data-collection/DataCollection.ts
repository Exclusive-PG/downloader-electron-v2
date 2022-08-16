import { fs, path } from "../requiredLib";
import { DataCollectionType } from "../types/types";
import { configSetup } from "./../../config/currentConfig";

export default class DataCollection {
	private _data: DataCollectionType = {
		downloadedAllTimeSize: 0,
		currentDirectorySize: 0,
		currentFilesInDirectory: 0,
		lastUpdateUnix: Date.now().toString(),
	};
	
	private PathToDataCollection: string = path.join("dc", "data", "data.json");

	constructor() {
		if (fs.existsSync(this.PathToDataCollection)) {
			console.log("data log detected");
			this._data = JSON.parse(fs.readFileSync(this.PathToDataCollection, { encoding: "utf-8" }));		
		}
		console.log(this._data)
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
			downloadedAllTimeSize: this.convertSizes(fs.statSync(pathDownloadedFile).size, "MB"),
			currentDirectorySize: this.getTotalSize(pathToSetup, "MB"),
			currentFilesInDirectory: this.getAllFiles(pathToSetup, []).length,
			lastUpdateUnix: Date.now().toString(),
		};

		if (fs.existsSync(this.PathToDataCollection) && path.extname(this.PathToDataCollection) === ".json") {
			console.log("data log detected");
			let _findedData: DataCollectionType = JSON.parse(fs.readFileSync(this.PathToDataCollection, { encoding: "utf-8" }));
			_data.downloadedAllTimeSize = _findedData.downloadedAllTimeSize + this.convertSizes(fs.statSync(pathDownloadedFile).size, "MB");
		}

		console.log(_data);

		return _data;
	}

	public get GetData() {
		return {
			data: this._data,
		};
	}

	public get pathToDC() {
		return this.PathToDataCollection;
	}
}

export const dc = new DataCollection();

//const dataCollection = new DataCollection();

//console.log(dataCollection.getTotalSize(configSetup.configDownloadFiles.config.dirSave, "MB"));
