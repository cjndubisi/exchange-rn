describe('Exchange', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('converts 1000 NGN to USD', async () => {
    await element(by.id('input-NGN')).to.toHaveText('10000');
    await element(by.id('input-NGN')).replaceText('10000');
    await expect(element(by.id('input-USD'))).toHaveText('23.00');
  });

  describe('changing base', () => {
    it('successfully', async () => {
      await element(by.text('NGN')).tap();
      const allCurrency = element(by.id('select-currency-ALL'));
      expect(allCurrency).toBeVisible();
      await allCurrency.tap();
      await expect(element(by.text('ALL'))).toBeVisible();
      await expect(element(by.id('select-currency-ALL'))).not.toExist();
    });

    it('updates destination amount', async () => {
      await element(by.text('NGN')).tap();
      const allCurrency = element(by.id('select-currency-ALL'));
      expect(allCurrency).toBeVisible();
      await allCurrency.tap();
      await expect(element(by.id('input-USD'))).toHaveText('12.30');
      await expect(element(by.id('input-NGN'))).not.toExist();
    });
  });

  it('changing destination re-calculates', async () => {
    await element(by.text('USD')).tap();
    const allCurrency = element(by.id('select-currency-ALL'));
    expect(allCurrency).toBeVisible();
    await allCurrency.tap();
    await expect(element(by.id('input-ALL'))).toHaveText('32.22');
    await expect(element(by.id('input-USD'))).not.toExist();
  });

  it('allows switch between current base and destination', async () => {
    await expect(element(by.text('NGN'))).toBeVisible();
    await expect(element(by.text('USD'))).toBeVisible();
    await expect(element(by.id('input-NGN'))).toHaveText('100');
    await expect(element(by.id('input-USD'))).toHaveText('0.23');

    await element(by.id('switch-base-destination')).tap();

    await expect(element(by.id('input-USD'))).toHaveText('100');
    await expect(element(by.id('input-NGN'))).toHaveText('23,000.00');
  });
});
