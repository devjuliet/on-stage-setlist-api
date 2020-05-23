import { Genre } from '../genres.entity';

//provide es el nombre del esquema para la tabla de usuarios
//useValue es la identidad que se usara para el esquema que es la que nos define la estructura de la tabla
export const genreProviders = [
  {
    provide: 'GenreRepository',
    useValue: Genre,
  },
];
