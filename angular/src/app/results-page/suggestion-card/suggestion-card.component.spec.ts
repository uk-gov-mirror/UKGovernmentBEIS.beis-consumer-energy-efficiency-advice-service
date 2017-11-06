import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";

import {SuggestionCardComponent} from "./suggestion-card.component";
import {WordpressPage} from "../../shared/wordpress-pages-service/wordpress-page";

describe('SuggestionCardComponent', () => {
    let component: SuggestionCardComponent;
    let fixture: ComponentFixture<SuggestionCardComponent>;

    const page: WordpressPage = {
        title: 'Test page title',
        path: '/path-to-page'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SuggestionCardComponent],
            imports: [RouterTestingModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SuggestionCardComponent);
        component = fixture.componentInstance;
        component.page = page;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the page title', () => {
        const titleElement = fixture.debugElement.query(By.css('.heading'));
        expect(titleElement.nativeElement.innerText).toBe(page.title);
    });

    it('should link to the page', () => {
        const titleElement = fixture.debugElement.query(By.css('.suggestion-card'));
        expect(titleElement.nativeElement.href).toContain(page.path);
    });
});
