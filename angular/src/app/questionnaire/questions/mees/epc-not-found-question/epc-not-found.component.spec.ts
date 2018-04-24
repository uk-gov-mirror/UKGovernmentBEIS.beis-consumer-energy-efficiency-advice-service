import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {ResponseData} from '../../../../shared/response-data/response-data';
import {EpcNotFoundComponent} from './epc-not-found.component';

describe('EpcNotFoundComponent', () => {
    let component: EpcNotFoundComponent;
    let fixture: ComponentFixture<EpcNotFoundComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EpcNotFoundComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EpcNotFoundComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on continue', () => {
        // given

        // when
        const yes = fixture.debugElement.query(By.css('.continue-button'));
        yes.nativeElement.click();

        // then
        expect(component.response).toBe(true);
    });

    it('should notify of completion when clicking on continue', () => {
        // given

        // when
        const no = fixture.debugElement.query(By.css('.continue-button'));
        no.nativeElement.click();

        // then
        expect(component.complete.emit).toHaveBeenCalled();
    });
});
