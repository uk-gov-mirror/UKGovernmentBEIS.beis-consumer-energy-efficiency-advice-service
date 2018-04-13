import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallerSearchComponent } from './installer-search.component';

describe('InstallerSearchComponent', () => {
  let component: InstallerSearchComponent;
  let fixture: ComponentFixture<InstallerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallerSearchComponent ]
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
});
