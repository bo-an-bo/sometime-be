import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ExcelService } from '../excel/excel.service';
import { transactionProviders } from './transaction.providers';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    TransactionService,
    ...transactionProviders,
    TransactionRepository,
    ExcelService,
  ],
  exports: [TransactionService],
})
export class TransactionModule {}
