import { Controller, Patch, Body, Get, UseGuards } from '@nestjs/common';

import { UserPianoPracticeService } from './user.piano.practice.service';

import { UserPianoGuard } from './user.piano.guard';

import { Pracc } from 'src/db/entity/Pracc';

@Controller()
@UseGuards(UserPianoGuard)
export class UserPianoPracticeController {
  constructor(private pupService: UserPianoPracticeService) {}

  @Get('/pup')
  async getPracc(): Promise<Pracc> {
    return;
  }

  @Patch('/pup/mspeed')
  async patchSpeed(@Body('metronome-speed') mspeed: number): Promise<void> {
    return;
  }
}
