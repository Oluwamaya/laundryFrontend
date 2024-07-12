import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpaymentrequestComponent } from './viewpaymentrequest.component';

describe('ViewpaymentrequestComponent', () => {
  let component: ViewpaymentrequestComponent;
  let fixture: ComponentFixture<ViewpaymentrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewpaymentrequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewpaymentrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
