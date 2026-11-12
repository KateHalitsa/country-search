export type Country = {
  area: number;
  cioc: string;
  flag: string;
  gini: number;
  name: string;
  flags: {
    png: string;
    svg: string;
  };
  latlng: number[];
  region: string;
  borders: string[];
  capital: string;
  demonym: string;
  languages: Languages[];
  subregion: string;
  timezones: string[];
  alpha2Code: string;
  alpha3Code: string;
  currencies: Currencies[];
  nativeName: string;
  population: number;
  independent: true;
  numericCode: number;
  callingCodes: number[];
  topLevelDomain: string[];
  populationDensity: number;
};

export type Languages = {
  name: string;
  iso639_1: string;
  iso639_2: string;
  nativeName: string;
};
export type Currencies = {
  code: string;
  name: string;
  symbol: string;
};
