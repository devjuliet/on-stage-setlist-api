import { Injectable, Inject } from '@nestjs/common';
import { Band } from '../../models/bands.entity';
import { LiveEvent } from '../../models/live-events.entity';
import { ServerMessages } from '../../utils/serverMessages.util';
import { Genre } from '../../models/genres.entity';
import { BandMember } from '../../models/band-members.entity';
import { Song } from '../../models/songs.entity';
import { User } from '../../models/users.entity';
import { Op } from 'sequelize';
import { BandGenre } from '../../models/band-genres.entity';
import { Set } from '../../models/sets.entity';
import { UserHistory } from '../../models/user-history.entity';
import { LiveDesigner } from '../../models/live-designers.entity';

@Injectable()
export class BandMembersService {
    constructor(
        @Inject('BandRepository')
        private readonly bandRepository: typeof Band,
        @Inject('LiveDesignerRepository')
        private readonly liveDesignerRepository: typeof LiveDesigner,
        @Inject('BandMemberRepository')
        private readonly bandMemberRepository: typeof BandMember,
        @Inject('LiveEventRepository')
        private readonly liveEventRepository: typeof LiveEvent,
        @Inject('BandGenreRepository')
        private readonly bandGenreRepository: typeof BandGenre,
        @Inject('UserRepository')
        private readonly userRepository: typeof User,
        @Inject('UserHistoryRepository')
        private readonly userHistoryRepository: typeof UserHistory,
        @Inject('SetRepository')
        private readonly setRepository: typeof Set,
        @Inject('SongRepository')
        private readonly songRepository: typeof Song,
    ) { }

    //find song by id, member and song belongs to same band id
    async findSongById(songId: number, userId): Promise<ServerMessages> {
        try {
            const song = await this.songRepository.findOne({
                where: { idSong: songId },
            });
            if (song == null) {
                return new ServerMessages(false, 'Song id ' + songId, {});
            }

            let bandId = song.idBand;
            console.log(bandId)
            const bandMember = await this.bandMemberRepository.findOne({
                where: {
                    idBand: bandId,
                    [Op.and]: [{ idUser: userId }],
                }
            });

            if (bandMember != null) {
                return new ServerMessages(false, 'Song id ' + songId, song);
            } else {
                return new ServerMessages(false, 'You dont belong to the band to see this song', {});
            }

        } catch (error) {
            return new ServerMessages(true, 'Error ocurred', error);
        }

    }


}
