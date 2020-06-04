import { Test, TestingModule } from '@nestjs/testing';
import { BandMembersService } from './band-members.service';

describe('BandMembersService', () => {
  let service: BandMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BandMembersService],
    }).compile();

    service = module.get<BandMembersService>(BandMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
