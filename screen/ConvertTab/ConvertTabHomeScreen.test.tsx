import '@testing-library/jest-native/extend-expect';
import { act, render, within } from '@testing-library/react-native';
import TestRenderer from 'react-test-renderer';
import { Strings } from '../../resource';

import ConvertHomeScreen from './ConvertTabHomeScreen';

jest.mock('../../core/api/client/exchange.host/api', () => ({
  __esModule: true, // this property makes it work
  default: null,
  latestRates: jest.fn().mockResolvedValue({
    base: 'NGN',
    rates: {
      NGN: 0.5,
    },
  }),
}));

jest.mock('../../router', () => () => {
  return {
    showSelectCurrency: jest.fn(),
  };
});

jest.mock('./hooks', () => {
  return {
    useExchangeClient: jest.fn().mockReturnValue({
      loadingExchange: false,
    }),
  };
});

describe('Screen: ConvertHomeScreen ', () => {
  it('renders correctly', () => {
    const { getByTestId, getByText } = render(<ConvertHomeScreen />);

    expect(getByTestId('container-input-NGN')).toBeVisible();
    expect(getByTestId('container-input-USD')).toBeVisible();
    expect(getByText(Strings.totalCost.toUpperCase())).not.toBeNull();
    expect(getByText(Strings.exchangeRate)).toBeVisible();
    expect(getByText(Strings.transactionFee)).toBeVisible();
  });
});
