import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

import { UserPianoController } from './piano/user.piano.controller';
import { UserPianoSessionController } from './piano/user.piano.session.controller';
import { UserPianoService } from './piano/user.piano.service';
import { UserPianoSessionService } from './piano/user.piano.session.service';

@Module({
  imports: [AuthModule],
  providers: [UserPianoService, UserPianoSessionService],
  controllers: [UserPianoController, UserPianoSessionController],
})
export class UserModule {}
