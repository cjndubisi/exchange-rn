import { EXHostGetRatesResponse, EXHostSupportCurreniesResponse } from './api';

export const getRateSubResponse: EXHostGetRatesResponse = {
  base: 'EUR',
  success: true,
  date: '01/11/2022',
  rates: {
    AED: 3.77409,
    AFN: 91.580878,
    ALL: 116.701982,
    AMD: 408.45131,
    ANG: 1.862075,
    AOA: 525.11507,
    ARS: 167.979391,
  },
};

export const latestRatesByBase = {
  NGN: {
    base: 'NGN',
    success: true,
    date: '01/11/22',
    rates: {
      USD: 0.0023,
      ALL: 0.3222,
    },
  },
  ALL: {
    base: 'ALL',
    success: true,
    date: '01/11/22',
    rates: {
      USD: 0.123,
    },
  },
  USD: {
    base: 'USD',
    success: true,
    date: '01/11/22',
    rates: {
      NGN: 230,
    },
  },
};
export const getSupportedCurreniesStubResponse: EXHostSupportCurreniesResponse = {
  success: true,
  symbols: {
    AED: {
      description: 'United Arab Emirates Dirham',
      code: 'AED',
    },
    AFN: {
      description: 'Afghan Afghani',
      code: 'AFN',
    },
    ALL: {
      description: 'Albanian Lek',
      code: 'ALL',
    },
    AMD: {
      description: 'Armenian Dram',
      code: 'AMD',
    },
    ANG: {
      description: 'Netherlands Antillean Guilder',
      code: 'ANG',
    },
    AOA: {
      description: 'Angolan Kwanza',
      code: 'AOA',
    },
    ARS: {
      description: 'Argentine Peso',
      code: 'ARS',
    },
    AUD: {
      description: 'Australian Dollar',
      code: 'AUD',
    },
    AWG: {
      description: 'Aruban Florin',
      code: 'AWG',
    },
    AZN: {
      description: 'Azerbaijani Manat',
      code: 'AZN',
    },
  },
};
