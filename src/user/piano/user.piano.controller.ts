import { Controller, Post, Body } from '@nestjs/common';

import { CreatePianoUserDto } from 'src/dto/dto.user.piano';
import { validate } from 'class-validator';
import { UserPianoService } from './user.piano.service';

@Controller()
export class UserPianoController {
  constructor(private pUserService: UserPianoService) {}

  @Post('/pu')
  async newPUser(@Body() pUserDto: CreatePianoUserDto): Promise<void> {
    let errors = await validate(pUserDto);
    errors.length > 0
      ? console.log('Validation failed. errors: ', errors)
      : await this.pUserService.createNew(pUserDto);
  }
}
