import '@testing-library/jest-native/extend-expect';
import { render } from '@testing-library/react-native';

import CurrencyInput from './CurrencyInput';

describe('Component: CurrencyInput ', () => {
  it('has gray default gray borders', () => {
    const { getByTestId } = render(
      <CurrencyInput currency={'NGN'} value="1000" disabled={false} onTextChange={() => {}} />
    );
    const inputContainer = getByTestId('container-input-NGN');
    expect(inputContainer).toHaveStyle({ borderColor: 'gray' });
  });

  it('show currency and value', () => {
    const { getByText, getAllByDisplayValue } = render(
      <CurrencyInput currency={'NGN'} value="1000" disabled={false} onTextChange={() => {}} />
    );
    expect(getByText('NGN')).toBeVisible();
    expect(getAllByDisplayValue('1,000').length).toBe(1);
  });
});
