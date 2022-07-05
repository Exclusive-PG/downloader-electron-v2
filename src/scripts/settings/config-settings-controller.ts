import { configSetup } from './../../config/currentConfig';
import { ManipulateDOM } from './../manipulateDOM';


const collectionInputsConfig = document.querySelectorAll(".input-config")
const ConfigPanel = document.querySelector<HTMLDivElement>(".content_block_settings")
const cancelBtn = document.querySelector<HTMLDivElement>(".cancel-config-btn")
const openSettingsBtn = document.querySelector<HTMLDivElement>(".settings_wrapper")
const manipulateDOM = new ManipulateDOM()

console.log(configSetup)
console.log(collectionInputsConfig)
console.log(Object.keys(configSetup.configDownloadFiles.config))
const fillInput = () =>{
    
    const keys = Object.keys(configSetup.configDownloadFiles.config);
    const value = Object.values(configSetup.configDownloadFiles.config);

    collectionInputsConfig.forEach((item: HTMLInputElement,indexInput:number)=>{
    
        for (let i=0; i < keys.length; i++){
            if(item.getAttribute("data-input-config") === keys[i]){
                
                console.log(`${item.getAttribute("data-input-config")} = ${keys[i]}`)
                item.value = value[i]
            }
        }
      
    })
}
const toggleSettingsPanel = ()=>{
     manipulateDOM.toggleClass("settings_panel","hide")
}



cancelBtn.addEventListener("click",toggleSettingsPanel)
openSettingsBtn.addEventListener("click",toggleSettingsPanel)

fillInput()