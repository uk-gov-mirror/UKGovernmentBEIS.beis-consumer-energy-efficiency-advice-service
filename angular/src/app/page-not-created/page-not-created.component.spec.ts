import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotCreatedComponent } from './page-not-created.component';
import {PageTitleService} from "../shared/page-title-service/page-title.service";

describe('PageNotCreatedComponent', () => {
  let component: PageNotCreatedComponent;
  let fixture: ComponentFixture<PageNotCreatedComponent>;

  const pageTitleStub = {
    set: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotCreatedComponent ],
      providers: [{provide: PageTitleService, useValue: pageTitleStub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
