import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { DatabaseModule } from '../database/database.module';
import { memberProvider } from './member.provider';
import { MemberRepository } from './member.repository';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [MemberController],
  providers: [MemberService, ...memberProvider, MemberRepository],
})
export class MemberModule {}
