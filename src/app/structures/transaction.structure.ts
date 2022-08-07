import { Timestamp } from "@angular/fire/firestore";

export type Transaction = {
  transactionId?: string;
  amount: number;
  senderId: string;
  receiverId: string;
  timestamp: Timestamp;
  status: 'Success' | 'Pending' | 'Failed';
};
