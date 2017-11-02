import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
import {Observable} from "rxjs/Observable";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./layout-components/header/header.component";
import {FooterComponent} from "./layout-components/footer/footer.component";
import {PageStateService} from "./shared/page-state-service/page-state.service";
import {ComponentFixture} from "@angular/core/testing";
import {NavigationBarComponent} from "./layout-components/navigation-bar/navigation-bar.component";
import {WordpressPagesService} from "./shared/wordpress-pages-service/wordpress-pages.service";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let app: AppComponent;

    const mockWordpressPagesService = {fetchTopLevelPages: () => Observable.create([])};

    const mockPageStateService = {
        showLoading: () => {
        },
        showGenericErrorAndLogMessage: () => {
        },
        showLoadingComplete: () => {
        }
    };

    beforeEach(async(() => {
        spyOn(mockWordpressPagesService, 'fetchTopLevelPages').and.callThrough();

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
                {provide: PageStateService, useValue: mockPageStateService}
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

    it('should fetch top level pages on loading', () => {
        // then
        expect(mockWordpressPagesService.fetchTopLevelPages).toHaveBeenCalled();
    });
});
