### DETOX + EXPO
https://docs.expo.dev/build-reference/e2e-tests/

### Mocking
1. Start a Metro Bunder with `EX_APP_MODE=mocked`

`EX_APP_MODE=mocked path-to-project/node_modules/react-native/scripts/launchPackager.command`

2. run e2e

`yarn detox jest -c ios.sim.debug`

Sample: core/api/client/exchange.host/api.mock.ts
