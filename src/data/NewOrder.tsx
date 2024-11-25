import { OrderItem } from "./OrderItem";

export class NewOrder {
  tableId: number;
  orderItems: OrderItem[];
  status: string;
  createdAt: string;
  totalAmount: number;

  constructor(
    tableId: number,
    orderItems: OrderItem[],
    status: string = "pendiente"
  ) {
    this.tableId = tableId;
    this.orderItems = orderItems;
    this.status = status;
    this.createdAt = new Date().toISOString();
    this.totalAmount = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }
}
