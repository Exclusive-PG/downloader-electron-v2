import { dc } from "../data-collection/DataCollection";
import { path } from "../requiredLib";
import { configSetup } from "./../../config/currentConfig";

const playlistControllerBtn = document.querySelector(".playlist_controller_btn");
const playlistZone = document.querySelector(".playlistZone");
const playListsRender = document.querySelector<HTMLElement>(".playlists_render");

playlistControllerBtn.addEventListener("click", () => {
	playlistZone.classList.toggle("active");
});
let arrayPlaylist: any[] = [];

dc.getAllFiles(configSetup.configDownloadFiles.config.dirSave).forEach((item: any) => {
	let obj = {
		playlist: path.dirname(item).split(path.sep).pop(),
		name: path.basename(path.parse(item).name),
		extension: path.basename(path.parse(item).ext),
		path: item,
	};
	arrayPlaylist.push(obj);
});
// let playlists = new Set();

// arrayPlaylist.forEach((item:any)=>{
//     playlists.add(item.playlist)
// })
// console.log(playlists)

let tempResult: any = {};

for (let { playlist } of arrayPlaylist) {
	tempResult[playlist] = {
		playlist,
		count: tempResult[playlist] ? tempResult[playlist].count + 1 : 1,
	};
}
let result = Object.values(tempResult);
console.log(result);

const renderAvailablePlaylists = (outResult: HTMLElement) => {
	outResult.innerHTML = "";

	result.forEach(({ playlist, count }: any) => {
		outResult.innerHTML += `
        <div class="playlist_item id_playlist="${playlist}">
            <span class="wrapper_playlist_item">
                <div class="icon_playlist"><i class="fa-solid fa-folder fa-5x"></i></div>
                <div class="data_playlist_item">${playlist.toUpperCase()}(${count})</div>
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
	});
};

renderAvailablePlaylists(playListsRender);
