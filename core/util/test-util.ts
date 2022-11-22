import { EXHostGetRatesResponse } from "../api/client/exchange.host";

export const mockSuccesfulResponse = (
  status = 200,
  method: string = 'GET',
  returnBody?: object
) => {
  global.fetch = jest.fn().mockImplementationOnce(() => {
    return new Promise((resolve, _reject) => {
      resolve({
        ok: true,
        status,
        json: () => {
          return returnBody ? returnBody : {};
        },
      });
    });
  });
};
