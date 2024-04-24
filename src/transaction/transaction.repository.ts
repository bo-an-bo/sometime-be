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
    return this.transactionModel.insertMany(transactions);
  }
}
