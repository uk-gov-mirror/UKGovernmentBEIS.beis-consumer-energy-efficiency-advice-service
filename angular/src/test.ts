// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SVGCacheService} from 'ng-inline-svg';
// Common rxjs operators
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/defer';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare const __karma__: any;
declare const require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function () {
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    [
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
    ],
    platformBrowserDynamicTesting()
);

// This global config is set in app.component.ts during normal operation
SVGCacheService.prototype.setBaseUrl({baseUrl: '/dist/assets/images/'});

// Then we find all the tests.
const context = require.context('./', true, /epc-lookup\.component\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();
