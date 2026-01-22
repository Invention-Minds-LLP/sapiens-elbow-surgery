import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBackForm } from './call-back-form';

describe('CallBackForm', () => {
  let component: CallBackForm;
  let fixture: ComponentFixture<CallBackForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CallBackForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBackForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
