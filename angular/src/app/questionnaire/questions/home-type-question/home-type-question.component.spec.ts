import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTypeQuestionComponent } from './home-type-question.component';

describe('HomeTypeQuestionComponent', () => {
    let component: HomeTypeQuestionComponent;
    let fixture: ComponentFixture<HomeTypeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeTypeQuestionComponent ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeTypeQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
