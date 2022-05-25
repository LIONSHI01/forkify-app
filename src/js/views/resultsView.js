import { mark } from 'regenerator-runtime';
import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!';
  _message = '';

  _generateMarkup() {
    // ***Set render parameter = false, so return string for later join together
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
