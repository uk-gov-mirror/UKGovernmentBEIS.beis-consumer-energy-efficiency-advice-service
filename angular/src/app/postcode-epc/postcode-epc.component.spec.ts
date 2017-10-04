import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostcodeEpcComponent} from './postcode-epc.component';
import {FormsModule} from "@angular/forms";
import {PostcodeEpcService} from "./postcode-epc.service";

describe('PostcodeEpcComponent', () => {
  let component: PostcodeEpcComponent;
  let fixture: ComponentFixture<PostcodeEpcComponent>;

  let serviceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostcodeEpcComponent],
      imports: [FormsModule]
    }).overrideComponent(PostcodeEpcComponent, {
      set: {
        providers: [{provide: PostcodeEpcService, useValue: serviceStub}]
      }
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
