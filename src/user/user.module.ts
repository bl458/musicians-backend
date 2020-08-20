import { Module } from '@nestjs/common';
import { UserPianoService } from './piano/user.piano.service';
import { UserPianoController } from './piano/user.piano.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [UserPianoService],
  controllers: [UserPianoController],
})
export class UserModule {}
