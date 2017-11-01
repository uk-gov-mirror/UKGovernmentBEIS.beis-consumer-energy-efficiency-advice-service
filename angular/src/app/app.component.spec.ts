import {async, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {FormsModule} from '@angular/forms';
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./common/header/header.component";
import {FooterComponent} from "./common/footer/footer.component";
import {WordpressPagesService} from "./common/header/wordpress-pages-service/wordpress-pages.service";

describe('AppComponent', () => {

    const mockWordpressPagesService = {searchPages: (searchString) => []};

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HeaderComponent,
                FooterComponent
            ],
            imports: [RouterTestingModule, FormsModule],
            providers: [{provide: WordpressPagesService, useValue: mockWordpressPagesService}]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
