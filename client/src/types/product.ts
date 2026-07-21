export type ProductCategory = 'Pants' | 'T-Shirts' | 'Casual Shirts';



export interface Product{
    _id: string;
    name: string;
    description: string;
    price: number;
    category: ProductCategory;
    stock: number;
    images: string[];
    createdBy?: string;
    createdAt?: string;
    updatedAt?: string;
}