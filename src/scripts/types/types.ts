export type validateYotubeLinkType = {
	state: boolean;
	msg: string;
};

export type toggleElement = {
	state: boolean;
};
export type repeatMode = {
	repeatOne?: boolean;
	repeatAll?: boolean;
	repeatOff?: boolean;
};

export type downloadsConfig = {
	dirSave: string;
	format: string;
	playlist: string;
};
export type videoConfig = {
	//preset:string
	quality: "highest" | "lowest" | "highestaudio" | "lowestaudio" | "highestvideo" | "lowestvideo" | "";
	filter: "audioandvideo" | "videoandaudio " | "videoonly" | "audioonly" | "";
};
export type ConfigType = {
	downloadsConfig: downloadsConfig;
	videoConfig: videoConfig;
};

export type dataCollectionItem = {
	current: number;
	max: number;
};
export type DataCollectionType = {
	downloadedAllTimeSize: dataCollectionItem;
	currentDirectorySize: dataCollectionItem;
	currentFilesInDirectory: dataCollectionItem;
	lastUpdateUnix: Date | string;
};

export type HistoryItemType = {
	category: string;
	title: string;
	video_url: string;
	thumbnails: string;
	localPath: string;
	downloadTime: Date | string;
	size: number;
};

export type PlaylistItem = {
	playlist: string;
	name: string;
	extension: string;
	path: string;
	index?:number
};
// export type HistoryDownloadedFilesType = {
//   history:Array<HistoryDownloadedFilesItemType>
// }
