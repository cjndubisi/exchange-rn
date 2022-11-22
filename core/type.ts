export namespace Converter {
  export interface Request {
    from: string;
    to: string;
    amount: number;
  }
  export interface Response {
    request: Request;
    result: number;
    // amount/result
    // rate: number;
    // date: string;
  }
}
