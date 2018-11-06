customElements.whenDefined('my-button')
  .then(() => {
    console.log('MyButton Element is defined')
  })

class MyButton extends HTMLElement {
  static get observedAttributes () {
    return ['color']
  }
  
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.color = '#444'
    this.shadowRoot.innerHTML = this.template
  }
  
  attributeChangedCallback (attributeName, oldValue, newValue) {
    if (attributeName === 'color') {
      this.shadowRoot.innerHTML = this.template
      console.log(`Color changed from ${oldValue} to ${newValue}`)
    }
  }
  
  connectedCallback () {
    this.addEventListener('click', this.onClick)
  }
  
  disconnectedCallback () {
    this.removeEventListener('click', this.onClick)
  }
  
  adoptedCallback () {
    console.log('Called `adoptedCallback`')
  }
  
  get template () {
    return `
      ${this.style}
      <button class="my-button"><slot /></button>
    `
  }
  
  get style () {
    return `
      <style>
        .my-button {
          padding: 10px 20px;
          border: 2px solid ${this.color};
          border-radius: 4px;
          color: ${this.color};
          font-weight: bold;
          font-size: 24px;
        }
        :host {
          padding: 30px 60px;
        }
      </style>
    `
  }
  
  get color () {
    return this.getAttribute('color')
  }
  
  set color (value) {
    this.setAttribute('color', value)
  }
  
  onClick (e) {
    e.preventDefault()
    this.color = '#444'
  }
}

customElements.define('my-button', MyButton)
