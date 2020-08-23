import { Injectable, ConflictException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { DBConnService } from 'src/db/db.conn.service';
import { CreatePianoUserDto } from 'src/dto/dto.user.piano';
import { PianoUser } from 'src/db/entity/PianoUser';
import { validate } from 'class-validator';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class UserPianoService {
  constructor(private authService: AuthService, private conn: DBConnService) {}

  //Create new piano user, stores to db
  async createNew(pUserDto: CreatePianoUserDto): Promise<void> {
    let errors = await validate(pUserDto, { forbidUnknownValues: true });
    errors.length > 0
      ? console.log('validation failed. errors: ', errors)
      : console.log('validation succeed');

    await this.conn.getConn().transaction(async mgr => {
      const pUser = new PianoUser();
      pUser.email = pUserDto.email;
      pUser.pw = pUserDto.pw;
      pUser.firstName = pUserDto.firstName;
      pUser.lastName = pUserDto.lastName;

      try {
        await mgr.save(pUser);
      } catch (err) {
        if (err instanceof QueryFailedError)
          throw new ConflictException('company already exists');

        throw err;
      }
    });
  }
}
