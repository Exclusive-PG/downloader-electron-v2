import { fs, path } from "../requiredLib";
import { DataCollectionType } from "../types/types";
import { configSetup } from "./../../config/currentConfig";

export default class DataCollection {

    private _data : DataCollectionType = {
        downloadedAllTimeSize:0,
        currentDirectorySize:0,
        currentFilesInDirectory:0,
        lastUpdate : Date.now().toString()
    }

	public getAllFiles(dirPath: string, arrayOfFiles: string[]) {
		let files = fs.readdirSync(dirPath);

		arrayOfFiles = arrayOfFiles || [];

		files.forEach((file: string) => {
			if (fs.statSync(dirPath + "/" + file).isDirectory()) {
				this.getAllFiles(dirPath + "/" + file, arrayOfFiles);
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

		switch (currentSize) {
			case "KB":
				return totalSize / 1024;
			case "MB":
				return totalSize / (1024 * 1024);
			case "GB":
				return totalSize / (1024 * 1024 * 1024);
			default:
				return totalSize;
		}
	};

	public createJSONData(pathFile: string, data: any) {
		fs.mkdirSync(path.dirname(pathFile), { recursive: true }, (err: Error) => {
			if (err) throw err;
		});

		try {
			fs.writeFileSync(path.resolve(pathFile), JSON.stringify(data));
		} catch (e) {
			console.log((e as Error).message);
		}
	}

    public get GetData (){
        return{
            data:this._data
        }
    }
}

const dataCollection = new DataCollection();

console.log(dataCollection.getTotalSize(configSetup.configDownloadFiles.config.dirSave, "MB"));

dataCollection.createJSONData(path.join("dataCollection","data", "data.json"), dataCollection.GetData.data);
