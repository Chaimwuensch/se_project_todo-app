export default class Popup {
    constructor(popupSelector){
        this._element = document.querySelector(popupSelector) 
    }
    open(){
       this._element.classList.add("popup_visible"); 
    }
    close(){
        this._element.classList.remove("popup_visible");
    }
}