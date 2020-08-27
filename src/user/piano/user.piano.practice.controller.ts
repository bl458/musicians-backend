import {
  Controller,
  Patch,
  Body,
  Get,
  UseGuards,
  Session,
} from '@nestjs/common';
import { validate } from 'class-validator';

import { UserPianoPracticeService } from './user.piano.practice.service';

import { UserPianoGuard } from './user.piano.guard';

import { Pracc } from 'src/db/entity/Pracc';
import { PianoUserSession } from 'src/db/entity/PianoUserSession';

import { CreatePianoPraccDto } from 'src/dto/dto.user.piano.pracc';

@Controller()
@UseGuards(UserPianoGuard)
export class UserPianoPracticeController {
  constructor(private pupService: UserPianoPracticeService) {}

  // Is it ok for some backend requests to not be async?
  // Is nestjs/platform-express dependency or devdependency?
  // Why make migrations in both src and build?
  // Why does token validation include trim?
  @Get('/pup')
  getPraccs(@Session() puSession: PianoUserSession): Pracc[] {
    return this.pupService.fetchPraccs(puSession);
  }

  @Patch('/pup/mspeed')
  async patchPracc(
    @Session() puSession: PianoUserSession,
    @Body() praccDto: CreatePianoPraccDto,
  ): Promise<void> {
    let errors = await validate([praccDto]);
    errors.length > 0
      ? console.log('Validation failed. errors: ', errors)
      : await this.pupService.updatePracc(puSession, praccDto);
  }
}
