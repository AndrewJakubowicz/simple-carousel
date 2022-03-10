/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, query} from 'lit/decorators.js';

import type {SimpleCarousel} from './simple-carousel.js';

import './simple-carousel.js';

@customElement('demo-carousel-2')
export class DemoCarousel2 extends LitElement {
  static override styles = css`
    :host {
      display: flex;
    }

    simple-carousel::part(button),
    simple-carousel::part(container) {
      box-shadow: none;
      margin: 0;
      padding: 0;
    }

    simple-carousel {
      position: relative;
      background-color: var(--highlight);
      border-radius: 3px;
    }

    simple-carousel::part(container) {
      border-radius: 3px;
    }

    simple-carousel::part(button) {
      display: none;
    }

    simple-carousel::after {
      background-color: var(--shadow);
      box-sizing: border-box;
      border-radius: 3px;
      content: '';
      display: block;
      position: absolute;
      height: 100%;
      width: 100%;
      transform: translate(0px, 10px);
      pointer-events: none;
      z-index: -1;
    }
  `;

  @query('simple-carousel') carouselEl!: SimpleCarousel;

  override connectedCallback(): void {
    super.connectedCallback();

    setInterval(() => {
      this.carouselEl.navigateToNextSlide();
    }, 3000);
  }

  override render() {
    return html` <simple-carousel .overrideContainerHeight="${200}">
      <slot></slot>
    </simple-carousel>`;
  }
}
