import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotCreatedComponent } from './page-not-created.component';

describe('PageNotCreatedComponent', () => {
  let component: PageNotCreatedComponent;
  let fixture: ComponentFixture<PageNotCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotCreatedComponent ]
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
