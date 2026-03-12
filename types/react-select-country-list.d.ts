declare module 'react-select-country-list' {
  interface Country {
    value: string;
    label: string;
  }

  interface CountryList {
    getData(): Country[];
    getLabel(value: string): string;
    getValue(label: string): string;
    getLabels(): string[];
    getValues(): string[];
    getLabelList(): Record<string, string>;
    getValueList(): Record<string, string>;
    setLabel(value: string, label: string): CountryList;
    setEmpty(label: string): CountryList;
    native(): CountryList;
  }

  export default function countryList(): CountryList;
}
