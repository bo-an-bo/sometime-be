import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { DatabaseModule } from '../database/database.module';
import { memberProvider } from './member.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [MemberService, ...memberProvider],
})
export class MemberModule {}
