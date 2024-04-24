import * as XLSX from 'exceljs';

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
  ) {
    const workbook = new XLSX.Workbook();
    await workbook.xlsx.load(excel.buffer);

    const worksheet = workbook.getWorksheet(1);

    const transactions: Transaction[] = [];
    const columns: string[] = ['거래일시', '구분', '거래금액'];

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 11) {
        const transaction: Transaction = new Transaction();
        transaction.metadata = {
          groupId: transactionGroupId,
          transactionType: '',
          amount: 0,
        };
        row.eachCell((cell, colNumber) => {
          const col = String(columns[colNumber - 2]).trim();
          if (col == '거래일시')
            transaction.timestamp = this.parseDate(String(cell.value).trim());
          if (col == '구분')
            transaction.metadata.transactionType = String(cell.value).trim();
          if (col == '거래금액')
            transaction.metadata.amount = Number(cell.text.replace(/,/g, ''));
        });
        transactions.push(transaction);
      }
    });

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
