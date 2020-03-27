import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {InlineSVGModule} from 'ng-inline-svg';

import {PageComponent} from './page.component';
import 'rxjs/add/operator/toPromise';
import {By} from '@angular/platform-browser';
import {SpinnerAndErrorContainerComponent} from '../shared/spinner-and-error-container/spinner-and-error-container.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Pipe, PipeTransform} from '@angular/core';
import {WordpressPagesService} from '../shared/wordpress-pages-service/wordpress-pages.service';
import {ContentsTableComponent} from "../shared/contents-table/contents-table.component";
import {PageTitleService} from "../shared/page-title-service/page-title.service";

describe('PageComponent', () => {
    let component: PageComponent;
    let fixture: ComponentFixture<PageComponent>;
    let injector: TestBed;
    let router: Router;

    const expectedPage = {
        title: 'test data!',
        content: 'test data!',
        coverImage: null,
        videoEmbed: null
    };
    const pageServiceStub = {
        getPage: () => Observable.of(expectedPage)
    };
    const pageTitleStub = {
        set: () => {}
    };

    const testSlug = 'test-page';

    @Pipe({
        name: 'safe'
    })
    class MockSafePipe implements PipeTransform {
        transform(html) {
            return html;
        }
    }

    class MockActivatedRoute {
        public snapshot = {
            paramMap: {get: MockActivatedRoute.paramMapGet}
        };

        public paramMap = Observable.of({
            get: MockActivatedRoute.paramMapGet
        });

        private static paramMapGet(key) {
            if (key === 'slug') {
                return testSlug;
            } else {
                throw new Error('Unexpected parameter name');
            }
        }
    }

    beforeEach(async(() => {
        spyOn(pageServiceStub, 'getPage').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                PageComponent,
                SpinnerAndErrorContainerComponent,
                ContentsTableComponent,
                MockSafePipe
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                InlineSVGModule,
            ],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: WordpressPagesService, useValue: pageServiceStub},
                {provide: PageTitleService, useValue: pageTitleStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        fixture = TestBed.createComponent(PageComponent);
        router = TestBed.get(Router);
        spyOn(router, 'navigate');
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the PageService with the route param', () => {
        // when
        fixture.detectChanges();

        // then
        expect(pageServiceStub.getPage).toHaveBeenCalledWith(testSlug);
    });

    it('should display the page content with data from the PageService', async(() => {
        // when
        fixture.detectChanges();

        // then
        fixture.whenStable()
            .then(() => {
                const pageContent = fixture.debugElement.query(By.css('.page-component .main-row .page-row-content'));
                expect(pageContent.nativeElement.textContent).toBe(expectedPage.content);
            });
    }));

    it('should show 404 if the page data is not found', async(() => {
        // given
        const injectedPageService = injector.get(WordpressPagesService);
        injectedPageService.getPage = () => Observable.of(null);

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable()
            .then(() => {
                expect(router.navigate).toHaveBeenCalledWith(['/404'], { skipLocationChange: true });
            });
    }));
});
