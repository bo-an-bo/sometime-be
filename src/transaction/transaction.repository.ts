import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { GetTransactionPeriodDto } from './dto/get-transaction-period.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionInterface } from './interfaces/transaction.interface';

@Injectable()
export class TransactionRepository {
  constructor(
    @Inject('TRANSACTION_MODEL')
    private readonly transactionModel: Model<TransactionInterface>,
  ) {}

  createMany(transactions: Transaction[]): Promise<any> {
    return this.transactionModel.insertMany(transactions, { ordered: false });
  }

  async getTransactions(groupId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ 'metadata.groupId': groupId });
  }

  async getTransactionsByPeriod(
    groupId: string,
    transactionDto: GetTransactionPeriodDto,
  ): Promise<any> {
    return this.transactionModel
      .find({
        'metadata.groupId': groupId,
        timestamp: {
          $gte: new Date(transactionDto.startDate),
          $lt: new Date(transactionDto.endDate),
        },
      })
      .exec();
  }
}
