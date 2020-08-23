import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';
import {hash} from 'bcrypt'

const HASH_ROUNDS = 10;
const TOKEN_BYTES = 256;

@Injectable()
export class AuthService {
  //Generate new token
  generate(): Promise<string> {
    return new Promise((resolve, reject) =>
      randomBytes(TOKEN_BYTES, (err, buff) => {
        if (err) reject(err)
        return resolve(buff.toString('hex'));
      }),
    );
  }

  //Hash rawPw
  hashPw(rawPw: string): Promise<String> {
    return new Promise((resolve,reject) => )
  }

  //Compare inputted pw and hashedPw in db for authentication
  compare(inputPw: string, hashedPw: string): Promise<Boolean> {
    return;
  }
}
