export class Group {
  id: string;
  name: string;
  description: string;

  owner: any;
  editors: any[];
  viewers: any[];

  members: any[];
  events: any[];
}
