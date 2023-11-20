import { html, css, LitElement } from "lit"

class NavDropdown extends LitElement {
  static styles = css`
  slot[name="child"] {
    flex-direction: column;
    position: absolute;
    background-color: var(--darken-color-2);
    padding: 10px 20px;
    border-radius: 10px;
  }

  slot[name="parent"] {
    padding: 10px 20px;
    color: var(--light-color-4);
    transition: color 300ms;
  }

  slot[name="parent"]:hover {
    color: var(--light-color-2);;
  }

  div slot[name="child"] {
    display: none;
  }

  div:hover slot[name="child"] {
    display: flex;
  }

  @media(max-width:1500px) {
    slot[name="child"].edge {
      right: 20px;
    }
  }
  `

  static properties = {
    edge: { type: Boolean }
  }

  render() {
    return html`
    <div>
      <slot name="parent"></slot>
      <slot name="child" class=${this.edge ? "edge" : ""}></slot>
    </div>
    `
  }
}
customElements.define("nav-dropdown", NavDropdown)