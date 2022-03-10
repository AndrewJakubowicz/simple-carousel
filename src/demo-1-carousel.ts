/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

import './simple-carousel.js'

@customElement('demo-carousel-1')
export class DemoCarousel1 extends LitElement {
  static override styles = css`
  :host {
    display: flex;
  }

  simple-carousel::part(button), simple-carousel::part(container) {
    box-shadow: none;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 0;
  }

  simple-carousel {
    position: relative;
    background-color: var(--highlight);
    border: 4px solid rgb(67, 67, 67);
    border-radius: 3px;
  }

  simple-carousel::part(button) {
    position: absolute;
    height: 100%;
    z-index: 1;
  }

  simple-carousel::part(container) {
    pointer-events: none;
  }

  simple-carousel::after {
    background-color: var(--shadow);
    opacity: 0.5;
    box-sizing: border-box;
    border-radius: 3px;
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    transform: translate(-20px, -20px);
    pointer-events: none;
    z-index: -1;
  }

  simple-carousel::part(button-left) {
    left: 0;
    background: linear-gradient(90deg, rgba(67,67,67,0.5) 0%, rgba(255, 255, 255, 0) 100%);
  }
  
  simple-carousel::part(button-right) {
    right: 0;
    background: linear-gradient(-90deg, rgba(67,67,67,0.5) 0%, rgba(255, 255, 255, 0) 100%);
  }

  simple-carousel::part(button):hover {
    background: var(--shadow);
  }
  `
  override render() {
    return html` <simple-carousel .overrideContainerHeight="${200}">
      <slot></slot>
    </simple-carousel>`;
  }
}
