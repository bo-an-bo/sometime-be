import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserRepository],
})
export class UserModule {}
