import { Controller, Get, Query } from '@nestjs/common';
import { ServerMessages } from '../../utils/serverMessages.util';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('')
  ///@UseGuards(AuthGuard())//
  async findMembersAndBandByName(@Query() name): Promise<ServerMessages> {
    return await this.searchService.findMembersAndBandByName(name);
  }
}
