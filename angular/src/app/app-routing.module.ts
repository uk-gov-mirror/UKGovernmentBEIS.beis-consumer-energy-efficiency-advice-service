import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from './page/page.component';
import {MeasurePageComponent} from './measure-page/measure-page.component';
import {HomePageComponent} from './home-page/home-page.component';
import {HomeImprovementsComponent} from './landing-page/home-improvements/home-improvements.component';
import {ReduceBillsComponent} from './landing-page/reduce-bills/reduce-bills.component';
import {WarmerHomeComponent} from './landing-page/warmer-home/warmer-home.component';
import {BoilerLandingPageComponent} from './boiler/landing-page/boiler-landing-page.component';
import {GrantsQuestionnaireComponent} from './grants/grants-questionnaire/grants-questionnaire.component';
import {EnergyEfficiencyQuestionnaireComponent} from './energy-efficiency/energy-efficiency-questionnaire/energy-efficiency-questionnaire.component';
import {BoilerEpcReplaceComponent} from './boiler/epc-replace/boiler-epc-replace.component';
import {GrantsLandingPageComponent} from './grants/landing-page/grants-landing-page.component';
import {EnergyEfficiencyResultsComponent} from './energy-efficiency/energy-efficiency-results/energy-efficiency-results.component';
import {BoilerQuestionnaireComponent} from './boiler/boiler-questionnaire/boiler-questionnaire.component';
import {BoilerResultsPageComponent} from './boiler/results-page/boiler-results-page.component';
import {BoilerResultsPageRouteGuard} from './boiler/results-page/boiler-results-page.guard';
import {BoilerReplacementPageComponent} from './boiler/replacement-page/boiler-replacement-page.component';
import {BoilerMakeModelReplaceComponent} from './boiler/make-model-replace/boiler-make-model-replace.component';
import {BoilerAdvicePageComponent} from './boiler/advice-page/boiler-advice-page.component';
import {YourPlanPageComponent} from './energy-efficiency/your-plan-page/your-plan-page.component';
import {GreenerHomeComponent} from './landing-page/greener-home/greener-home.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {ForbiddenPageComponent} from './shared/forbidden-page/forbidden-page.component';
import {YourHomeComponent} from './your-home/your-home.component';
import {MeesQuestionnaireComponent} from './mees/mees-questionnaire/mees-questionnaire.component';
import {MeesResultsPageComponent} from './mees/results-page/mees-results-page.component';
import {MeesExemptionPageComponent} from './mees/exemption-page/mees-exemption-page.component';
import {ECOSuppliersPageComponent} from './eco-suppliers-page/eco-suppliers-page.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PageNotCreatedComponent} from './page-not-created/page-not-created.component';
import {SimpleSavingsComponent} from './simple-savings/simple-savings.component';
import {TroubleshootingPageComponent} from "./boiler/troubleshooting-page/troubleshooting-page.component";
import {InstallerSearchComponent} from "./installer-search/installer-search.component";
import {GrantEligibilityQuestionnaireComponent} from "./grant-eligibility/grant-eligibility-questionnaire/grant-eligibility-questionnaire.component";
import {GrantEligibilityResultsPageComponent} from "./grant-eligibility/results-page/grant-eligibility-results-page.component";
import {GrantEligibilityResultsPageGuard} from "./grant-eligibility/results-page/grant-eligibility-results-page.guard";
import {SearchPageComponent} from "./search-page/search-page.component";
import {ECOSelfReferralStartPageComponent} from "./eco-self-referral/eco-self-referral-start-page/eco-self-referral-start-page.component";
import {ECOSelfReferralQuestionnaireComponent} from "./eco-self-referral/eco-self-referral-questionnaire/eco-self-referral-questionnaire.component";
import {ECOSelfReferralDonePageComponent} from "./eco-self-referral/eco-self-referral-done-page/eco-self-referral-done-page.component";
import {ECOSelfReferralDonePageGuard} from "./eco-self-referral/eco-self-referral-done-page/eco-self-referral-done-page.guard";
import {ECOSelfReferralConsentGuard} from "./eco-self-referral/eco-self-referral-consent.guard";

/**
 * This const defines the URL routes for the Angular application.
 *
 * The site is a SPA with HTML5 routing, which means that the HTTP server
 * returns the index page content for all routes which could be pages.
 * The index page loads the Angular javascript app (this app), and the
 * javascript then displays the correct page, calling the /api endpoints
 * if necessary to get dynamic content.
 *
 * While the static assets (js files, images, etc.) and the JSON API are
 * hosted on the same server as the landing page, the server-side code
 * needs to be able to distinguish between requests which look like pages
 * (i.e. which should be served the index content) and requests which are
 * for assets or the API.
 *
 * To this end, ALL routes that you add here need to be added to the
 * `RequestMapping` annotation on the IndexController in the Java codebase.
 *
 * (The Java unit test, IndexControllerTest, checks that Java and Angular agree.)
 *
 * (If we remove any routes from here in future, it might be best to leave
 * them in the Java mapping, so that visitors get an Angular 404, rather than
 * a Java 404.)
 */
