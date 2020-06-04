import { Test, TestingModule } from '@nestjs/testing';
import { BandMembersController } from './band-members.controller';

describe('BandMembers Controller', () => {
  let controller: BandMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BandMembersController],
    }).compile();

    controller = module.get<BandMembersController>(BandMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
