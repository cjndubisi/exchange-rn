import { ExchangeAPIClient } from '../../api/client/type';
import { Converter } from '../../type';

export interface ConverterType {
  convert(request: Converter.Request): Promise<Converter.Response>;
}
export interface ConverterCreator {
  withExchange(client: ExchangeAPIClient): ConverterType;
}
