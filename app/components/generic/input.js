import { html, css, LitElement } from "lit"

class Input extends LitElement {

  static styles = css`
  input {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    font-size: 1em;
    background-color: var(--darken-color-1);
    color: var(--light-color-2);
    transition: background-color 200ms, border-color 200ms;
    border: 1px solid var(--accent-light-color-1);
    border-radius: 5px;
    outline: 0;
  }

  input::placeholder {
    color: var(--light-color-2);
  }
  
  input:hover:not(:focus):not([readonly]) {
    border-color: var(--light-color-1);
    color: var(--light-color-2r);
  }

  input[readonly] {
    background-color: var(--lighten-color-1);
  }

  input:focus:not([readonly]) {
    border-color: var(--signal-color-1);
    color: var(--light-color-1);
  }
`

  static properties = {
    type: {},
    placeholder: {},
    value: {},
    min: {},
    max: {},
    step: {},
    required: { type: Boolean },
    autofocus: { type: Boolean },
    readonly: { type: Boolean }
  }

  async attributeChangedCallback(name, _old, value) {
    super.attributeChangedCallback(name, _old, value)
    if (name === "value" && this.inputElement) {
      this.inputElement.value = value
    }
  }

  render() {
    return html`
    <input @input=${this.handleInput}
        type="${this.type}"
        placeholder="${this.placeholder}"
        autocomplete="off"
        value=${this.value}
        min=${this.min}
        max=${this.max}
        step=${this.step}
        ?required=${this.required}
        ?autofocus=${this.autofocus}
        ?readonly=${this.readonly}
    />
    `
  }

  handleInput(e) {
    e.stopPropagation()
    this.value = e.target.value
    this.dispatchEvent(new CustomEvent("input", {
      bubbles: false,
      detail: {
        value: e.target.value
      }
    }))
  }

  get inputElement() {
    return this.renderRoot?.querySelector("input")
  }
}
customElements.define("cl-input", Input)