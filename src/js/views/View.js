import icons from 'url:../../img/icons.svg';

// export the original class but not the class instance (export default new class View())
export default class View {
  _data;

  render(data, render = true) {
    // check if the Response has no data return error message
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    //Create new virtual DOM object
    const newDom = document.createRange().createContextualFragment(newMarkup);
    //Convert nodeList to array
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Update changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  _fractionalNum(num) {
    if (!num) return '';
    return new Fraction(num).toString();
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> 
      `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterBegin', markup);
  }

  renderError(message = this._errorMessage) {
    // use the default #errorMessage when no specific error want to show
    const markUp = `
        <div class="error">
          <div>
              <svg>
              <use href="${icons}#icon-alert-triangle"></use>
              </svg>
          </div>
          <p>${message}</p>
         </div> 
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
  renderMessage(message = this._message) {
    // use the default #errorMessage when no specific error want to show
    const markUp = `
        <div class="error">
          <div>
              <svg>
              <use href="${icons}#icon-alert-triangle"></use>
              </svg>
          </div>
          <p>${message}</p>
         </div> 
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markUp);
  }
}
