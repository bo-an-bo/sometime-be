import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { Group } from './entities/group.entity';

@Injectable()
export class GroupValidator {
  validateGroupOwner(group: Group, userId: string) {
    this.validateGroup(group);

    if (group.auth.owner !== userId) {
      throw new UnauthorizedException('소유자 권한이 없습니다.');
    }
  }

  validateGroupEditor(group: Group, userId: string) {
    this.validateGroup(group);

    if (group.auth.owner !== userId && !group.auth.editors.includes(userId)) {
      throw new UnauthorizedException('편집 권한이 없습니다.');
    }
  }

  validateGroupViewer(group: Group, userId: string) {
    this.validateGroup(group);

    if (group.auth.owner !== userId && !group.auth.editors.includes(userId) && !group.auth.viewers.includes(userId)) {
      throw new UnauthorizedException('조회 권한이 없습니다.');
    }
  }

  private validateGroup(group: Group) {
    if (!group) {
      throw new NotFoundException('모임을 찾을 수 없습니다.');
    }
  }
}
