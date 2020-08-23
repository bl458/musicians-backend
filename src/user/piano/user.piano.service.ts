import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserPianoService {
  constructor(private authService: AuthService) {}

  //Create new piano user, stores to db
  async createNew(email: string, pw: string) {
    let newToken = await this.authService.generate();
  }
}
