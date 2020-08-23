import { Controller, Post, Body } from '@nestjs/common';

import { CreatePianoUserDto } from 'src/dto/dto.user.piano';
import { validate } from 'class-validator';
import { UserPianoService } from './user.piano.service';

@Controller()
export class UserPianoController {
  constructor(private pUserService: UserPianoService) {}

  @Post('/puser')
  async newPUser(@Body() pUserDto: CreatePianoUserDto): Promise<void> {
    let errors = await validate(pUserDto, { forbidUnknownValues: true });
    errors.length > 0
      ? console.log('validation failed. errors: ', errors)
      : await this.pUserService.createNew(pUserDto);
  }
}
