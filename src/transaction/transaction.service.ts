import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  create(createTransactionDto: CreateTransactionDto) {
    return createTransactionDto;
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return { id, updateTransactionDto };
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
