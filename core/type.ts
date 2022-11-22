export namespace Converter {
  export interface Request {
    from: string;
    to: string;
    /// amount as real number
    amount: number;
  }
  export interface Response {
    request: Request;
    price: string;
    plusFees: string;
  }
}
