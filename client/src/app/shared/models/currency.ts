export interface Currency {
  disclaimer: string;
  license:    string;
  timestamp:  number;
  base:       string;
  rates:      Rates;
}

export interface Rates {
  GBP: number;
  ZAR: number;
}
