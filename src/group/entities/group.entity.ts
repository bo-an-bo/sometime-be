export class Group {
  id: string;
  name: string;
  description: string;

  auth: {
    owner: any;
    editors: any[];
    viewers: any[];
  };

  members: any[];
  events: any[];
}
