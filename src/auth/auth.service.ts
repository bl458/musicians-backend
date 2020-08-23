import { Injectable } from '@nestjs/common';
import { randomBytes, createHash } from 'crypto';
import { hash, compare } from 'bcrypt';

const HASH_ROUNDS = 10;
const TOKEN_BYTES = 256;

@Injectable()
export class AuthService {
  //Generate new token
  generate(): Promise<string> {
    return new Promise((resolve, reject) =>
      randomBytes(TOKEN_BYTES, (err, buff) => {
        err ? reject(err) : resolve(buff.toString('hex'));
      }),
    );
  }

  //Hash rawPw
  hashPw(rawPw: string): Promise<string> {
    return new Promise((resolve, reject) =>
      hash(
        createHash('sha256')
          .update(rawPw)
          .digest('base64'),
        HASH_ROUNDS,
        (err, encrypted) => {
          err ? reject(err) : resolve(encrypted);
        },
      ),
    );
  }

  //Compare inputted pw and hashedPw in db for authentication
  comparePw(inputPw: string, hashedPw: string): Promise<boolean> {
    return compare(
      createHash('sha256')
        .update(inputPw)
        .digest('base64'),
      hashedPw,
    );
  }
}
