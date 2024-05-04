export class Event {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  transactionStartDate: Date;
  transactionEndDate: Date;
  fee: number;
  attendees: string[];
}
