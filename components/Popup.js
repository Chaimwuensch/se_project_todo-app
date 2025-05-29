export default class Popup {
    constructor(popupSelector){
        this._element = document.querySelector(popupSelector);
        this._handleEscapeClose = this._handleEscapeClose.bind(this);
    }

    open(){
        this._element.classList.add("popup_visible");
        document.addEventListener('keydown', this._handleEscapeClose);
    }

    close(){
        this._element.classList.remove("popup_visible");
        document.removeEventListener('keydown', this._handleEscapeClose);
    }

    _handleEscapeClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._element.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_visible') || evt.target.classList.contains('popup__close')) {
                this.close();
            }
        });
    }
}