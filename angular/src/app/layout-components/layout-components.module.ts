import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SearchBarComponent} from "./search-bar/search-bar.component";
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import { OneTimePopupComponent } from './one-time-popup/one-time-popup.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SearchBarComponent,
        OneTimePopupComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        SearchBarComponent,
        OneTimePopupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RoutingModule,
        SharedModule,
        InlineSVGModule
    ],
})
export class LayoutComponentsModule {
    static forRoot() {
        return {
            ngModule: LayoutComponentsModule,
            providers: [WordpressPagesService]
        };
    }
}
