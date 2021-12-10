/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('simple-carousel')
export class SimpleCarousel extends LitElement {
  override render() {
    return html`<h1>simple-carousel lives here!</h1>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "simple-carousel": SimpleCarousel;
  }
}

// document.createElement('simple-carousel')