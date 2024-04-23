import * as XLSX from 'exceljs';

import { Member } from '../member/entities/member.entity';

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
}
