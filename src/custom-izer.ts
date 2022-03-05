import {LitElement, html, css} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {styleMap} from 'lit/directives/style-map.js';

interface CustomizerInfo {
  [customProperties: string]: string;
}

@customElement('custom-izer')
class Customizer extends LitElement {
  static override styles = css`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  `;

  @property({type: Object})
  customizerInputs: CustomizerInfo = {};

  @state()
  styleMapObj: {[key: string]: string} = {};

  changePropertyValue({propertyVal, val}: {propertyVal: string; val: string}) {
    this.styleMapObj[propertyVal] = val;
    this.requestUpdate();
  }

  override render() {
    return html`
      <slot style=${styleMap(this.styleMapObj)}></slot>
      <div>
        ${Object.entries(this.customizerInputs).map(
          ([key, val]) =>
            html`<color-picker
              .propertyValue=${key}
              .startingValue=${val}
              @change-property-value=${this.changePropertyValue}
            ></color-picker>`
        )}
      </div>
    `;
  }
}

@customElement('color-picker')
class ColorPicker extends LitElement {
  @property() propertyValue!: string;
  @property() startingValue = '#000000';

  @query('input') colorInput!: HTMLInputElement;

  override firstUpdated() {
    if (!this.propertyValue) {
      throw new Error(
        `Expected color-picker propertyValue property to be set.`
      );
    }
    if (!this.propertyValue.startsWith('--')) {
      throw new Error(
        `Expected propertyValue to be a valid custom property. Starts with prefix '--'`
      );
    }

    this.onColorChange(this.colorInput);
  }

  onColorChange(e: InputEvent | HTMLInputElement) {
    const changePropertyValueEvt = new Event('change-property-value');
    (
      changePropertyValueEvt as Event & {propertyVal: string; val: string}
    ).propertyVal = this.propertyValue;
    (changePropertyValueEvt as Event & {propertyVal: string; val: string}).val =
      ((e as {value: string}).value ??
        (e as unknown as {currentTarget: HTMLInputElement}).currentTarget
          .value) as string;
    this.dispatchEvent(changePropertyValueEvt);
  }

  override render() {
    return html`<label>${this.propertyValue}: </label
      ><input
        @input=${this.onColorChange}
        type="color"
        value=${this.startingValue}
      />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'custom-izer': Customizer;
    'color-picker': ColorPicker;
  }
}
