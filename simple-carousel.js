/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property, state, queryAssignedNodes, } from 'lit/decorators.js';
import { styleMap } from "lit/directives/style-map.js";
import { SLIDE_LEFT_IN, SLIDE_LEFT_OUT, SLIDE_RIGHT_IN, SLIDE_RIGHT_OUT, BOOTSTRAP_CHEVRON_LEFT, BOOTSTRAP_CHEVRON_RIGHT } from "./constants.js";
import './slide-button.js';
let SimpleCarousel = class SimpleCarousel extends LitElement {
    constructor() {
        super(...arguments);
        this.containerHeight = 0;
        this.slideIndex = 0;
        this.navigateToNextSlide = () => {
            this.navigateWithAnimation(1, SLIDE_LEFT_OUT, SLIDE_RIGHT_IN);
        };
        this.navigateToPrevSlide = () => {
            this.navigateWithAnimation(-1, SLIDE_RIGHT_OUT, SLIDE_LEFT_IN);
        };
    }
    render() {
        const containerStyles = {
            height: `${this.containerHeight}px`
        };
        return html `
      <slide-button
          onClick=${this.navigateToPrevSlide}
          @click=${this.navigateToPrevSlide}>
        ${BOOTSTRAP_CHEVRON_LEFT}
      </slide-button>

      <div id="container"
        style="${styleMap(containerStyles)}">
        <slot></slot>
      </div>

      <slide-button
          onClick=${this.navigateToNextSlide}
          @click=${this.navigateToNextSlide}>
        ${BOOTSTRAP_CHEVRON_RIGHT}
      </slide-button>`;
    }
    firstUpdated() {
        this.containerHeight = getMaxElHeight(this.slideElements);
        this.initializeSlides();
    }
    /** Changes current slide index by offset and wraps index */
    changeSlide(offset) {
        const slideCount = this.slideElements.length;
        this.slideIndex = (slideCount + ((this.slideIndex + offset) % slideCount)) % slideCount;
    }
    async navigateWithAnimation(nextSlideOffset, leavingAnimation, enteringAnimation) {
        const elLeaving = this.slideElements[this.slideIndex];
        if (elLeaving.getAnimations().length > 0) {
            return;
        }
        // Animate out current element.
        const leavingAnim = elLeaving.animate(leavingAnimation[0], leavingAnimation[1]);
        // Change slide
        this.changeSlide(nextSlideOffset);
        const newSlideEl = this.slideElements[this.slideIndex];
        // Show the new slide
        showSlide(newSlideEl);
        // Teleport it out of view and animate it in
        const enteringAnim = newSlideEl.animate(enteringAnimation[0], enteringAnimation[1]);
        // Wait for animations
        await Promise.all([leavingAnim.finished, enteringAnim.finished]);
        // Hide the element that left
        hideSlide(elLeaving);
    }
    initializeSlides() {
        for (let i = 0; i < this.slideElements.length; i++) {
            if (i === this.slideIndex) {
                showSlide(this.slideElements[i]);
            }
            else {
                hideSlide(this.slideElements[i]);
            }
        }
    }
};
SimpleCarousel.styles = css `
    ::slotted(.slide-hidden) {
      display: none;
    }

    /** So the elements all overlap */
    ::slotted(*) {
      position: absolute;
      padding: 1em;
    }

    :host {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-width: 500px;
    }

    #container {
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin: 0 18px;

      padding: 1em;
      overflow: hidden;
      position: relative;

      box-shadow: var(--shadow, gray) 0.3em 0.3em 0.4em, var(--highlight, white) -0.1em -0.1em 0.3em;
    }
  `;
__decorate([
    state()
], SimpleCarousel.prototype, "containerHeight", void 0);
__decorate([
    property({ type: Number })
], SimpleCarousel.prototype, "slideIndex", void 0);
__decorate([
    queryAssignedNodes('', false, '*')
], SimpleCarousel.prototype, "slideElements", void 0);
SimpleCarousel = __decorate([
    customElement('simple-carousel')
], SimpleCarousel);
export { SimpleCarousel };
function getMaxElHeight(els) {
    return Math.max(0, ...els.map(el => el.getBoundingClientRect().height));
}
function hideSlide(el) {
    el.classList.add('slide-hidden');
}
function showSlide(el) {
    el.classList.remove('slide-hidden');
}
//# sourceMappingURL=simple-carousel.js.map