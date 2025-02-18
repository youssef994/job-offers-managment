import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCandidateComponent } from './candidate-update.component';

describe('CandidateUpdateComponent', () => {
  let component: UpdateCandidateComponent;
  let fixture: ComponentFixture<UpdateCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCandidateComponent]
    });
    fixture = TestBed.createComponent(UpdateCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
