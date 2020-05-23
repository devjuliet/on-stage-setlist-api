import { Injectable, Inject } from '@nestjs/common';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Genre } from '../../models/genres.entity';
import { Tag } from '../../models/tags.entity';

@Injectable()
export class CatalogsService {
  constructor(
    @Inject('GenreRepository')
    private readonly genreRepository: typeof Genre,
    @Inject('TagRepository')
    private readonly tagRepository: typeof Tag,
  ) {}

  async getAllGenres(): Promise<ServerMessages> {
    try {
      const response = await this.genreRepository.findAll();

      return new ServerMessages(false, 'Sucess', response);
    } catch (error) {
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }

  async getAllTags(): Promise<ServerMessages> {
    try {
      const response = await this.tagRepository.findAll();

      return new ServerMessages(false, 'Tags', response);
    } catch (error) {
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}
