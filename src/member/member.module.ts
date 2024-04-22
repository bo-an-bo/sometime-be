import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ExcelService } from '../excel/excel.service';
import { GroupModule } from '../group/group.module';
import { MemberController } from './member.controller';
import { memberProvider } from './member.provider';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [MemberController],
  providers: [MemberService, ...memberProvider, MemberRepository, ExcelService],
})
export class MemberModule {}
