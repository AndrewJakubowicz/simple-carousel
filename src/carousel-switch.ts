/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {customElement, state} from 'lit/decorators.js';

@customElement('carousel-switch')
export class CarouselSwitch extends LitElement {
  static override styles = css`
    :host,
    * {
      box-sizing: border-box;
    }

    :host {
      display: inline-flex;
      align-items: center;
      font-size: 13px;
      width: calc(48em / 13);
      height: calc(27em / 13);
      border-radius: 1em;
      padding: calc(2em / 13);
      border: calc(1.5em / 13) solid #ccc;
      background: white;
      font-family: 'Open Sans', sans-serif;
    }

    button {
      flex: 1;
      height: 100%;
      display: flex;
      position: relative;
      font-size: inherit;
      font-family: inherit;
      background: transparent;
      border: none;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      padding: 0;
      z-index: 0;
    }

    #toggle {
      position: absolute;
      width: 50%;
      height: 100%;
      top: 0;
      transition: left 100ms;
      background: #767676;
      z-index: -1;
      border-radius: 1em;
    }

    @media (prefers-reduced-motion: reduce) {
      #toggle {
        transition: none;
      }
    }

    button:hover > #toggle {
      background: #005cc5bd;
    }

    [aria-checked='false'] > #toggle {
      left: 0;
    }

    [aria-checked='true'] > #toggle {
      left: 50%;
    }

    #darkLabel,
    #lightLabel {
      display: inline-flex;
      z-index: 1;
      padding: 0 0 calc(1em / 13) calc(3em / 13);
      opacity: 60%;
      transition: color 100ms, opacity 100ms;
    }

    [aria-checked='true'] > #lightLabel,
    [aria-checked='false'] > #darkLabel {
      color: white;
      font-weight: 600;
      opacity: 100%;
    }
  `;

  @state() mode: 'light' | 'dark' = 'light';

  override render() {
    return html`
      <button
        role="switch"
        aria-checked=${this.mode == 'light' ? 'true' : 'false'}
        aria-label="Toggle TypeScript"
        @click=${this._switch}
      >
        <span id="darkLabel">D</span>
        <span id="lightLabel">L</span>
        <span id="toggle"></span>
      </button>
    `;
  }

  private _switch() {
    if (this.mode === 'dark') {
      this.mode = 'light';
    } else {
      this.mode = 'dark';
    }
    const event = new Event('switch-change');
    (event as Event & {mode: string}).mode = this.mode;
    this.dispatchEvent(event);
  }
}
