import { Injectable, BadRequestException } from '@nestjs/common';
import { PianoUser } from 'src/db/entity/PianoUser';
import { DBConnService } from 'src/db/db.conn.service';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';

@Injectable()
export class UserPianoFollowService {
  constructor(private conn: DBConnService) {}

  async followPUser(puSession: PianoUserSession, email: string): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      let userToFollow = await mgr.findOne(PianoUser, { email });
      if (!userToFollow)
        throw new BadRequestException('Cannot follow nonexistant user');

      puSession.pUser.following.forEach(item => {
        if (item.id === userToFollow.id)
          throw new BadRequestException('Already following this user');
      });

      await mgr.save(puSession.pUser);
    });
  }
}
