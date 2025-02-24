import { Types } from "mongoose";

export interface IOrder {
    orderId: Types.ObjectId;
    userId: Types.ObjectId;
    items: IOrderItem[];
    totalPrice: number;
    status: OrderStatus;
    deliveryAddress?: string;
    paymentMethod: PaymentMethod;
    createdAt: Date;
    updatedAt?: Date;
}


export interface IOrderItem {
    itemId: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
    dietary: string[];
    cuisine: string[];
}


export enum OrderStatus {
    PENDING = "PENDING",
    CONFIRMED = "CONFIRMED",
    DISPATCHED = "DISPATCHED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}

export enum PaymentMethod {
    CASH = "CASH",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    PAYPAL = "PAYPAL",
    OTHER = "OTHER"
}