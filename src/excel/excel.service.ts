import * as XLSX from 'exceljs';
import * as DecryptXLSX from 'xlsx-populate';

import { Member } from '../member/entities/member.entity';
import { Transaction } from '../transaction/entities/transaction.entity';

export class ExcelService {
  async convertExcelToJSON(groupId: string, excel: Express.Multer.File) {
    const workbook = new XLSX.Workbook();
    await workbook.xlsx.load(excel.buffer);

    const worksheet = workbook.getWorksheet(1);

    const columns = [];
    worksheet.getRow(1).eachCell((cell) => {
      columns.push(cell.value);
    });

    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowObject = {};
        row.eachCell((cell, colNumber) => {
          const col = columns[colNumber - 1];
          rowObject[col] = cell.value;
        });
        data.push(rowObject);
      }
    });

    return {
      groupId,
      data,
    };
  }

  async convertMemberExcelToJSON(excel: Express.Multer.File) {
    const workbook = new XLSX.Workbook();
    await workbook.xlsx.load(excel.buffer);

    const worksheet = workbook.getWorksheet(1);

    const columns = [];
    worksheet.getRow(1).eachCell((cell) => {
      columns.push(cell.value);
    });

    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowObject = {};
        const memberInfo = {};
        row.eachCell((cell, colNumber) => {
          const col = columns[colNumber - 1];
          if (col == 'name' || col == '이름') {
            rowObject['name'] = String(cell.value).trim();
          } else {
            memberInfo[col] = String(cell.value).trim();
          }
        });
        rowObject['memberInfo'] = memberInfo;
        data.push(rowObject);
      }
    });

    return data;
  }

  async convertMemberExcelToMembers(excel: Express.Multer.File) {
    const workbook = new XLSX.Workbook();
    await workbook.xlsx.load(excel.buffer);

    const worksheet = workbook.getWorksheet(1);

    const columns = [];
    worksheet.getRow(1).eachCell((cell) => {
      columns.push(cell.value);
    });

    const members: Member[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const member: Member = new Member();
        const memberInfo = {};
        row.eachCell((cell, colNumber) => {
          const col = columns[colNumber - 1];
          if (col == 'name' || col == '이름') {
            member.name = String(cell.value).trim();
          } else {
            memberInfo[col] = String(cell.value).trim();
          }
        });
        member.memberInfo = memberInfo;
        members.push(member);
      }
    });

    return members;
  }

  async convertTransactionFileToTransactionArr(
    transactionGroupId: string,
    excel: Express.Multer.File,
    password: string,
  ): Promise<Transaction[]> {
    let workbook: DecryptXLSX.Workbook;
    if (password) {
      workbook = await DecryptXLSX.fromDataAsync(excel.buffer, {
        password: password,
      });
    } else {
      try {
        workbook = await DecryptXLSX.fromDataAsync(excel.buffer);
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
