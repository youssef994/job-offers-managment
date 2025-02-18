import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllBookingComponent } from './get-all-booking.component';

describe('GetAllBookingComponent', () => {
  let component: GetAllBookingComponent;
  let fixture: ComponentFixture<GetAllBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
