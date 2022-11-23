import { Currency } from 'dinero.js';

export namespace Converter {
  export interface Request {
    from: Currency;
    to: Currency;
    /// amount as real number
    amount: number;
  }
  export interface Response {
    request: Request;
    price: string;
    plusFees: string;
  }
}
