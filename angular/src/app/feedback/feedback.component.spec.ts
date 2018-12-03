import {FeedbackComponent} from "./feedback.component";
import {ComponentFixture, async, TestBed, getTestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpRequest} from "@angular/common/http";
import {FormsModule} from "@angular/forms";

describe('FeedbackComponent', () => {
    let httpMock: HttpTestingController;
    let injector: TestBed;
    let component: FeedbackComponent;
    let fixture: ComponentFixture<FeedbackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FeedbackComponent],
            imports: [FormsModule, HttpClientTestingModule],
            providers: []
        })
            .compileComponents();
    }));

    beforeEach(() => {
        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        fixture = TestBed.createComponent(FeedbackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be constructed', () => {
        // then
        expect(component).toBeTruthy();
    });

    it('should show information correctly when initialised', () => {
        // then
        expect(component.isSubmitting).toBe(false);
        expect(component.infoText).toEqual('');
    });

    it('should show information correctly when request is successful', () => {
        // given
        component.submit();

        // when
        const request = httpMock.expectOne(matchesExpectedRequest);
        request.flush({});

        // then
        expect(component.isSubmitting).toBe(false);
        expect(component.infoText).toEqual("Thanks for your feedback!");
    });

    it('should show information correctly when request has failed', () => {
        // given
        component.submit();

        // when
        const request = httpMock.expectOne(matchesExpectedRequest);
        request.error(new ErrorEvent('network error'));

        // then
        expect(component.isSubmitting).toBe(false);
        expect(component.infoText).toEqual("Sorry, there was an error when submitting the feedback.");
    });

    it('should show information correctly when request is pending', () => {
        // when
        component.submit();

        // then
        expect(component.isSubmitting).toBe(true);
        expect(component.infoText).toEqual('');
    });

    function matchesExpectedRequest(request: HttpRequest<any>): boolean {
        const matchesExpectedMethod = request.method === 'POST';
        const matchesExpectedUrl = request.url === '/api/feedback';
        return matchesExpectedMethod && matchesExpectedUrl;
    }
});
