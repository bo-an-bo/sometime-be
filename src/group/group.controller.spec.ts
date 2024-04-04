import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { HydratedDocument, Model } from 'mongoose';
import { Group } from './interfaces/group.interface';

describe('GroupController', () => {
  let groupController: GroupController;
  let groupService: GroupService;
  let groupModel: Model<Group>;

  beforeEach(async () => {
    groupService = new GroupService(groupModel);
    groupController = new GroupController(groupService);
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      const result: HydratedDocument<any> = [
        { _id: 1, name: 'Group 1' },
        { _id: 2, name: 'Group 2' },
      ];
      jest.spyOn(groupService, 'findAll').mockImplementation(() => result);

      expect(await groupController.findAll()).toBe(result);
    });
  });
});
