import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

const HASH_ROUNDS = 10;
const TOKEN_BYTES = 256;

@Injectable()
export class AuthService {
  //Generate new token
  generate(): Promise<string> {
    return;
  }

  //Hash rawPw
  hashPw(rawPw: string): Promise<string> {
    return;
  }

  //Compare inputted pw and hashedPw in db for authentication
  compare(inputPw: string, hashedPw: string): Promise<boolean> {
    return;
  }
}
