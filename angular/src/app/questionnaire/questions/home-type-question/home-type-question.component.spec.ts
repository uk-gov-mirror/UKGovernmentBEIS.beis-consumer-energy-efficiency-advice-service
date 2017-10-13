import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTypeQuestionComponent } from './home-type-question.component';
import {HomeType, HomeTypeQuestion} from "./home-type-question";

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
        component.question = new HomeTypeQuestion(() => undefined, () => {});
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
