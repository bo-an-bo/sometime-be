import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { EventService } from '../event/event.service';
import { MemberService } from '../member/member.service';
import { TransactionService } from '../transaction/transaction.service';
import { UserService } from '../user/user.service';
import { Group } from './entities/group.entity';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupValidator {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly memberService: MemberService,
    private readonly eventService: EventService,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
  ) {}

  validateGroupEdit(group: Group, userId: string) {
    if (group.auth.owner !== userId && !group.auth.editors.includes(userId)) {
      throw new UnauthorizedException('편집 권한이 없습니다.');
    }
  }

  validateGroup(group: Group) {
    if (!group) {
      throw new NotFoundException('모임을 찾을 수 없습니다.');
    }
  }
}
