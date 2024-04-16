import { Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { UpdateGroupDto } from './dto/update-group.dto';
import * as XLSX from 'exceljs';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return (await this.groupRepository.create(createGroupDto)) as Group;
  }

  async findAll(): Promise<Group[]> {
    return (await this.groupRepository.findAll()) as Group[];
  }

  async findOne(id: string): Promise<Group> {
    return (await this.groupRepository.findOne(id)) as Group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return (await this.groupRepository.update(id, {
      name: updateGroupDto.name,
      description: updateGroupDto.description,
    } as UpdateGroupDto)) as Group;
  }

  async delete(id: string): Promise<void> {
    return this.groupRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    return this.groupRepository.deleteAll();
  }

  async convertExcelToJSON(id: string, excel: Express.Multer.File) {
    const workbook = new XLSX.Workbook();
    await workbook.xlsx.load(excel.buffer);

    const worksheet = workbook.getWorksheet(1);
    const data = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber !== 1) {
        const rowObject = {};
        row.eachCell((cell, colNumber) => {
          rowObject[`column${colNumber}`] = cell.value;
        });
        data.push(rowObject);
      }
    });

    return {
      id,
      data,
    };
  }
}
