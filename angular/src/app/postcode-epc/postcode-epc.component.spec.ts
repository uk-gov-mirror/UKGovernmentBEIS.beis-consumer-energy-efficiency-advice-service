import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcodeEpcComponent } from './postcode-epc.component';

describe('PostcodeEpcComponent', () => {
  let component: PostcodeEpcComponent;
  let fixture: ComponentFixture<PostcodeEpcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcodeEpcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcodeEpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
