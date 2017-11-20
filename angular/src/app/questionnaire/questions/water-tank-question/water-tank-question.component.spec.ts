import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";

import {WaterTankQuestionComponent} from "./water-tank-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {WaterTankSpace} from "./water-tank-space";

describe('WaterTankQuestionComponent', () => {
    let component: WaterTankQuestionComponent;
    let fixture: ComponentFixture<WaterTankQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaterTankQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaterTankQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on an option', () => {
        // given
        let noSpace = fixture.debugElement.queryAll(By.css('.water-tank-button')).find(el => el.nativeElement.innerText === 'No space');

        // when
        noSpace.nativeElement.click();

        // then
        expect(component.response).toBe(WaterTankSpace.None);
    });

    it('should notify of completion when clicking on an option', () => {
        // given
        let noSpace = fixture.debugElement.queryAll(By.css('.water-tank-button')).find(el => el.nativeElement.innerText === 'No space');

        // when
        noSpace.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
