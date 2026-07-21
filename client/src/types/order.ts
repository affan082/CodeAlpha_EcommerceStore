export interface OrderItem{
    product: string;
    name: string;
    quantity: number;
    price: number;
}



export interface ShippingAddress{
    address: string;
    city: string;
}



export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';



export interface Order{
    _id: string;
    user: string;
    items: OrderItem[];
    shippingAddress: ShippingAddress;
    totalPrice: number;
    isPaid: boolean;
    status: OrderStatus;
    createdAt: string;
}