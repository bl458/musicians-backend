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
import { CreatePianoPatchSpeedDto } from 'src/dto/dto.user.piano.patch.speed';
import { validate } from 'class-validator';

@Controller()
@UseGuards(UserPianoGuard)
export class UserPianoPracticeController {
  constructor(private pupService: UserPianoPracticeService) {}

  // Is it ok for some backend requests to not be async?
  // Is nestjs/platform-express dependency or devdependency?
  // Why make migrations in both src and build?
  @Get('/pup')
  getPraccs(@Session() puSession: PianoUserSession): Pracc[] {
    return this.pupService.fetchPraccs(puSession);
  }

  @Patch('/pup/mspeed')
  async patchSpeed(
    @Session() puSession: PianoUserSession,
    @Body() patchSpeedDto: CreatePianoPatchSpeedDto,
  ): Promise<void> {
    let errors = await validate(patchSpeedDto);
    errors.length > 0
      ? console.log('Validation failed. errors: ', errors)
      : await this.pupService.updateSpeed(puSession, patchSpeedDto);
  }
}
