import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { DatabaseModule } from '../database/database.module';
import { memberProvider } from './member.provider';
import { MemberRepository } from './member.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [MemberService, ...memberProvider, MemberRepository],
})
export class MemberModule {}
