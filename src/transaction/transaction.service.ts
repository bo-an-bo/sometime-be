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

  async uploadTransactionFile(
    groupId: string,
    transactionFile: Express.Multer.File,
    password: string,
  ): Promise<void> {
    await this.transactionRepository.deleteMany(groupId);
    const transactions: Transaction[] =
      await this.excelService.convertTransactionFileToTransactionArr(
        groupId,
        transactionFile,
        password,
      );
    await this.transactionRepository.createMany(transactions);
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

  async compareEventTransactions(
    members: Member[],
    transactions: Transaction[],
  ) {
    // 멤버 이름과 거래내역 이름 비교
    const tName = new Set(transactions.map((t) => t.metadata.name));
    const compareList: CompareEventTransactionDTO[] = [];
    // 멤버 이름 기준으로 입금 판단
    members.forEach((member) => {
      compareList.push({
        name: member.name,
        isPaid: tName.has(member.name),
      });
    });
    return compareList;
  }
}
