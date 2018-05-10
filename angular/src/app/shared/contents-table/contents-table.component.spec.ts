import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {InlineSVGModule} from 'ng-inline-svg';

import { ContentsTableComponent } from './contents-table.component';

describe('ContentsTableComponent', () => {
  let component: ContentsTableComponent;
  let fixture: ComponentFixture<ContentsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [InlineSVGModule],
      declarations: [ ContentsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
