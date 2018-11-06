class FancyButton extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = `
      <style>
        button { color: blue; }
        :host {
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
    const fancyParagraph = customElements.get('fancy-paragraph')
    const fancyButton = customElements.get('fancy-button')
    const fancyParagraphElement = document.querySelector('fancy-paragraph')
    fancyParagraphElement.setAttribute('color', '#9d9b00')
    
    console.log(`${fancyButton.name} clicked.`)
  }
}

customElements.define('fancy-button', FancyButton)
