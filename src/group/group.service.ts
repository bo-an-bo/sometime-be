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

  async addMember(groupId: string, memberId: string): Promise<Group> {
    const group = (await this.groupRepository.findOne(groupId)) as Group;

    if (!group.members.includes(memberId)) {
      group.members.push(memberId);
      await this.groupRepository.update(groupId, group);
    }
    return group;
  }

  async findAll(): Promise<Group[]> {
    return (await this.groupRepository.findAll()) as Group[];
  }

  async findOne(groupId: string): Promise<Group> {
    return (await this.groupRepository.findOne(groupId)) as Group;
  }

  async update(
    groupId: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return (await this.groupRepository.update(groupId, {
      name: updateGroupDto.name,
      description: updateGroupDto.description,
    } as UpdateGroupDto)) as Group;
  }

  async delete(groupId: string): Promise<void> {
    return this.groupRepository.delete(groupId);
  }

  async deleteAll(): Promise<void> {
    return this.groupRepository.deleteAll();
  }

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
}
