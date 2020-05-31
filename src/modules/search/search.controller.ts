import { Controller, Get, Query } from '@nestjs/common';
import { ServerMessages } from '../../utils/serverMessages.util';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('')
  ///@UseGuards(AuthGuard())//
  async findMembersAndBandByName(@Query() search): Promise<ServerMessages> {
    return await this.searchService.findMembersAndBandByName(search);
  }

  @Get('username')
  ///@UseGuards(AuthGuard())//
  async findUserByUsername(@Query() search) : Promise<ServerMessages> {
    return await this.searchService.findUserByUsername(search);
  }

  @Get('get-band')
  ///@UseGuards(AuthGuard())//
  async findBandById(@Query() search): Promise<ServerMessages> {
    return await this.searchService.findBandById(search.bandId);
  }

  @Get('get-artist-profile')
  ///@UseGuards(AuthGuard())//
  async findUserProfileById(@Query() search): Promise<ServerMessages> {
    return await this.searchService.findUserProfileById(search.idUser);
  }
}
