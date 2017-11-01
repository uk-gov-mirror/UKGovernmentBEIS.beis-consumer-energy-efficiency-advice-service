import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {ArticleCardComponent} from "./article-card.component";

describe('ArticleCardComponent', () => {
    let component: ArticleCardComponent;
    let fixture: ComponentFixture<ArticleCardComponent>;

    const title = 'Article title';
    const summary = 'Article summary';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ArticleCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleCardComponent);
        component = fixture.componentInstance;
        component.title = title;
        component.summary = summary;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the right title', () => {
        const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        expect(titleElement.innerText).toEqual(title);
    });

    it('should display the right summary', () => {
        const summaryElement = fixture.debugElement.query(By.css('.summary')).nativeElement;
        expect(summaryElement.innerText).toEqual(summary);
    });
});
