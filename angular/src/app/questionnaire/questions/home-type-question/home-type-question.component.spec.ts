import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTypeQuestionComponent } from './home-type-question.component';
import { HomeTypeQuestion } from './home-type-question';
import {ResponseData} from "../response-data";

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
        component.question = new HomeTypeQuestion(new ResponseData());
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
