export interface TransactionInterface extends Document {
  metadata: {
    groupId: string;
    transactionType: string;
    amount: number;
    name: string;
  };
  timestamp: Date;
}
