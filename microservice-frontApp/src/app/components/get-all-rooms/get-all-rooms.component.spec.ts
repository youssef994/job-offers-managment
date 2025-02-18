import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAllRoomsComponent } from './get-all-rooms.component';

describe('GetAllRoomsComponent', () => {
  let component: GetAllRoomsComponent;
  let fixture: ComponentFixture<GetAllRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
