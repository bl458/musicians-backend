import { Injectable } from '@nestjs/common';
import { DBConnService } from 'src/db/db.conn.service';

@Injectable()
export class UserPianoSessionService {
  constructor(private conn: DBConnService) {}

  async authenticate(): Promise<string> {
    return;
  }

  async deauthenticate(token: string): Promise<void> {
    return;
  }
}
