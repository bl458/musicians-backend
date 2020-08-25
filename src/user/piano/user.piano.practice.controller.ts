import { Controller, Patch, Body, Get } from '@nestjs/common';

import { UserPianoPracticeService } from './user.piano.practice.service';

import { Pracc } from 'src/db/entity/Pracc';

@Controller()
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
