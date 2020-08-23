import { Injectable, ConflictException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DBConnService } from 'src/db/db.conn.service';
import { CreatePianoUserDto } from 'src/dto/dto.user.piano';
import { PianoUser } from 'src/db/entity/PianoUser';
import { QueryFailedError } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserPianoService {
  constructor(private auth: AuthService, private conn: DBConnService) {}

  //Create new piano user, stores to db
  async createNew(pUserDto: CreatePianoUserDto): Promise<void> {
    await this.conn.getConn().transaction(async mgr => {
      pUserDto.pw = await this.auth.hashPw(pUserDto.pw);
      const pUser = plainToClass(PianoUser, pUserDto);

      try {
        await mgr.save(pUser);
        console.log(pUser);
      } catch (err) {
        if (err instanceof QueryFailedError)
          throw new ConflictException('Piano user email already exists');

        throw err;
      }
    });
  }
}
