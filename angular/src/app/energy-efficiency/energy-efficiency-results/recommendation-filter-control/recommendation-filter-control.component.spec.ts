import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {RecommendationFilterControlComponent} from "./recommendation-filter-control.component";
import {EnergyEfficiencyRecommendationTag} from "../recommendation-tags/energy-efficiency-recommendation-tag";
import {keys} from "lodash-es";

describe('RecommendationFilterControlComponent', () => {
    let component: RecommendationFilterControlComponent;
    let fixture: ComponentFixture<RecommendationFilterControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                RecommendationFilterControlComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendationFilterControlComponent);
        component = fixture.componentInstance;
        spyOn(component.selectedTagsChange, 'emit').and.callThrough();
        component.selectedTags = EnergyEfficiencyRecommendationTag.None;
        fixture.detectChanges();
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should display a button for each possible tag', () => {
            // given
            // Typescript enum stores each property twice
            const numberOfTags = keys(EnergyEfficiencyRecommendationTag).length / 2;
            // Don't expect a button for the 'None' tag
            const expectedNumberOfButtons = numberOfTags - 1;

            // when
            const buttonElements = fixture.debugElement.queryAll(By.css('.tag'));

            // then
            expect(buttonElements.length).toEqual(expectedNumberOfButtons);
        });

        it('should display the correct buttons as selected', async(() => {
            // given
            component.selectedTags = EnergyEfficiencyRecommendationTag.LongerTerm
                | EnergyEfficiencyRecommendationTag.SmallSpend;

            // when
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                expect(fixture.debugElement.query(By.css('.tag-quick-win')).classes.selected).toBeFalsy();
                expect(fixture.debugElement.query(By.css('.tag-small-spend')).classes.selected).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.tag-longer-term')).classes.selected).toBeTruthy();
                expect(fixture.debugElement.query(By.css('.tag-grant')).classes.selected).toBeFalsy();
            });
        }));

        it('should display all buttons as selected when no filter is selected for neater UI', () => {
            // when
            const buttonElements = fixture.debugElement.queryAll(By.css('.tag'));

            // then
            buttonElements.forEach(button => {
                expect(button.classes.selected).toBeTruthy();
            });
        });

        it('should not display the clear-filters button when no filter is selected', () => {
            // when
            const clearFiltersButton = fixture.debugElement.query(By.css('.clear-filters'));

            // then
            expect(clearFiltersButton).toBeNull();
        });

        it('should display the clear-filters button when some filter is selected', async(() => {
            // given
            component.selectedTags = EnergyEfficiencyRecommendationTag.LongerTerm;

            // when
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const clearFiltersButton = fixture.debugElement.query(By.css('.clear-filters'));
                expect(clearFiltersButton).toBeTruthy();
            });
        }));
    });

    describe('#onTagClicked', () => {
        it('should select the clicked tag if no keys were held down during click', () => {
            // given
            component.selectedTags = EnergyEfficiencyRecommendationTag.LongerTerm;
            const grantsButton = fixture.debugElement.query(By.css('.tag-grant')).nativeElement;

            // when
            grantsButton.click();

            // when
            expect(component.selectedTags).toEqual(EnergyEfficiencyRecommendationTag.Grant);
            expect(component.selectedTagsChange.emit).toHaveBeenCalledWith(EnergyEfficiencyRecommendationTag.Grant);
        });

        it('should add the clicked tag to selection if Ctrl key was held down during click', () => {
            // given
            component.selectedTags = EnergyEfficiencyRecommendationTag.LongerTerm;
            const grantsButton = fixture.debugElement.query(By.css('.tag-grant')).nativeElement;

            // when
            grantsButton.dispatchEvent(new MouseEvent('click', {ctrlKey: true}));

            // when
            const expectedTags = EnergyEfficiencyRecommendationTag.Grant | EnergyEfficiencyRecommendationTag.LongerTerm;
            expect(component.selectedTags).toEqual(expectedTags);
            expect(component.selectedTagsChange.emit).toHaveBeenCalledWith(expectedTags);
        });
    });

    describe('#clearFilters', () => {
        it('should clear filters when button is pressed', async(() => {
            // given
            component.selectedTags = EnergyEfficiencyRecommendationTag.LongerTerm |
                EnergyEfficiencyRecommendationTag.Grant;
            fixture.detectChanges();

            // when
            fixture.whenStable().then(() => {
                const clearFiltersButton = fixture.debugElement.query(By.css('.clear-filters')).nativeElement;
                clearFiltersButton.click();

                // then
                expect(component.selectedTags).toEqual(EnergyEfficiencyRecommendationTag.None);
                expect(component.selectedTagsChange.emit).toHaveBeenCalledWith(EnergyEfficiencyRecommendationTag.None);

            });
        }));
    });
});