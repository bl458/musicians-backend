import { Injectable, BadRequestException } from '@nestjs/common';

import { DBConnService } from 'src/db/db.conn.service';

import { Pracc } from 'src/db/entity/Pracc';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';

import { CreatePianoPraccDto } from 'src/dto/dto.user.piano.pracc';
import { Piece } from 'src/db/entity/Piece';

@Injectable()
export class UserPianoPracticeService {
  constructor(private conn: DBConnService) {}

  fetchPraccs(puSession: PianoUserSession): Pracc[] {
    console.log(puSession.pUser);
    return puSession.pUser.presentPraccs;
  }

  async updatePracc(
    puSession: PianoUserSession,
    praccDto: CreatePianoPraccDto,
  ): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      let praccs = puSession.pUser.presentPraccs;

      for (let i = 0; i < praccs.length; i++) {
        if (praccs[i].praccPiece.name === praccDto.pieceName) {
          praccs[i].mspeed = praccDto.mspeed;
          return await mgr.save(praccs);
        }
      }

      let pracc = new Pracc();
      let newPiece = await mgr.findOne(Piece, { name: praccDto.pieceName });
      if (!newPiece) throw new BadRequestException('Piece name isnt in db');

      pracc.praccPiece = newPiece;
      pracc.praccPUser = puSession.pUser;
      pracc.mspeed = praccDto.mspeed;

      await mgr.save([...praccs, pracc]);
    });
  }
}
