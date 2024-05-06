import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

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
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    return this.transactionModel
      .find({
        'metadata.groupId': groupId,
        timestamp: {
          $gte: new Date(startDate),
          $lt: new Date(endDate),
        },
      })
      .exec();
  }

  async deleteMany(groupId: string) {
    return this.transactionModel.deleteMany({ 'metadata.groupId': groupId });
  }
}
