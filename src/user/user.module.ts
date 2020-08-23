import { Module } from '@nestjs/common';
import { UserPianoService } from './piano/user.piano.service';
import { UserPianoController } from './piano/user.piano.controller';
import { AuthModule } from '../auth/auth.module';
import { UserPianoSessionService } from './piano/user.piano.session.service';
import { UserPianoSessionController } from './piano/user.piano.session.controller';

@Module({
  imports: [AuthModule],
  providers: [UserPianoService, UserPianoSessionService],
  controllers: [UserPianoController, UserPianoSessionController],
})
export class UserModule {}
