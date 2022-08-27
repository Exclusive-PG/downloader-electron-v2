import { fs, path } from "../requiredLib";


export default class FileManipulation {
    public getAllFiles(dirPath: string, arrayOfFiles?: string[]) {
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
    
	public createJSONData(data: any, pathFile: string ) {
		fs.mkdirSync(path.dirname(pathFile), { recursive: true }, (err: Error) => {
			if (err) throw err;
		});

		try {
			fs.writeFileSync(path.resolve(pathFile), JSON.stringify(data));
		} catch (e) {
			console.log((e as Error).message);
		}
	}

}