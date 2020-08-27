import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { DBConnService } from 'src/db/db.conn.service';

import { PianoUserSession } from 'src/db/entity/PianoUserSession';

import { validateToken } from 'src/helper/validateHelper';

// Token expiry : 30 min.
const TOKEN_EXPIRY = 1000 * 60 * 30;

@Injectable()
export class UserPianoGuard implements CanActivate {
  constructor(private conn: DBConnService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let token = context
      .switchToHttp()
      .getRequest()
      .header('api-token');

    if (!validateToken(token)) return false;

    return await this.conn.getConn().transaction(async mgr => {
      let puSession = await mgr.findOne(PianoUserSession, { token });
      if (!puSession) return false;

      console.log(puSession.pUser);

      context.switchToHttp().getRequest().session = puSession; //Create custom decorator @Session

      let tokenAge = new Date().getTime() - puSession.createdAt.getTime();

      return tokenAge < TOKEN_EXPIRY;
    });
  }
}
