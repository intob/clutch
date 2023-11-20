import { html, css, LitElement } from "lit"

export class Link extends LitElement {

  static styles = css`
  :host {
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  a {
    text-decoration: none;
    transition: color 300ms;
    color: var(--light-color-4);
    padding: 10px 20px;
    display: flex;
    gap: 5px;
    align-items: center;
  }

  a:focus {
    outline: 0;
  }

  a:hover {
    color: var(--light-color-2);
  }

  slot[name="icon"] {
    transition: fill 300ms;
    fill: var(--light-color-4);
  }

  a:hover slot[name="icon"] {
    fill: var(--light-color-2);
  }
  `

  static properties = {
    href: {}
  }

  constructor() {
    super()
  }

  render() {
    return html`
    <a href="${this.href}">
      <slot name="icon"></slot>
      <slot></slot>
    </a>
    `
  }
}
customElements.define("cl-link", Link)