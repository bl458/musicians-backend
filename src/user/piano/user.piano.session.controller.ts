import { Controller, Post, Delete, Param } from '@nestjs/common';
import { UserPianoSessionService } from './user.piano.session.service';

@Controller()
export class UserPianoSessionController {
  constructor(private pSService: UserPianoSessionService) {}

  @Post('/puser/sessions')
  async login(): Promise<string> {
    return;
  }

  @Delete('/puser/sessions/:token')
  async logout(@Param('token') token: string): Promise<void> {
    return;
  }
}
