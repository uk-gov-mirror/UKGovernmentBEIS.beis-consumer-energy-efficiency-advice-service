import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ArticleCardComponent} from './article-card.component';
import {Article} from './article';

describe('ArticleCardComponent', () => {
    let component: ArticleCardComponent;
    let fixture: ComponentFixture<ArticleCardComponent>;

    const article: Article = {
        title: 'Article title',
        summary: 'Article summary',
        iconClassName: ''
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ArticleCardComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleCardComponent);
        component = fixture.componentInstance;
        component.article = article;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the right title', () => {
        const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        expect(titleElement.innerText).toEqual(article.title);
    });

    it('should display the right summary', () => {
        const summaryElement = fixture.debugElement.query(By.css('.summary')).nativeElement;
        expect(summaryElement.innerText).toEqual(article.summary);
    });
});
