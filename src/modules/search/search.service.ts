import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { User } from '../../models/users.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Op, Sequelize } from 'sequelize';

@Injectable()
export class SearchService {
  constructor(
    @Inject('BandRepository')
    private readonly bandRepository: typeof Band,
    @Inject('UserRepository')
    private readonly userRepository: typeof User,
  ) {}

  async findMembersAndBandByName(name): Promise<ServerMessages> {
    try {
      const members = await this.userRepository.findAll({
        where: {
          name: { [Op.like]: '%' + name.name + '%' },
          type: { [Op.eq]: 0 },
        },
      });
      const bands = await this.bandRepository.findAll({
        where: {
          name: { [Op.like]: '%' + name.name + '%' },
        },
      });

      const list: any = members;
      bands.forEach(element => list.push(element));

      return new ServerMessages(false, 'Sucess', list);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}