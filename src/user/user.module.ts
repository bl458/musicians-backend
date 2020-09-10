import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { UserPianoController } from './piano/user.piano.controller';
import { UserPianoSessionController } from './piano/user.piano.session.controller';
import { UserPianoPracticeController } from './piano/user.piano.practice.controller';

import { UserPianoService } from './piano/user.piano.service';
import { UserPianoSessionService } from './piano/user.piano.session.service';
import { UserPianoPracticeService } from './piano/user.piano.practice.service';
import { UserPianoFollowService } from './piano/user.piano.follow.service';
import { UserPianoFollowController } from './piano/user.piano.follow.controller';

@Module({
  imports: [AuthModule],
  providers: [
    UserPianoService,
    UserPianoSessionService,
    UserPianoPracticeService,
    UserPianoFollowService,
  ],
  controllers: [
    UserPianoController,
    UserPianoSessionController,
    UserPianoPracticeController,
    UserPianoFollowController,
  ],
})
export class UserModule {}
