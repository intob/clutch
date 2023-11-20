import { html, css, LitElement } from "lit"

class Pill extends LitElement {
  static styles = css`
  :host {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: var(--lighten-color-1);
    border-radius: 10px;
    padding: 10px;
  }
  `

  render() {
    return html`
    <slot></slot>
    `
  }
}
customElements.define("cl-pill", Pill)