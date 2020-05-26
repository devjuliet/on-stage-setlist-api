import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { User } from '../../models/users.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Op } from 'sequelize';

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const singerA = a.name.toUpperCase();
  const singerB = b.name.toUpperCase();
  console.log(singerA);

  let comparison = 0;
  if (singerA > singerB) {
    comparison = 1;
  } else if (singerA < singerB) {
    comparison = -1;
  }
  return comparison;
}
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
        order: [['name', 'ASC']],
        //raw: true,
      });
      const bands = await this.bandRepository.findAll({
        where: {
          name: { [Op.like]: '%' + name.name + '%' },
        },
        order: [['name', 'ASC']],

        //raw: true,
      });

      const list: any = members;
      bands.forEach(element => list.push(element));
      /*console.log(list);
      const obj = JSON.parse(list.toString());
      obj.sort(compare);
      const myList = JSON.stringify(obj);*/

      return new ServerMessages(false, 'Sucess', list);
    } catch (error) {
      console.log(error);
      return new ServerMessages(true, 'Error ocurred', error);
    }
  }
}
