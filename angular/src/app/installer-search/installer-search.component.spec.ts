import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {InstallerSearchComponent} from './installer-search.component';
import {ResponseData} from "../shared/response-data/response-data";
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {EnergySavingMeasureContentService} from "../shared/energy-saving-measure-content-service/energy-saving-measure-content.service";

describe('InstallerSearchComponent', () => {
    let component: InstallerSearchComponent;
    let fixture: ComponentFixture<InstallerSearchComponent>;

    let measureCode;

    beforeEach(async(() => {
        measureCode = null;

        TestBed.configureTestingModule({
            declarations: [InstallerSearchComponent],
            imports: [FormsModule],
            providers: [{provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: ResponseData, useClass: MockResponseData},
                {provide: EnergySavingMeasureContentService, useClass: MockMeasureContent}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InstallerSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        console.log(component);
        expect(component).toBeTruthy();
    });

    it('should display the value of postcode', () => {
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            const inputElement = fixture.debugElement.query(By.css('.postcode-input')).nativeElement;
            expect(inputElement.value).toEqual(component.postcode);
        });
    });

    it('should display the value of the measure code', () => {
        fixture.whenStable().then( () => {
            fixture.detectChanges();
            const inputElement = fixture.debugElement.query(By.css('.measure-code-input')).nativeElement;
            expect(inputElement.value).toEqual(component.measureName);
        });
    });

    class MockActivatedRoute {

        public params = Observable.of({
            "measure-code": "some measure code",
        });
    }

    class MockResponseData {
        public postcode = "some postcode";
    }

    class MockMeasureContent {
        public fetchMeasureDetails() {
            return Observable.of(); // fix this at some point
        }
    }
});
