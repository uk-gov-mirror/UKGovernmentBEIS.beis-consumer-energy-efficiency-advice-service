import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {OwnershipStatusQuestionComponent} from "./ownership-status-question.component";
import {ResponseData} from "../../../../../shared/response-data/response-data";

describe('OwnershipStatusQuestionComponent', () => {
    let component: OwnershipStatusQuestionComponent;
    let fixture: ComponentFixture<OwnershipStatusQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OwnershipStatusQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OwnershipStatusQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when selecting an option', () => {
        // given

        // when
        fixture.debugElement.query(By.css('#tenant-option')).nativeElement.click();

        // then
        expect(component.response).toBe(false);
    });

    it('should notify of completion when selecting an option', () => {
        // given

        // when
        fixture.debugElement.query(By.css('#homeowner-option')).nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
