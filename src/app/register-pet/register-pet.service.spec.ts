import { TestBed } from '@angular/core/testing';

import { RegisterPetService } from './register-pet.service';

describe('RegisterPetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterPetService = TestBed.get(RegisterPetService);
    expect(service).toBeTruthy();
  });
});
