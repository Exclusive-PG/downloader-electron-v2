import Swiper, { Navigation, Pagination } from "swiper";
import { dc } from "../data-collection/DataCollection";
import { path } from "../requiredLib";
import { PlaylistItem } from "../types/types";
import { setListSrcVideosForVideoPlayer } from "../videoplayer/videoPlayerController";
import { configSetup } from "./../../config/currentConfig";
import { videoPlayer } from './../videoplayer/videoPlayerController';

const playlistControllerBtn = document.querySelector(".playlist_controller_btn");
const playlistZone = document.querySelector(".playlistZone");
const playListsRender = document.querySelector<HTMLElement>(".playlists_render");
const videoElement = document.querySelector<HTMLVideoElement>("[data-video]");



const createListOfPlaylists = () => {
	let arrayPlaylist: PlaylistItem[] = [];

	dc.getAllFiles(configSetup.configDownloadFiles.config.dirSave).forEach((item) => {
		let obj: PlaylistItem = {
			playlist: path.dirname(item).split(path.sep).pop(),
			name: path.basename(path.parse(item).name),
			extension: path.basename(path.parse(item).ext),
			path: item,
		};
		arrayPlaylist.push(obj);
	});

	return arrayPlaylist;
};

let arrayPlaylist = createListOfPlaylists();

const sortPlaylists = (inputArrayPlaylist: Array<PlaylistItem>) => {
	let tempResult: any = {};

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

const filterContent = (filterPlaylist: string, mainArray: Array<PlaylistItem>) => {
	return mainArray.filter((item) => item.playlist === filterPlaylist);
};

const renderAvailableContent = (arrayCurrentPlaylist: Array<PlaylistItem>, outResult: HTMLElement) => {
	outResult.innerHTML = "";
	//- ${extension}
	arrayCurrentPlaylist.forEach(({ playlist, name, extension, path }: PlaylistItem, index: number) => {
		outResult.innerHTML += `
		<div class="content_item" current-index=${index}>
		<div class="data">${index + 1}. ${name} </div>
		<div class="ext_content_item">${extension.slice(1)}</div>
		<div class="play_current_content" full-path="${path}" ><i class="fa-solid fa-play fa-2x"></i></div>
		</div>
		`;
	});
};

const renderAvailablePlaylists = (outResult: HTMLElement) => {
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
			//console.log(item.getAttribute("id_playlist"));
			console.log(filterContent(item.getAttribute("id_playlist"), arrayPlaylist));
			let _filteredContent = filterContent(item.getAttribute("id_playlist"), arrayPlaylist);
			setListSrcVideosForVideoPlayer(_filteredContent)
			renderAvailableContent(_filteredContent, document.querySelector(".content_current_playlist_render"));
			swiper.slideTo(1);
			showCurrentPlayingVideo();
		});
	});
};

renderAvailablePlaylists(playListsRender);

Swiper.use([Navigation, Pagination]);

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

const showCurrentPlayingVideo = () =>{
	let contentItems = document.querySelectorAll(".content_item");
	console.log(contentItems)
	contentItems.forEach((item:HTMLElement)=>{
		if(!item.hasAttribute("current-index")) return;
		parseInt(item.getAttribute("current-index")) === videoPlayer.currentPlayingIndexInList ? item.classList.add("playing-track") : item.classList.remove("playing-track");
	})
	//current-index=${index}
}







playlistControllerBtn.addEventListener("click", () => {
	playlistZone.classList.toggle("active");
});

videoElement.addEventListener("ended",()=>{
	
	showCurrentPlayingVideo();

})

// let playlists = new Set();

// arrayPlaylist.forEach((item:any)=>{
//     playlists.add(item.playlist)
// })
// console.log(playlists)
