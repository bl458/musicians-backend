import { Injectable, BadRequestException } from '@nestjs/common';
import { DBConnService } from 'src/db/db.conn.service';
import { CreatePianoUserSessionDto } from 'src/dto/dto.user.piano.session';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';
import { PianoUser } from 'src/db/entity/PianoUser';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserPianoSessionService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async authenticate(pusDto: CreatePianoUserSessionDto): Promise<string> {
    let email = pusDto.email;
    let pw = pusDto.pw;

    return await this.conn.getConn().transaction(async mgr => {
      let pUser = await mgr.findOne(PianoUser, { email: email });
      if (!pUser) throw new BadRequestException('bad email');

      let isPwValid = await this.auth.comparePw(pw, pUser.pw);
      if (!isPwValid) throw new BadRequestException('bad pw');

      let tken = await this.auth.generate();
      let pUSession = await mgr.findOne(PianoUserSession, { pUser: pUser });

      if (pUSession) pUSession.token = tken;
      else {
        pUSession = new PianoUserSession();
        pUSession.token = tken;
        pUSession.pUser = pUser;
      }

      return tken;
    });
  }

  async deauthenticate(token: string): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      let pUserSession = await mgr.findOne(PianoUserSession, { token: token });
      if (!pUserSession) throw new BadRequestException('invalid token');
      await mgr.remove(pUserSession);
    });
  }
}
