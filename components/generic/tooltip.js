import { html, css, LitElement } from "lit"

class Tooltip extends LitElement {
  static styles = css`

  div {
    user-select: none;
  }

  slot[name="tip"] {
    display: block;
    pointer-events: none;
    opacity: 0;
    position: absolute;
    margin: 5px 5px 5px -5px;
    padding: 5px;
    background-color: var(--darken-color-2);
    color: var(--light-color-2);
    border-radius: 5px;
    font-size: .8rem;
    transition: opacity 300ms;
  }

  div:hover slot[name="tip"] {
    opacity: 1;
  }
  `

  render() {
    return html`
    <div>
      <slot name="tool"></slot>
      <slot name="tip"></slot>
    </div>
    `
  }
}
customElements.define("cl-tooltip", Tooltip)