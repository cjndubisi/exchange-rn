import CurrencyInput from './CurrencyInput';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
// import '@testing-library/jest-native';
import '@testing-library/jest-native/extend-expect';

// expect.extend({ toHaveStyle });

describe('Component: CurrencyInput ', () => {
  it('has gray default gray borders', () => {
    const { getAllByDisplayValue, getByTestId } = render(
      <CurrencyInput currency={'NGN'} value="1000" disabled={false} onTextChange={() => {}} />
    );
    const inputContainer = getByTestId('container-input-NGN');
    expect(inputContainer).toHaveStyle({ borderColor: 'gray' });
  });

  it('show currency and value', () => {
    const { getByText, getByTestId, getAllByDisplayValue, toJSON } = render(
      <CurrencyInput currency={'NGN'} value="1000" disabled={false} onTextChange={() => {}} />
    );
    expect(getByText('NGN')).toBeVisible();
    expect(getAllByDisplayValue('1,000').length).toBe(1);
  });
});
