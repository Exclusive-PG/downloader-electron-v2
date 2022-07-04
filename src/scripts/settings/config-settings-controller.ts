import { configSetup } from './../../config/currentConfig';
import { ManipulateDOM } from './../manipulateDOM';


const collectionInputsConfig = document.querySelectorAll(".input-config")
const ConfigPanel = document.querySelector<HTMLDivElement>(".content_block_settings")
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

fillInput()


document.querySelector(".settings_wrapper").addEventListener("click",()=>{
    //if(!ConfigPanel.classList.contains("hide"))
    manipulateDOM.toggleClass("content_block_settings","hide")
})