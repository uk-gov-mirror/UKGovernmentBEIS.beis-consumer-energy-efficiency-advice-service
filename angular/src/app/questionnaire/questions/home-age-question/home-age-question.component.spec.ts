import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {HomeAgeQuestionComponent} from './home-age-question.component';
import {ResponseData} from '../../../shared/response-data/response-data';
import {HomeAge} from './home-age';

describe('HomeAgeQuestionComponent', () => {
    let component: HomeAgeQuestionComponent;
    let fixture: ComponentFixture<HomeAgeQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomeAgeQuestionComponent],
            providers: [ResponseData],
            imports: [FormsModule]
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
