import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';

import { UserPianoSessionService } from './user.piano.session.service';

import { CreatePianoUserSessionDto } from 'src/dto/dto.user.piano.session';

import { validateToken } from 'src/helper/validateHelper';

@Controller()
export class UserPianoSessionController {
  constructor(private pusService: UserPianoSessionService) {}

  @Post('/puser/session')
  async login(@Body() pusDto: CreatePianoUserSessionDto): Promise<string> {
    let errors = await validate(pusDto);
    if (errors.length > 0) console.log('Validation failed. errors: ', errors);

    return await this.pusService.authenticate(pusDto);
  }

  @Delete('/puser/session/:token')
  async logout(@Param('token') token: string): Promise<void> {
    if (!validateToken(token))
      throw new BadRequestException('incorrect format for token');

    await this.pusService.deauthenticate(token);
  }
}
