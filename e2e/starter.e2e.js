
describe('Exchange', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should start with NGN', async () => {
    await expect(element(by.text('NGN'))).toBeVisible();
  });

  it('should start with USD', async () => {
    await expect(element(by.text('USD'))).toBeVisible();
  });
});
