import { registerApplication, start } from 'single-spa';

registerApplication({
  name: 'forecast1',
  app: () => import('./src/forecast1'),
  activeWhen: '/'
});

registerApplication({
  name: 'forecast2',
  app: () => import('./src/forecast2'),
  activeWhen: '/'
});

start();
