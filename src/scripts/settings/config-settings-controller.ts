import { configSetup } from './../../config/currentConfig';
import { ManipulateDOM } from './../manipulateDOM';


const collectionInputsConfig = document.querySelectorAll(".input-config")
const ConfigPanel = document.querySelector<HTMLDivElement>(".content_block_settings")
const cancelBtn = document.querySelector<HTMLDivElement>(".cancel-config-btn")
const openSettingsBtn = document.querySelector<HTMLDivElement>(".settings_wrapper")
const confirmConfigBtn = document.querySelector<HTMLDivElement>(".confirm-config-btn")
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



fillInput()

cancelBtn.addEventListener("click",toggleSettingsPanel)
openSettingsBtn.addEventListener("click",toggleSettingsPanel)

confirmConfigBtn.addEventListener("click",()=>{
    let tempConfig :any = {}
    collectionInputsConfig.forEach((item: HTMLInputElement)=>{
        tempConfig[item.getAttribute("data-input-config")] = item.value
    })
    console.log(`tempConfig`)
    console.log(tempConfig)
    configSetup.setConfig(tempConfig)
    console.log("main config")
    console.log(configSetup.configDownloadFiles.config)
})
