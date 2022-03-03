import { LitElement, html } from "lit";
import { customElement, property, query } from 'lit/decorators.js'

@customElement("custom-izer")
class Customizer extends LitElement {
  changePropertyValue({ propertyVal, val }: { propertyVal: string, val: string }) {
    this.style.setProperty(propertyVal, val);
  }

  override render() {
    return html`
      <slot></slot>
      <br />
      <color-picker .propertyValue=${'--shadow'} .startingValue=${'#293198'} @change-property-value=${this.changePropertyValue}></color-picker>
      <color-picker .propertyValue=${'--highlight'} .startingValue=${'#ceffff'} @change-property-value=${this.changePropertyValue}></color-picker>
    `
  }
}

@customElement("color-picker")
class ColorPicker extends LitElement {

  @property() propertyValue!: string;
  @property() startingValue = '#000000';

  @query('input') colorInput!: HTMLInputElement;

  override firstUpdated() {
    if (!this.propertyValue) {
      throw new Error(`Expected color-picker propertyValue property to be set.`);
    }
    if (!this.propertyValue.startsWith('--')) {
      throw new Error(`Expected propertyValue to be a valid custom property. Starts with prefix '--'`);
    }

    this.onColorChange(this.colorInput);
  }

  onColorChange(e: InputEvent | HTMLInputElement) {
    const changePropertyValueEvt = new Event('change-property-value');
    (changePropertyValueEvt as Event & { propertyVal: string, val: string }).propertyVal = this.propertyValue;
    (changePropertyValueEvt as Event & { propertyVal: string, val: string }).val = ((e as { value: string }).value ?? (e as unknown as { currentTarget: HTMLInputElement }).currentTarget.value) as string;
    this.dispatchEvent(changePropertyValueEvt);
  }

  override render() {
    return html`<label>${this.propertyValue}: </label><input @input=${this.onColorChange} type="color" value=${this.startingValue}>`;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    "custom-izer": Customizer;
    "color-picker": ColorPicker;
  }
}