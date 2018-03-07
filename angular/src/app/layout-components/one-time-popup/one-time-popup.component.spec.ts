import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CookieService} from 'ng2-cookies';
import {OneTimePopupComponent} from './one-time-popup.component';
import {PopupComponent} from '../../shared/popup/popup.component';

describe('OneTimePopupComponent', () => {
  let component: OneTimePopupComponent;
  let fixture: ComponentFixture<OneTimePopupComponent>;

  const mockCookieService = {
    check: () => {},
    set: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OneTimePopupComponent,
        PopupComponent,
      ],
      providers: [
        {provide: CookieService, useValue: mockCookieService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
