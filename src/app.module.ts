import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { DBModule } from './db/db.module';

@Module({
  imports: [UserModule, DBModule],
})
export class AppModule {}
