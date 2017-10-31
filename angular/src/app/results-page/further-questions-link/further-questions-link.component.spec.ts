import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {FurtherQuestionsLinkComponent} from "./further-questions-link.component";

describe('FurtherQuestionsLinkComponent', () => {
    let component: FurtherQuestionsLinkComponent;
    let fixture: ComponentFixture<FurtherQuestionsLinkComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FurtherQuestionsLinkComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FurtherQuestionsLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
