import { Injectable } from '@nestjs/common';

import { ExcelService } from '../excel/excel.service';
import { Member } from '../member/entities/member.entity';
import { CompareEventTransactionDTO } from './dto/compare-event-transaction-dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly excelService: ExcelService,
  ) {}

  createMany(transactions: Transaction[]): Promise<void> {
    return this.transactionRepository.createMany(transactions);
  }

  async uploadTransactionFile(
    groupId: string,
    transactionFile: Express.Multer.File,
    password: string,
  ): Promise<void> {
    const transactions: Transaction[] =
      await this.excelService.convertTransactionFileToTransactionArr(
        groupId,
        transactionFile,
        password,
      );
    await this.createMany(transactions);
  }

  async getTransactions(groupId: string) {
    return this.transactionRepository.getTransactions(groupId);
  }

  async getTransactionsByPeriod(
    groupId: string,
    startDate: Date,
    endDate: Date,
  ) {
    return this.transactionRepository.getTransactionsByPeriod(
      groupId,
      startDate,
      endDate,
    );
  }

  async getTransactionsByEvent(
    groupId: string,
    fee: number,
    startDate: Date,
    endDate: Date,
  ) {
    return this.transactionRepository.getTransactionsByEvent(
      groupId,
      fee,
      startDate,
      endDate,
    );
  }

  async compareEventTransactions(
    members: Member[],
    transactions: Transaction[],
  ) {
    const tName = new Set(transactions.map((t) => t.metadata.name));
    const compareList: CompareEventTransactionDTO[] = [];
    members.forEach((member) => {
      compareList.push({
        name: member.name,
        isPaid: tName.has(member.name),
      });
    });
    return compareList;
  }
}
