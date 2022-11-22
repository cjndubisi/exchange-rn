import { ExchangeAPIClient } from '../../api/client';
import { Converter } from '../../type';

export interface ConverterType {
  convert(request: Converter.Request): Promise<Converter.Response>;
}
export interface ExchangeFactory {
  withClient(client: ExchangeAPIClient): ExchangeType;
}

interface ExchangeFees {
  processPercent: number;
}

export interface ExchangeType {
  /**
   * Converts request.amount with a precision of 2.
   * Eg. 5.036 becomes 5.03 (Math.floor)
   * */
  convert(request: Converter.Request, fees?: ExchangeFees): Promise<Converter.Response>;
}
