import { Test, TestingModule } from '@nestjs/testing';
import { LedController } from './led.controller';

describe('Led Controller', () => {
  let controller: LedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LedController],
    }).compile();

    controller = module.get<LedController>(LedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
