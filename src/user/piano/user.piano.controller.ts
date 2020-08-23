import { Controller, Post, Body, BadRequestException } from '@nestjs/common';

import { CreatePianoUserDto } from 'src/dto/dto.user.piano';
import { validate, ValidationError } from 'class-validator';
import { UserPianoService } from './user.piano.service';

@Controller()
export class UserPianoController {
  constructor(private pUserService: UserPianoService) {}

  @Post('/puser')
  async newPUser(@Body() pUserDto: CreatePianoUserDto): Promise<void> {
    let errors = await validate(pUserDto);
    if (errors.length > 0) {
      console.log('Validation failed. errors: ', errors);
      throw new BadRequestException();
    }
    await this.pUserService.createNew(pUserDto);
  }
}
