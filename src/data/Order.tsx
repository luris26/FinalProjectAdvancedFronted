import { OrderItem } from "./OrderItem";

export interface Order {
  orderId: number;
  tableId: number;
  userId: number;
  status: string;
  totalAmount: number;
  createdAt: string | null;
  orderItems: OrderItem[];
}
