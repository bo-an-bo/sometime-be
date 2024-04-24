export class Transaction {
  metadata: {
    groupId: string;
    transactionType: string;
    amount: number;
  };
  timestamp: Date;
}
