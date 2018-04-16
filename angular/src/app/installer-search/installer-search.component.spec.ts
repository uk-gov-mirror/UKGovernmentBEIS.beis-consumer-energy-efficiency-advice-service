import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ActivatedRoute} from '@angular/router';
import {InstallerSearchComponent} from './installer-search.component';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {ResponseData} from "../shared/response-data/response-data";

describe('InstallerSearchComponent', () => {
    let component: InstallerSearchComponent;
    let fixture: ComponentFixture<InstallerSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InstallerSearchComponent],
            imports: [
                FormsModule,
            ],
            providers: [
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: ResponseData},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InstallerSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the value of postcode', () => {
        // given
        component.postcode = "NP3 3YO";

        // when
        fixture.detectChanges();

        // then
        const inputElement = fixture.debugElement.query(By.css('.text-container .postcode-input')).nativeElement;
        expect(inputElement.innerText).toEqual(component.postcode);
    });

    it('should display the value of the measure code', () => {
        // given
        component.measureCode = "A123";

        // when
        fixture.detectChanges();

        // then
        const inputElement = fixture.debugElement.query(By.css('.text-container .measure-code-input')).nativeElement;
        expect(inputElement.innerText).toEqual(component.measureCode);
    });

    class MockActivatedRoute {
    }
});
