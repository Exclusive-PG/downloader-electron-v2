import AppController from "./AppController";
import { renderPlaylistsZone } from "./../playlist/playlist";
import { renderDataPage } from "./../data-collection/data-page";
import { headerController } from "../headerController";
import { ToggleSettingsPanelController } from "../settings/config-settings-controller";
const { app } = require('electron')

const App = new AppController();
App.pushArrayOfScripts([renderPlaylistsZone, renderDataPage, headerController, ToggleSettingsPanelController]);
App.startApp();

const currentVersionDisplay = document.querySelector<HTMLElement>(".version");
currentVersionDisplay.textContent = `ver. ${App.getVersion}`;

