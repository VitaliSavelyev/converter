export interface CurrencyResp {
  effectiveDate: string;
  no: string;
  rates: Rate[];
  table: string;
  tradingDate: string
}

export interface Rate {
  mid: number
  code: string;
  currency: string;
}
