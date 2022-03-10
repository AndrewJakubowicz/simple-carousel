/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * @fileoverview This component implements a light and dark mode toggle.
 */

import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';

import './simple-carousel.js';
import './carousel-switch.js';

const darkModeStyles = {
  ['--highlight']: "#f534db",
  ['--shadow']: "#3478f5",
  ['--background-color']: "#0d0d0d",
  color: '#ddd'
}

const lightModeStyles = {
  ['--highlight']: "#3478f5",
  ['--shadow']: "#f534db",
  ['--background-color']: "#edf2f7",
  color: '#0d0d0d'
}


@customElement('demo-carousel-3')
export class DemoCarousel3 extends LitElement {
  static override styles = css`
    :host {
      display: flex;
    }

    simple-carousel {
      transition: color 0.2s;
    }
  `;

  @state() carouselStyles: {[key: string]: string} = lightModeStyles;

  onSwitchChange({mode}: {mode: 'light' | 'dark'}) {
    this.carouselStyles = mode === 'light' ? lightModeStyles : darkModeStyles;

  }

  override render() {
    return html`<carousel-switch @switch-change=${this.onSwitchChange}></carousel-switch
      ><simple-carousel style=${styleMap(this.carouselStyles)}>
        <slot></slot>
        <h2 slot="button-left">&lt;</h2>
        <h2 slot="button-right">></h2>
      </simple-carousel>`;
  }
}
