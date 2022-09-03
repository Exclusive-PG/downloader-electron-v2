import Swiper, { Navigation, Pagination } from "swiper";
import { dc } from "../data-collection/DataCollection";
import { path } from "../requiredLib";
import { PlaylistItem } from "../types/types";
import { enabledPictureInPictureMode, setCurrentVideoInList, setListSrcVideosForVideoPlayer, togglePictureInPictureMode } from "../videoplayer/videoPlayerController";
import { configSetup } from "./../../config/currentConfig";
import { videoPlayer } from "./../videoplayer/videoPlayerController";
import { fs } from "./../requiredLib";
import PaginationData from "./../pagination/Pagination";

const playlistControllerBtn = document.querySelector(".playlist_controller_btn");
const playlistZone = document.querySelector(".playlistZone");
const playListsRender = document.querySelector<HTMLElement>(".playlists_render");
const videoElement = document.querySelector<HTMLVideoElement>("[data-video]");
const contentCurrentPlaylistRender = document.querySelector<HTMLElement>(".content_current_playlist_render");
const playlistPlayingName = document.querySelector<HTMLElement>(".playing-playlist-name");
const paginationData = new PaginationData(10);
paginationData.setOutputPageStatus(document.querySelector(".current_and_total_pages_playlist"), true);
let currentIdPlaylist: string = "";

const createListOfPlaylists = () => {
	let arrayPlaylist: PlaylistItem[] = [];
	let pathDirectory = configSetup.configDownloadFiles.config.dirSave;

	if (!fs.existsSync(pathDirectory)) return;

	dc.getAllFiles(pathDirectory).forEach((item, index) => {
		if (path.extname(item) !== ".mp4") return;

		let obj: PlaylistItem = {
			playlist: path.dirname(item).split(path.sep).pop(),
			name: path.basename(path.parse(item).name),
			extension: path.basename(path.parse(item).ext),
			path: item,
			index,
		};
		arrayPlaylist.push(obj);
	});

	return arrayPlaylist;
};

let arrayPlaylist = createListOfPlaylists();

// create array of objects (namePlaylist,countVideos)
const sortPlaylists = (inputArrayPlaylist: Array<PlaylistItem>) => {
	let tempResult: any = {};
	console.log(inputArrayPlaylist);

	if (!inputArrayPlaylist) return;

	for (let { playlist } of inputArrayPlaylist) {
		tempResult[playlist] = {
			playlist,
			count: tempResult[playlist] ? tempResult[playlist].count + 1 : 1,
		};
	}
	let result = Object.values(tempResult);
	console.log(result);
	return result;
};

//filter data for playlist name
const filterContent = (filterPlaylist: string, mainArray: Array<PlaylistItem>) => {
	return mainArray
		.filter((item) => item.playlist === filterPlaylist)
		.map((item, index) => {
			item.index = index;
			return item;
		});
};

// render list of video items - slide 2
const renderAvailableContent = (arrayCurrentPlaylist: Array<PlaylistItem>, outResult: HTMLElement) => {
	outResult.innerHTML = "";
	//- ${extension}
	try {
		arrayCurrentPlaylist?.forEach(({ playlist, name, extension, path, index }: PlaylistItem) => {
			outResult.innerHTML += `
		<div class="content_item" current-index=${index} full-path="${path}">
		<div class="data">${index + 1}. ${name} </div>
		<div class="ext_content_item">${extension.slice(1)}</div>
		<div class="play_current_content"  ><i class="fa-solid fa-play fa-2x"></i></div>
		</div>
		`;
		});
	} catch {
		console.log("not full page");
	}
	const playBtns = document.querySelectorAll(".content_item");
	playBtns.forEach((item: HTMLElement) => {
		item.addEventListener("click", () => {
			let _itemCurentIndex = parseInt(item.getAttribute("current-index"));

			videoPlayer.currentPlayingIndexInList === _itemCurentIndex && videoPlayer.isPlaying.state ? videoPlayer.pause() : videoPlayer.play();

			videoPlayer.currentPlayingIndexInList !== _itemCurentIndex && setCurrentVideoInList(_itemCurentIndex);

			showCurrentPlayingVideo();
		});
	});
	videoElement.addEventListener("loadedmetadata", enabledPictureInPictureMode);
};

