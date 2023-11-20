import { html, css, LitElement } from "lit"
import { map } from "lit/directives/map.js"

class Select extends LitElement {

  static styles = css`
  select {
    padding: 10px;
    box-sizing: border-box;
    font-size: 1em;
    background-color: var(--darken-color-1);
    color: var(--light-color-2);
    transition: background-color 200ms, border-color 200ms;
    border: 1px solid var(--accent-light-color-1);
    border-radius: 5px;
    width: 100%;
  }

  select option {
    color: var(--dark-color-1);
  }

  select:hover:not(:focus):not([disabled]) {
    border-color: var(--light-color-1);
    color: var(--light-color-2);
  }

  select[disabled] {
    background-color: var(--lighten-color-1);
  }

  select:focus:not([disabled]) {
    outline: 0;
    border-color: var(--signal-color-1);
  }
  `

  static properties = {
    value: {},
    options: {},
    disabled: { type: Boolean }
  }

  render() {
    return html`
    <select @change=${this.handleChange} value=${this.value} ?disabled=${this.disabled}>
      ${this.renderSelectOptions()}
    </select>
    `
  }

  renderSelectOptions() {
    if (!this.options) {
      return
    }
    const parsed = JSON.parse(this.options)
    const keys = Object.keys(parsed)
    return html`${map(keys, k => this.renderOption(k, parsed[k]))}`
  }

  renderOption(value, label) {
    return html`<option value=${value} ?selected=${this.value === value}>${label}</option>`
  }

  handleChange(e) {
    e.stopPropagation()
    this.value = e.target.value
    this.dispatchEvent(new CustomEvent("change", {
      bubbles: false,
      detail: {
        value: e.target.value
      }
    }))
  }

  get selectElement() {
    return this.renderRoot?.querySelector("select")
  }
}
customElements.define("cl-select", Select)