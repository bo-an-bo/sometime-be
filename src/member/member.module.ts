import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ExcelService } from '../excel/excel.service';
import { memberProviders } from './member.providers';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';

@Module({
  imports: [DatabaseModule],
  providers: [MemberService, ...memberProviders, MemberRepository, ExcelService],
  exports: [MemberService],
})
export class MemberModule {}
