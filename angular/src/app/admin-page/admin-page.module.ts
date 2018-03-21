import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RoutingModule} from '../app-routing.module';
import {AdminPageComponent} from "./admin-page.component";
import {FormsModule}   from '@angular/forms';
import {AdminPageGuard} from "./admin-page.guard";

@NgModule({
    declarations: [
        AdminPageComponent,
    ],
    exports: [
        AdminPageComponent
    ],
    imports: [
        SharedModule,
        CommonModule,
        RoutingModule,
        FormsModule
    ],
    providers: [
        AdminPageGuard
    ]
})
export class AdminPageModule {
}
