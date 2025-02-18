import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobGetComponent } from './job-get.component';

describe('JobGetComponent', () => {
  let component: JobGetComponent;
  let fixture: ComponentFixture<JobGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobGetComponent]
    });
    fixture = TestBed.createComponent(JobGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
