import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

import {PageComponent} from "./page.component";
import {PageService} from "./page.service";
import "rxjs/add/operator/toPromise";
import {By} from "@angular/platform-browser";

describe('PageComponent', () => {
    let component: PageComponent;
    let fixture: ComponentFixture<PageComponent>;

    let expectedPage = {content: {rendered: 'test data!'}};
    let pageServiceStub = {
        getPage: () => Observable.of(expectedPage)
    };

    const routeParam = 'test-page';

    beforeEach(async(() => {
        spyOn(pageServiceStub, 'getPage').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [PageComponent],
            providers: [{
                provide: ActivatedRoute,
                useValue: {
                    paramMap: Observable.of({get: () => routeParam})
                }
            }]
        })
            .overrideComponent(PageComponent, {
                set: {
                    providers: [{provide: PageService, useValue: pageServiceStub}]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call the PageService with the route param', () => {
        expect(pageServiceStub.getPage).toHaveBeenCalledWith(routeParam);
    });

    it('should display the page content with data from the PageService', async () => {
        component.pageData.toPromise()
            .then(() => {
                let pageContent = fixture.debugElement.query(By.css('.page-component .content'));
                expect(pageContent.nativeElement.textContent).toBe(expectedPage.content.rendered);
            });
    })
});
