export class Group {
  id: string;
  name: string;
  description: string;

  auth: {
    owner: string;
    editors: string[];
    viewers: string[];
  };

  members: any[];
  events: any[];
}
