import { TestBed } from '@angular/core/testing';

import { FileDataService } from './FileDataService ';

describe('FileUploadService', () => {
  let service: FileDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
