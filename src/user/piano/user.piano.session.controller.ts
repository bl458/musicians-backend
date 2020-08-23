import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { UserPianoSessionService } from './user.piano.session.service';
import { CreatePianoUserSessionDto } from 'src/dto/dto.user.piano.session';
import { validate } from 'class-validator';

@Controller()
export class UserPianoSessionController {
  constructor(private pusService: UserPianoSessionService) {}

  @Post('/puser/sessions')
  async login(@Body() pusDto: CreatePianoUserSessionDto): Promise<string> {
    let errors = await validate(pusDto);

    if (errors.length > 0) console.log('Validation failed. errors: ', errors);
    return;
  }

  @Delete('/puser/sessions/:token')
  async logout(@Param('token') token: string): Promise<void> {
    if (!token || token !== token.trim() || token.length !== 256)
      throw new BadRequestException('bad token format');

    await this.pusService.deauthenticate(token);
  }
}
