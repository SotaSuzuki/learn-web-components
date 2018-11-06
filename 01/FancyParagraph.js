class FancyParagraph extends HTMLElement {
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
    console.log(`${name}' changed (${this.attributeChangeCount})`)
  }
  
  adoptedCallback () {}
  
  get template () {
    return `
      <style>
        p {
          color: ${this.getAttribute('color')};
          font-size: ${10 + this.fontSize}px;
        }
      </style>
      
      <p><slot /></p>
    `
  }
}

customElements.define('fancy-paragraph', FancyParagraph)
