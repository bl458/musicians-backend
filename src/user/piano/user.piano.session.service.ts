import { Injectable } from '@nestjs/common';
import { DBConnService } from 'src/db/db.conn.service';
import { CreatePianoUserSessionDto } from 'src/dto/dto.user.piano.session';

@Injectable()
export class UserPianoSessionService {
  constructor(private conn: DBConnService) {}

  async authenticate(pusDto: CreatePianoUserSessionDto): Promise<string> {
    return;
  }

  async deauthenticate(token: string): Promise<void> {
    return;
  }
}
