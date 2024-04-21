export class Group {
  id: string;
  name: string;
  description: string;
  manager: string;
  subManagers: [
    {
      user: string;
      authorities: string[];
    },
  ];
  members: any[];
  events: string[];
}
