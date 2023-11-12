import { html, css, LitElement } from "lit"
import { fmtId } from "../../../util/fmt.js"

class NavBar extends LitElement {

  static styles = [
    css`
    :host {
      display: flex;
      justify-content: space-between;
      align-items: center;
      user-select: none;
      z-index: 1;
      border-radius: 0 0 10px 10px;
    }

    .left, .right {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .home {
      font-weight: 600;
      font-size: 1.2em;
      display: flex;
      align-items: center;
    }

    .logo {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      margin-right: 5px;
    }

    span[slot="parent"] {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 20px;
    }

    span[slot="parent"] cl-icon {
      transition: fill 300ms;
      fill: var(--light-color-4);
    }

    span[slot="parent"]:hover cl-icon {
      fill: var(--light-color-2);
    }
    `
  ]
  
  render() {
    return html`
    <div class="left">
      <cl-link href="#/">
        <div class="home">
          <!--<img src="" class="logo"/>-->
          <span>Clutch</span>
        </div>
      </cl-link>
    </div>
    <div class="right"></div>
    `
  }
}
customElements.define("nav-bar", NavBar, { extends: "nav" })