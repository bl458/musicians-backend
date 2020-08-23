import { Module, Global } from '@nestjs/common';
import { DBConnService } from './db.conn.service';
import { createConnection } from 'typeorm';

@Global()
@Module({
  providers: [
    {
      provide: DBConnService,
      useFactory: async () => new DBConnService(await createConnection()),
    },
  ],
  exports: [DBConnService],
})
export class DBModule {}
