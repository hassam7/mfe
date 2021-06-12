import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
const mount = () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
};


// If we are in development and in isolation,
// call mount immediately
const isStandAlone = document.querySelector("app-root");
if (isStandAlone) {
  mount();
}

export { mount };
