export class Transaction {
  metadata: {
    groupId: string;
    transactionType: string;
    amount: number;
    name: string;
  };
  timestamp: Date;
}
