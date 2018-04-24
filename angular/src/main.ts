import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as log from 'loglevel';

import {AppModule} from './app/app.module';
import Config from './app/config';

if (Config().environment.indexOf("dev") === -1) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => log.error(err));
