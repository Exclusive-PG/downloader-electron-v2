import { toggleElement } from "./types/types";

export class ManipulateDOM {


    public toggleElement(element:HTMLElement,stateElement:toggleElement):void {

        element.style.pointerEvents = stateElement.state ? "auto" : "none"
        
    }
}