import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {HomeAgeQuestionComponent} from './home-age-question.component';

describe('HomeAgeQuestionComponent', () => {
    let component: HomeAgeQuestionComponent;
    let fixture: ComponentFixture<HomeAgeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeAgeQuestionComponent ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeAgeQuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});