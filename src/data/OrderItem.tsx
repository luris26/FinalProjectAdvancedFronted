export interface OrderItem {
  menuId: number;
  quantity: number;
  price: number;
  menuName: string;
}

export interface NewOrder {
  orderId?: number; 
  tableId: number;
  userId: number;
  status: string;
  totalAmount: number;
  createdAt?: string;
  orderItems: OrderItem[];
}
