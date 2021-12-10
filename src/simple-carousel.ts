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

import './slide-button.js';

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
    return html`
      <slide-button
        @click=${this.navigateToPrevSlide}>
        Left
      </slide-button>

      <slot></slot>

      <slide-button
        @click=${this.navigateToNextSlide}>
        Right
      </slide-button>`;
  }

  override firstUpdated() {
    this.navigateSlide();
  }

  override updated() {
    this.navigateSlide();
  }

  /** Changes current slide index by offset and wraps index */
  private changeSlide(offset: number) {
    const slideCount = this.slideElements.length;
    this.slideIndex = (slideCount + ((this.slideIndex + offset) % slideCount)) % slideCount;
  }

  navigateToNextSlide = () => {
    this.changeSlide(1);
  }

  navigateToPrevSlide = () => {
    this.changeSlide(-1);
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
