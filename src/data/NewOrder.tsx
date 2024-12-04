import { OrderItem } from "./OrderItem";

export class NewOrder {
  tableId: number;
  userId: number; 
  orderItems: OrderItem[];
  status: string;
  createdAt: string;
  totalAmount: number;

  constructor(
    tableId: number,
    userId: number,
    orderItems: OrderItem[],
    status: string = "pendiente"
  ) {
    this.tableId = tableId;
    this.userId = userId;
    this.orderItems = orderItems;
    this.status = status;
    this.createdAt = new Date().toISOString();
    this.totalAmount = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
}
