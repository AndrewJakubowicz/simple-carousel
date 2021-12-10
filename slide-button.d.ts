/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import { LitElement } from 'lit';
declare class SlideButton extends LitElement {
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    handleKeyPress: () => void;
}
declare global {
    interface HTMLElementTagNameMap {
        'slide-button': SlideButton;
    }
}
export {};
//# sourceMappingURL=slide-button.d.ts.map