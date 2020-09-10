import {
  Patch,
  Controller,
  UseGuards,
  Session,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { isEmail } from 'class-validator';

import { UserPianoGuard } from './user.piano.guard';
import { UserPianoFollowService } from './user.piano.follow.service';

import { PianoUserSession } from 'src/db/entity/PianoUserSession';

@UseGuards(UserPianoGuard)
@Controller()
export class UserPianoFollowController {
  constructor(private pufService: UserPianoFollowService) {}

  @Patch('puser/session/follow')
  async follow(
    @Session() puSession: PianoUserSession,
    @Body('email') email: string,
  ): Promise<void> {
    if (!isEmail(email)) throw new BadRequestException('Invalid follow email');

    if (puSession.pUser.email === email)
      throw new BadRequestException('Cannot follow oneself');

    await this.pufService.followPUser(puSession, email);
  }
}
