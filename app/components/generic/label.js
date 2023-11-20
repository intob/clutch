import { html, css, LitElement } from "lit"

class Label extends LitElement {
  static styles = css`
  slot[name="text"] {
    color: var(--light-color-3);
    display: block;
    background-color: var(--lighten-color-1);
    padding: 10px;
    border-radius: 5px 5px 0 0;
  }

  `

  render() {
    return html`
    <div>
      <slot name="text"></slot>
      <slot name="control"></slot>
    </div>
    `
  }
}
customElements.define("cl-label", Label)