// render list of playlists - slide 1
const renderAvailablePlaylists = (outResult: HTMLElement) => {
	if (!arrayPlaylist) return;

	outResult.innerHTML = "";
	sortPlaylists(arrayPlaylist).forEach(({ playlist, count }: any) => {
		outResult.innerHTML += `
        <div class="playlist_item" id_playlist="${playlist}">
            <span class="wrapper_playlist_item">
                <div class="icon_playlist"><i class="fa-solid fa-folder fa-5x"></i></div>
                <div class="data_playlist_item">${playlist.toUpperCase()}</div>
				<div class="count_content">${count}</div>
            </span>
        </div>
        `;
	});
	document.querySelectorAll(".playlist_item").forEach((item: HTMLElement) => {
		let timeout: NodeJS.Timeout;
		clearTimeout(timeout);
		item.addEventListener("mouseenter", () => {
			item.children[0].children[0].innerHTML = `<i class="fa-regular fa-folder-open fa-5x"></i>`;
		});
		item.addEventListener("mouseleave", () => {
			timeout = setTimeout(() => {
				item.children[0].children[0].innerHTML = `<i class="fa-solid fa-folder fa-5x"></i>`;
			}, 250);
		});
		item.addEventListener("click", () => {
			console.log(filterContent(item.getAttribute("id_playlist"), arrayPlaylist));
			currentIdPlaylist = item.getAttribute("id_playlist");
			let _filteredContent = filterContent(item.getAttribute("id_playlist"), arrayPlaylist);
			setListSrcVideosForVideoPlayer(_filteredContent);
			paginationData.refreshDataPage();
			renderAvailableContent(paginationData.renderPagination(filterContent(currentIdPlaylist, arrayPlaylist)), contentCurrentPlaylistRender);
			swiper.slideTo(1);
			showCurrentPlayingVideo();
			playlistPlayingName.children[0].textContent = currentIdPlaylist.toUpperCase();
		});
	});
};

///connect Swiper
Swiper.use([Navigation, Pagination]);

// config Swiper
const swiper = new Swiper(".swiper_playlist_or_content", {
	spaceBetween: 20,
	pagination: {
		el: ".swiper-pagination",
		clickable: true,
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	//allowTouchMove:false
});

// show playing video item in the list
const showCurrentPlayingVideo = () => {
	let contentItems = document.querySelectorAll(".content_item");

	//console.log(contentItems)
	contentItems.forEach((item: HTMLElement) => {
		if (!item.hasAttribute("current-index")) return;

		if (parseInt(item.getAttribute("current-index")) === videoPlayer.currentPlayingIndexInList) {
			item.classList.add("playing-track");
			item.children[2].innerHTML = videoPlayer.isPlaying.state ? `<i class="fa-solid fa-pause fa-2x"></i>` : `<i class="fa-solid fa-play fa-2x"></i>`;
		} else {
			item.classList.remove("playing-track");
			item.children[2].innerHTML = `<i class="fa-solid fa-play fa-2x"></i>`;
		}
	});
	//current-index=${index}
};

export const renderPlaylistsZone = (allUpdate?:boolean) => {
	arrayPlaylist = createListOfPlaylists();
	renderAvailablePlaylists(playListsRender);
	if(allUpdate){
	let _filteredContent = filterContent(currentIdPlaylist, arrayPlaylist);
	setListSrcVideosForVideoPlayer(_filteredContent);
	renderAvailableContent(paginationData.renderPagination(_filteredContent), contentCurrentPlaylistRender);
	showCurrentPlayingVideo();
	}
};

///EVENTS
//Off/on playlist panel
playlistControllerBtn.addEventListener("click", () => {
	playlistZone.classList.toggle("active");
});

//refresh playling video
videoElement.addEventListener("ended", () => {
	showCurrentPlayingVideo();
});

//renderAvailablePlaylists(playListsRender);

//controls pagination
document.querySelector(".next-playlist-page").addEventListener("click", () => {
	let _filteredContent = filterContent(currentIdPlaylist, arrayPlaylist);
	paginationData.NextPage(_filteredContent);
	renderAvailableContent(paginationData.renderPagination(_filteredContent), contentCurrentPlaylistRender);
	showCurrentPlayingVideo();
});

document.querySelector(".prev-playlist-page").addEventListener("click", () => {
	paginationData.PreviousPage();
	renderAvailableContent(paginationData.renderPagination(filterContent(currentIdPlaylist, arrayPlaylist)), contentCurrentPlaylistRender);
	showCurrentPlayingVideo();
});

try{
	fs.watch(configSetup.configDownloadFiles.config.dirSave, (eventType: any, filename: any) => {
		console.log(eventType);
		// could be either 'rename' or 'change'. new file event and delete
		console.log(filename);
		renderPlaylistsZone(true);
	});
}
catch(e){
	console.log(e)
}
// let playlists = new Set();

// arrayPlaylist.forEach((item:any)=>{
//     playlists.add(item.playlist)
// })
// console.log(playlists)

// const NOTIFICATION_TITLE = 'Title'
// const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
// const CLICK_MESSAGE = 'Notification clicked!'
// new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
// Notification.requestPermission().then(function(result){
// 	let myNot = new Notification("Electron now",{body:"Hello WOrld"})
// })
