import {
  Controller,
  Patch,
  Body,
  Get,
  UseGuards,
  Session,
  UnauthorizedException,
} from '@nestjs/common';

import { UserPianoPracticeService } from './user.piano.practice.service';

import { UserPianoGuard } from './user.piano.guard';

import { Pracc } from 'src/db/entity/Pracc';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';

import { validateMSpeed } from 'src/helper/validateHelper';

@Controller()
@UseGuards(UserPianoGuard)
export class UserPianoPracticeController {
  constructor(private pupService: UserPianoPracticeService) {}

  // Is it ok for some backend requests to not be async?
  @Get('/pup')
  getPracc(@Session() puSession: PianoUserSession): Pracc {
    return this.pupService.fetchPraccObj(puSession);
  }

  @Patch('/pup/mspeed')
  async patchSpeed(
    @Session() puSession: PianoUserSession,
    @Body('metronome-speed') mspeed: number,
  ): Promise<void> {
    if (validateMSpeed(mspeed))
      throw new UnauthorizedException('invalid metronome speed');

    this.pupService.updateSpeed(puSession, mspeed);
  }
}
