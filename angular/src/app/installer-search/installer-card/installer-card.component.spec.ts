import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {InstallerCardComponent} from "./installer-card.component";
import {GoogleAnalyticsService} from "../../shared/analytics/google-analytics.service";

describe('InstallerCardComponent', () => {
    let component: InstallerCardComponent;
    let fixture: ComponentFixture<InstallerCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                InstallerCardComponent
            ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                GoogleAnalyticsService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InstallerCardComponent);
        component = fixture.componentInstance;
        component.installerInfo = {
            id: 1,
            registeredName: "Installer name",
            publicBranchUrl: "http://test.com",
            logoUrl: "http://test.com/logo",
            distanceInMiles: 1,
            town: "Town",
            latitude: 45,
            longitude: 45,
            phoneNumber: "1234",
            email: "installer@test.com"
        };
        // component.selectedInstallerId
        fixture.detectChanges();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    it('should display the installer logo', async(() => {
        // given
        const expectedLogoUrl = "http://test.com/logo";

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            const logoElement = fixture.debugElement.query(By.css('.installer-logo'));
            expect(logoElement.nativeElement.src).toBe(expectedLogoUrl);
        });
    }));

    it('should display the installer registered name', async(() => {
        // given
        const expectedRegisteredName = "Installer name";

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            const nameElement = fixture.debugElement.query(By.css('.name'));
            expect(nameElement.nativeElement.innerText).toBe(expectedRegisteredName);
        });
    }));

    it('should display the distance in miles', async(() => {
        // given
        const expectedDistanceInMiles = "1 miles";

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            const distanceElement = fixture.debugElement.query(By.css('.distance b'));
            expect(distanceElement.nativeElement.innerText).toBe(expectedDistanceInMiles);
        });
    }));

    it('should display the installer phone number', async(() => {
        // given
        const expectedPhoneNumber = "Tel: 1234";

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            const phoneNumberElement = fixture.debugElement.query(By.css('.phone'));
            expect(phoneNumberElement.nativeElement.innerText).toBe(expectedPhoneNumber);
        });
    }));

    it('should display the public branch url', async(() => {
        // given
        const expectedPublicBranchUrl = "http://test.com/";

        // when
        fixture.detectChanges();

        // then
        fixture.whenStable().then(() => {
            const detailsElement = fixture.debugElement.query(By.css('.details-button-arrow'));
            expect(detailsElement.nativeElement.href).toBe(expectedPublicBranchUrl);
        });
    }));
});
