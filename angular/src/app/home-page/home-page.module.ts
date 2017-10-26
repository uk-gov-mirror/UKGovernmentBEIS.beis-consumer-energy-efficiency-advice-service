import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HomePageComponent} from './home-page.component';
import {LatestNewsCardComponent} from './latest-news-card/latest-news-card.component';
import {CommonModule} from '../common/common.module';
import {RoutingModule} from '../app-routing.module';

@NgModule({
    declarations: [
        HomePageComponent,
        LatestNewsCardComponent
    ],
    exports: [
        HomePageComponent
    ],
    imports: [
        BrowserModule,
        CommonModule.forRoot(),
        RoutingModule
    ]
})
export class HomePageModule {
}