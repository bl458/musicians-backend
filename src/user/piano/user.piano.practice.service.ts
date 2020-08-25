import { Injectable } from '@nestjs/common';

import { Pracc } from 'src/db/entity/Pracc';

@Injectable()
export class UserPianoPracticeService {
  async fetchPraccObj(): Promise<Pracc> {
    return;
  }

  async updateSpeed(mspeed: number): Promise<void> {
    return;
  }
}
