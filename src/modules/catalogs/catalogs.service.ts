import { Injectable, Inject } from '@nestjs/common';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Sequelize } from 'sequelize';
import { Genre } from '../../models/genres.entity';

@Injectable()
export class CatalogsService {
  constructor(
    @Inject('GenreRepository')
    private readonly genreRepository: typeof Genre,
  ) {}

  async getAllGenres(): Promise<ServerMessages> {
    try {
      const response = await this.genreRepository.findAll();

      return new ServerMessages(
        false,
        'Catalogo obtenido con exito.',
        response,
      );
    } catch (error) {
      return new ServerMessages(true, 'Catalogo obtenido con exito.', error);
    }
  }
}