const routes: Routes = [
    {
        path: '',
        component: HomePageComponent,
        pathMatch: 'full'
    },
    {
        path: 'energy-efficiency/questionnaire/:name',
        component: EnergyEfficiencyQuestionnaireComponent,
    },
    {
        path: 'energy-efficiency/results',
        component: EnergyEfficiencyResultsComponent,
    },
    {
        path: 'energy-efficiency/your-plan',
        component: YourPlanPageComponent,
    },
    {
        path: 'grants',
        component: GrantsLandingPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'grants/questionnaire',
        component: GrantsQuestionnaireComponent,
        pathMatch: 'full'
    },
    {
        path: 'grant-eligibility/questionnaire',
        component: GrantEligibilityQuestionnaireComponent,
        pathMatch: 'full'
    },
    {
        path: 'grant-eligibility/results',
        component: GrantEligibilityResultsPageComponent,
        canActivate: [GrantEligibilityResultsPageGuard]
    },
    {
        path: 'eco-self-referral/start',
        component: ECOSelfReferralStartPageComponent,
        pathMatch: 'full',
        canActivate: [ECOSelfReferralConsentGuard]
    },
    {
        path: 'eco-self-referral/questionnaire',
        component: ECOSelfReferralQuestionnaireComponent,
        pathMatch: 'full',
        canActivate: [ECOSelfReferralConsentGuard]
    },
    {
        path: 'eco-self-referral/done',
        component: ECOSelfReferralDonePageComponent,
        pathMatch: 'full',
        canActivate: [ECOSelfReferralConsentGuard, ECOSelfReferralDonePageGuard]
    },
    {
        path: 'about-this-site',
        component: PageNotCreatedComponent,
        pathMatch: 'full'
    },
    {
        path: 'energy-efficiency/greener-home',
        component: GreenerHomeComponent
    },
    {
        path: 'energy-efficiency/home-improvements',
        component: HomeImprovementsComponent
    },
    {
        path: 'energy-efficiency/reduce-bills',
        component: ReduceBillsComponent
    },
    {
        path: 'energy-efficiency/warmer-home',
        component: WarmerHomeComponent
    },
    {
        path: 'boiler',
        component: BoilerLandingPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'boiler/troubleshooting',
        component: TroubleshootingPageComponent,
    },
    {
        path: 'boiler/advice/:slug',
        component: BoilerAdvicePageComponent
    },
    {
        path: 'boiler/replace',
        component: BoilerReplacementPageComponent,
    },
    {
        path: 'boiler/epc-replace/:lmkKey',
        component: BoilerEpcReplaceComponent
    },
    {
        path: 'boiler/make-model-replace/:productIndexNumber',
        component: BoilerMakeModelReplaceComponent,
    },
    {
        path: 'boiler/questionnaire',
        component: BoilerQuestionnaireComponent
    },
    {
        path: 'boiler/results',
        component: BoilerResultsPageComponent,
        canActivate: [BoilerResultsPageRouteGuard]
    },
    {
        path: 'landlord-obligations',
        component: PageNotCreatedComponent,
        pathMatch: 'full'
    },
    {
        path: 'certified-repairers',
        component: PageNotCreatedComponent,
        pathMatch: 'full'
    },
    {
        path: 'minimum-energy-efficiency-standards/questionnaire',
        component: MeesQuestionnaireComponent,
    },
    {
        path: 'minimum-energy-efficiency-standards/results',
        component: MeesResultsPageComponent,
    },
    {
        path: 'minimum-energy-efficiency-standards/exemption',
        component: MeesExemptionPageComponent,
    },
    {
        path: 'page-not-created',
        component: PageNotCreatedComponent,
        pathMatch: 'full'
    },
    {
        path: 'admin',
        component: AdminPageComponent,
    },
    {
        path: 'forbidden',
        component: ForbiddenPageComponent
    },
    {
        path: 'eco-suppliers',
        component: ECOSuppliersPageComponent,
        pathMatch: 'full'
    },
    {
        path: 'installer-search',
        component: InstallerSearchComponent,
    },
    {
        path: 'installer-search/:measure-code',
        component: InstallerSearchComponent,
    },
    {
        path: 'installer-search/:measure-code/:postcode',
        component: InstallerSearchComponent,
    },
    {
        path: 'measures/:slug',
        component: MeasurePageComponent,
        pathMatch: 'full'
    },
    {
        path: 'your-home/:tag',
        component: YourHomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'simple-savings',
        component: SimpleSavingsComponent,
        pathMatch: 'full'
    },
    {
        path: 'pages/:slug',
        component: PageComponent,
        pathMatch: 'full'
    },
    {
        path: 'search',
        component: SearchPageComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class RoutingModule {
}
