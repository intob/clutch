import { html, css } from "lit"
import { Link } from "./link.js"

class IconLink extends Link {

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

  cl-icon {
    transition: fill 300ms;
    fill: var(--light-color-4);
  }

  a:hover cl-icon {
    fill: var(--light-color-2);
  }
  `

  static properties = {
    ...super.properties,
    href: {},
    icon: {}
  }

  constructor() {
    super()
  }

  render() {
    return html`
    <a href=${this.href}>
      <cl-icon name=${this.icon}></cl-icon>
      <slot></slot>
    </a>
    `
  }
}
customElements.define("icon-link", IconLink)