import { Module } from '@nestjs/common';
import { BandMembersController } from './band-members.controller';
import { BandMembersService } from './band-members.service';

@Module({
  controllers: [BandMembersController],
  providers: [BandMembersService]
})
export class BandMembersModule {}
