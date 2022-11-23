import ConvertHomeScreen from './ConvertTabHomeScreen';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { mockSuccesfulResponse } from '../../core/util/test-util';
import { getRateSubResponse } from '../../core/api/client/exchange.host/fixture';
import { NavigationContainer } from '@react-navigation/native';
jest.mock('../../core/api/client/exchange.host/api', () => {
  return {
    latestResults: jest.fn().mockResolvedValue({
      base: 'USD',
      rates: {
        NGN: 800,
      },
    }),
  };
});
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
    const { getAllByDisplayValue, getByDisplayValue, getByTestId, debug } = render(
      <ConvertHomeScreen />
    );

    expect(getByTestId('container-input-NGN')).not.toBeNull();
    expect(getByTestId('container-input-USD')).not.toBeNull();
  });
});
