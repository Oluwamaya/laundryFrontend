import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodisplayLayoutComponent } from './nodisplay-layout.component';

describe('NodisplayLayoutComponent', () => {
  let component: NodisplayLayoutComponent;
  let fixture: ComponentFixture<NodisplayLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NodisplayLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodisplayLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
