import { TestBed } from '@angular/core/testing';

import { DataBackupService } from './data-backup.service';

describe('DataBackupService', () => {
  let service: DataBackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataBackupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
