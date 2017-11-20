import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {NouisliderModule} from "ng2-nouislider";

import {GardenQuestionComponent} from "./garden-question.component";
import {ResponseData} from "../../../shared/response-data/response-data";
import {GardenAccessibility} from "./garden-accessibility";

describe('GardenQuestionComponent', () => {
    let component: GardenQuestionComponent;
    let fixture: ComponentFixture<GardenQuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GardenQuestionComponent],
            imports: [NouisliderModule],
            providers: [ResponseData],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GardenQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on an option', () => {
        // given
        let noGarden = fixture.debugElement.queryAll(By.css('.garden-button')).find(el => el.nativeElement.innerText === 'No garden');

        // when
        noGarden.nativeElement.click();

        // then
        expect(component.accessibility).toBe(GardenAccessibility.NoGarden);
    });

    it('should notify of completion when clicking on an option', () => {
        // given
        let noGarden = fixture.debugElement.queryAll(By.css('.garden-button')).find(el => el.nativeElement.innerText === 'No garden');

        // when
        noGarden.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
