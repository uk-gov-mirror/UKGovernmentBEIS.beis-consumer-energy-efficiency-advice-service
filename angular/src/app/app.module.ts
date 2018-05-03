import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {InlineSVGModule} from 'ng-inline-svg';

import {AppComponent} from './app.component';
import {QuestionnaireModule} from './questionnaire/questionnaire.module';
import {SharedModule} from './shared/shared.module';
import {HomePageModule} from './home-page/home-page.module';
import {LandingPageModule} from './landing-page/landing-page.module';
import {LayoutComponentsModule} from './layout-components/layout-components.module';
import {PageModule} from './page/page.module';
import {MeasurePageModule} from './measure-page/measure-page.module';
import {BoilerModule} from './boiler/boiler.module';
import {GrantsModule} from './grants/grants.module';
import {EnergyEfficiencyModule} from './energy-efficiency/energy-efficiency.module';
import {AdminPageModule} from './admin-page/admin-page.module';
import {YourHomeModule} from './your-home/your-home.module';
import {MeesModule} from './mees/mees.module';
import {ECOSuppliersPageModule} from "./eco-suppliers-page/eco-suppliers-page.module";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PageNotCreatedComponent} from "./page-not-created/page-not-created.component";
import {SimpleSavingsModule} from './simple-savings/simple-savings.module';
import {InstallerSearchModule} from "./installer-search/installer-search.module";
import {ErrorBannerComponent} from './error-banner/error-banner.component';
import {HttpErrorInterceptor} from "./shared/http-error-interceptor";

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        PageNotCreatedComponent,
        ErrorBannerComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RoutingModule,
        FormsModule,
        SharedModule.forRoot(),
        QuestionnaireModule.forRoot(),
        EnergyEfficiencyModule.forRoot(),
        HomePageModule,
        GrantsModule.forRoot(),
        PageModule,
        MeasurePageModule,
        ECOSuppliersPageModule,
        AdminPageModule,
        LandingPageModule,
        LayoutComponentsModule.forRoot(),
        BoilerModule.forRoot(),
        InlineSVGModule,
        YourHomeModule,
        InstallerSearchModule,
        MeesModule.forRoot(),
        SimpleSavingsModule,
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true,
    }],
    bootstrap: [AppComponent],
})
export class AppModule {
}
