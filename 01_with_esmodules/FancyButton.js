export class FancyButton extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        button { color: red; font-size: 28px; border: 1px solid red; }
        :host {
          display: inline-block;
          background-color: var(--button-bg-color, #333);
          padding: 12px;
        }
      </style>
      
      <button><slot /></button>
    `
    this.button = this.shadowRoot.querySelector('button')
  }
  
  connectedCallback () {
    this.addEventListener('click', this.onClick)
    this.button.addEventListener('click', this.onClickButton)
  }
  
  disconnectedCallback () {
    this.removeEventListener('click', this.onClick)
    this.button.removeEventListener('click', this.onClickButton)
  }
  
  onClick (e) {
    console.log(`clicked.`)
  }
  
  onClickButton (e) {
    e.stopPropagation()
    const fancyParagraphElement = document.querySelector('fancy-paragraph')
    fancyParagraphElement.color = '#fff'
    
    const name = customElements.get('fancy-button').name
    console.log(`${name} clicked.`)
  }
}

customElements.define('fancy-button', FancyButton)
customElements.whenDefined('fancy-button')
  .then(() => console.log('FancyButton defined'))
