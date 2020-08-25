import { Controller, Post, Body } from '@nestjs/common';
import { validate } from 'class-validator';

import { UserPianoService } from './user.piano.service';

import { CreatePianoUserDto } from 'src/dto/dto.user.piano';

@Controller()
export class UserPianoController {
  constructor(private puService: UserPianoService) {}

  @Post('/puser')
  async newPUser(@Body() pUserDto: CreatePianoUserDto): Promise<void> {
    let errors = await validate(pUserDto);
    errors.length > 0
      ? console.log('Validation failed. errors: ', errors)
      : await this.puService.createNew(pUserDto);
  }
}
