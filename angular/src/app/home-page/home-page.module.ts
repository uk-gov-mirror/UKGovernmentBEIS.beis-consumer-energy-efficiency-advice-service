import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";

import {HomePageComponent} from './home-page.component';
import {LatestNewsCardComponent} from './latest-news-card/latest-news-card.component';
import {SharedModule} from '../common/shared.module';
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
        SharedModule,
        CommonModule,
        RoutingModule
    ]
})
export class HomePageModule {
}