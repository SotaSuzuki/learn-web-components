import { render, html } from 'lit-html'

class MyButton extends HTMLElement {
  static get observedAttributes () {
    return ['color']
  }
  
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.color = '#444'
    render(this.template, this.shadowRoot)
  }
  
  attributeChangedCallback (attributeName, oldValue, newValue) {
    if (attributeName === 'color') {
      console.log(`Color changed from ${oldValue} to ${newValue}`)
      render(this.template, this.shadowRoot)
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
    return html`
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
      <button class="my-button"><slot /></button>
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

customElements.whenDefined('my-button')
  .then(() => {
    console.log('MyButton Element is defined')
  })

if (typeof customElements.get('my-button') === 'undefined') {
  customElements.define('my-button', MyButton)
}
