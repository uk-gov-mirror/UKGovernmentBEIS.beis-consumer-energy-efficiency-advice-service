import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";

import {BoilerMeasuresSectionComponent} from "./boiler-measures-section.component";
import {RecommendationCardComponent} from "../../shared/recommendation-card/recommendation-card.component";

describe('BoilerMeasuresSectionComponent', () => {
    let component: BoilerMeasuresSectionComponent;
    let fixture: ComponentFixture<BoilerMeasuresSectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BoilerMeasuresSectionComponent,
                RecommendationCardComponent,
            ],
            imports: [
                RouterTestingModule,
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerMeasuresSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
