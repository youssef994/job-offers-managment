import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyGetComponent } from './company-get.component';

describe('CompanyGetComponent', () => {
  let component: CompanyGetComponent;
  let fixture: ComponentFixture<CompanyGetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyGetComponent]
    });
    fixture = TestBed.createComponent(CompanyGetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
