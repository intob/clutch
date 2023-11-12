import { html, css, LitElement } from "lit"

class Card extends LitElement {
  static styles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--lighten-color-1);
    color: var(--light-color-2);
    border-radius: 10px;
    padding: 10px;
    gap: 10px;
  }
  `

  render() {
    return html`
    <slot></slot>
    `
  }
}
customElements.define("cl-card", Card)