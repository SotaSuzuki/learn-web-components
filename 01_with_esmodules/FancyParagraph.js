export class FancyParagraph extends HTMLElement {
  static get observedAttributes () {
    return ['color']
  }
  
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = this.template
    this.fontSize = 10
    this.attributeChangeCount = 0
  }
  
  attributeChangedCallback (name, oldValue, newValue) {
    this.attributeChangeCount++
    this.fontSize += 1
    this.shadowRoot.innerHTML = this.template
    console.log(`${name} changed (${this.attributeChangeCount})`)
  }
  
  adoptedCallback () {
    console.log('adoptedCallback called from FancyParagraph')
  }
  
  get template () {
    return `
      <style>
        :host {
          display: block;
          padding: 20px;
          background-color: #48f;
        }
        p {
          color: ${this.getAttribute('color')};
          font-size: ${10 + this.fontSize}px;
        }
      </style>
      
      <p><slot /></p>
    `
  }
  
  get color () {
    return this.getAttribute('color')
  }

  set color (value) {
    this.setAttribute('color', value)
  }
}

customElements.define('fancy-paragraph', FancyParagraph)
customElements.whenDefined('fancy-paragraph')
  .then(() => console.log('FancyParagraph defined'))
