import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DBConnService {
  constructor(private conn: Connection) {}

  public getConn(): Connection {
    return this.conn;
  }

  public async closeConn(): Promise<void> {
    await this.conn.close();
  }
}
