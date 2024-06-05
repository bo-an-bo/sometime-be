import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { Group } from './entities/group.entity';

@Injectable()
export class GroupValidator {
  validateGroupOwner(group: Group, userId: string) {
    if (group.auth.owner !== userId) {
      throw new UnauthorizedException('소유자 권한이 없습니다.');
    }
  }

  validateGroupEditor(group: Group, userId: string) {
    if (group.auth.owner !== userId && !group.auth.editors.includes(userId)) {
      throw new UnauthorizedException('편집 권한이 없습니다.');
    }
  }

  validateGroupViewer(group: Group, userId: string) {
    if (group.auth.owner !== userId && !group.auth.editors.includes(userId) && !group.auth.viewers.includes(userId)) {
      throw new UnauthorizedException('조회 권한이 없습니다.');
    }
  }

  validateGroupInvite(group: Group, receiverId: string) {
    if (
      group.auth.owner === receiverId ||
      group.auth.editors.includes(receiverId) ||
      group.auth.viewers.includes(receiverId)
    ) {
      throw new ConflictException('이미 초대된 사용자입니다.');
    }
  }

  validateGroup(group: Group) {
    if (!group) {
      throw new NotFoundException('모임을 찾을 수 없습니다.');
    }
  }
}
