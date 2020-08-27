import { Injectable, BadRequestException } from '@nestjs/common';

import { Pracc } from 'src/db/entity/Pracc';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';
import { DBConnService } from 'src/db/db.conn.service';

import { CreatePianoPatchSpeedDto } from 'src/dto/dto.user.piano.patch.speed';

@Injectable()
export class UserPianoPracticeService {
  constructor(private conn: DBConnService) {}

  fetchPraccs(puSession: PianoUserSession): Pracc[] {
    console.log(puSession.pUser);
    return puSession.pUser.presentPraccs;
  }

  async updateSpeed(
    puSession: PianoUserSession,
    patchSpeedDto: CreatePianoPatchSpeedDto,
  ): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      let praccs = puSession.pUser.presentPraccs;
      let pracc: Pracc;

      for (const p of praccs) {
        if (p.id === patchSpeedDto.id) {
          pracc = p;
        }
      }

      if (!pracc) throw new BadRequestException('bad pracc id');

      pracc.mspeed = patchSpeedDto.mspeed;
      await mgr.save(pracc);
    });
  }
}
