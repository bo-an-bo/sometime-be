import * as XLSX from 'xlsx-populate';

import { Member } from '../member/entities/member.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

export class ExcelService {
  async convertMemberExcelToMembers(excel: Express.Multer.File) {
    const workbook = await XLSX.fromDataAsync(excel.buffer);
    const worksheet = workbook.sheet(0);
    const columns = [];
    let maxColumn = 1;
    while (true) {
      const cell = worksheet.row(1).cell(maxColumn).value();
      if (!cell) break; // 값이 없으면 반복 중단
      columns.push(cell);
      maxColumn++;
    }
    const endRow = worksheet.usedRange().endCell().rowNumber();

    const members: Member[] = [];

    for (let rowNumber = 2; rowNumber <= endRow; rowNumber++) {
      const row = worksheet.row(rowNumber);
      const member: Member = new Member();
      const memberInfo = {};

      for (let colNumber = 1; colNumber < maxColumn; colNumber++) {
        const cell = row.cell(colNumber);
        const col = columns[colNumber - 1];
        const cellValue = cell.value() ? cell.value().toString().trim() : '';
        if (col === 'name' || col === '이름') {
          member.name = cellValue;
        } else {
          memberInfo[col] = cellValue;
        }
      }

      member.memberInfo = memberInfo;
      members.push(member);
    }

    return members;
  }

  async convertTransactionFileToTransactionArr(
    transactionGroupId: string,
    excel: Express.Multer.File,
    password: string,
  ): Promise<Transaction[]> {
    // password check
    let workbook: XLSX.Workbook;
    if (password) {
      workbook = await XLSX.fromDataAsync(excel.buffer, {
        password: password,
      });
    } else {
      try {
        workbook = await XLSX.fromDataAsync(excel.buffer);
      } catch (e) {
        throw new Error('비밀번호가 필요합니다.');
      }
    }
    const worksheet = workbook.sheet(0); // Assume we are using the first worksheet

    const transactions: Transaction[] = [];
    const columns: string[] = [
      '',
      '거래일시',
      '구분',
      '거래금액',
      '',
      '',
      '내용',
    ];
    const startRow = 12;
    const endRow = worksheet.usedRange().endCell().rowNumber();

    for (let rowNumber = startRow; rowNumber <= endRow; rowNumber++) {
      const row = worksheet.row(rowNumber);
      const transaction: Transaction = new Transaction();
      transaction.timestamp = new Date();

      transaction.metadata = {
        groupId: transactionGroupId,
        transactionType: '',
        amount: 0,
        name: '',
      };

      columns.forEach((columnName, index) => {
        const cell = row.cell(index + 1);
        const value = cell.value(); // 셀 값 가져오기

        if (columnName === '거래일시' && value)
          transaction.timestamp = this.parseDate(value.toString().trim());
        if (columnName === '구분' && value)
          transaction.metadata.transactionType = value.toString().trim();
        if (columnName === '거래금액' && value)
          transaction.metadata.amount = parseFloat(
            value.toString().replace(/,/g, ''),
          );
        if (columnName === '내용' && value)
          transaction.metadata.name = value.toString().trim();
      });
      transactions.push(transaction);
    }
    return transactions;
  }

  parseDate(dateStr: string) {
    const [datePart, timePart] = dateStr.split(' ');
    const [year, month, day] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    const date = new Date(year, month - 1, day, hours, minutes, seconds);
    const UTFDiff = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - UTFDiff);
  }
}
