import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { DBConnService } from 'src/db/db.conn.service';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';

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

    let isValid = await this.conn.getConn().transaction(async mgr => {
      let puSessionTemp = await mgr.findOne(PianoUserSession, { token });
      if (puSessionTemp) return true;
      return false;
    });

    return isValid;
  }
}
