/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import {
  customElement,
  property,
  queryAssignedNodes,
} from 'lit/decorators.js';

@customElement('simple-carousel')
export class SimpleCarousel extends LitElement {
  static override styles = css`
    ::slotted(.slide-hidden) {
      display: none;
    }
  `;

  @property({ type: Number }) slideIndex = 0;

  // In video use @queryAssignedElements()
  @queryAssignedNodes('', false, '*') private slideElements!: HTMLElement[];

  override render() {
    return html`<slot></slot>`;
  }

  override firstUpdated() {
    this.navigateSlide();
  }

  override updated() {
    this.navigateSlide();
  }

  private navigateSlide() {
    for (let i = 0; i < this.slideElements.length; i++) {
      if (i === this.slideIndex) {
        showSlide(this.slideElements[i]);
      } else {
        hideSlide(this.slideElements[i]);
      }
    }
  }
}

function hideSlide(el: HTMLElement) {
  el.classList.add('slide-hidden');
}

function showSlide(el: HTMLElement) {
  el.classList.remove('slide-hidden');
}

declare global {
  interface HTMLElementTagNameMap {
    'simple-carousel': SimpleCarousel;
  }
}
