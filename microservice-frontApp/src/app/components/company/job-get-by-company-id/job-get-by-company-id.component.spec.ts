import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobGetByCompanyIdComponent } from './job-get-by-company-id.component';

describe('JobGetByCompanyIdComponent', () => {
  let component: JobGetByCompanyIdComponent;
  let fixture: ComponentFixture<JobGetByCompanyIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobGetByCompanyIdComponent]
    });
    fixture = TestBed.createComponent(JobGetByCompanyIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
