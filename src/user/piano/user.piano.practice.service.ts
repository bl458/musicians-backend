import { Injectable } from '@nestjs/common';

import { Pracc } from 'src/db/entity/Pracc';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';
import { DBConnService } from 'src/db/db.conn.service';

@Injectable()
export class UserPianoPracticeService {
  constructor(private conn: DBConnService) {}

  fetchPraccObj(puSession: PianoUserSession): Pracc {
    console.log(puSession.pUser);
    return puSession.pUser.presentPracc;
  }

  async updateSpeed(
    puSession: PianoUserSession,
    mspeed: number,
  ): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      let pracc = puSession.pUser.presentPracc;
      pracc.mspeed = mspeed;
      await mgr.save(pracc);
    });
  }
}
