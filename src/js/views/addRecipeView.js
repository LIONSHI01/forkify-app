import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import View from './View';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded :)';

  constructor() {
    // state super() since this is a Child Class of View.js
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  // To CLOSE or OPEN the window with Toggle method
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    //*** Bind toggleWindow to the Class this keyword,
    // otherwise, this._overlay and this._window will be bind to _btnOpen

    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
