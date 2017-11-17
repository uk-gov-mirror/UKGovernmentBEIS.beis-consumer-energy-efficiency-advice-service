import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./layout-components/header/header.component";
import {FooterComponent} from "./layout-components/footer/footer.component";
import {ComponentFixture} from "@angular/core/testing";
import {NavigationBarComponent} from "./layout-components/navigation-bar/navigation-bar.component";
import {WordpressPagesService} from "./shared/wordpress-pages-service/wordpress-pages.service";
import {GoogleAnalyticsService} from "./shared/analytics/google-analytics.service";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    const mockWordpressPagesService = {fetchTopLevelPages: () => Observable.of([])};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                FooterComponent,
                NavigationBarComponent
            ],
            imports: [RouterTestingModule, FormsModule],
            providers: [
                {provide: WordpressPagesService, useValue: mockWordpressPagesService},
                GoogleAnalyticsService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        expect(app).toBeTruthy();
    }));
});
