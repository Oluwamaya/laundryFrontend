import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GSignupComponent } from './g-signup.component';

describe('GSignupComponent', () => {
  let component: GSignupComponent;
  let fixture: ComponentFixture<GSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
