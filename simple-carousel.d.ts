/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
import './slide-button.js';
export declare class SimpleCarousel extends LitElement {
    static styles: import("lit").CSSResult;
    containerHeight: number;
    slideIndex: number;
    private slideElements;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    /** Changes current slide index by offset and wraps index */
    private changeSlide;
    navigateToNextSlide: () => void;
    navigateToPrevSlide: () => void;
    private navigateWithAnimation;
    private initializeSlides;
}
declare global {
    interface HTMLElementTagNameMap {
        'simple-carousel': SimpleCarousel;
    }
}
//# sourceMappingURL=simple-carousel.d.ts.map