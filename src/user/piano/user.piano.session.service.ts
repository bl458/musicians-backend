import { Injectable, BadRequestException } from '@nestjs/common';

import { AuthService } from 'src/auth/auth.service';
import { DBConnService } from 'src/db/db.conn.service';

import { PianoUser } from 'src/db/entity/PianoUser';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';

import { CreatePianoUserSessionDto } from 'src/dto/dto.user.piano.session';

@Injectable()
export class UserPianoSessionService {
  constructor(private conn: DBConnService, private auth: AuthService) {}

  async authenticate(pusDto: CreatePianoUserSessionDto): Promise<string> {
    let email = pusDto.email;
    let pw = pusDto.pw;

    return await this.conn.getConn().transaction(async mgr => {
      let pUser = await mgr.findOne(PianoUser, { email });
      if (!pUser) throw new BadRequestException('bad email');

      let isPwValid = await this.auth.comparePw(pw, pUser.pw);
      if (!isPwValid) throw new BadRequestException('bad pw');

      let token = await this.auth.generate();

      let pastSession = await mgr.findOne(PianoUserSession, { pUser });
      if (pastSession) await mgr.remove(pastSession);

      let pUSession = new PianoUserSession();
      pUSession.token = token;
      pUSession.pUser = pUser;

      console.log('Login: ', pUSession);

      await mgr.save(pUSession);

      return token;
    });
  }

  async deauthenticate(token: string): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      let pUserSession = await mgr.findOne(PianoUserSession, { token });
      if (!pUserSession) throw new BadRequestException('invalid token');
      await mgr.remove(pUserSession);
    });
  }
}
