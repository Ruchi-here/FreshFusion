import { Types } from "mongoose";


export interface IItem {
    sellerId: Types.ObjectId;
    name: string;
    icon: string;
    desc: string;
    price: number;
    dietary: string[];
    cuisine: string[];
    packaging: string[];
    inStock: boolean;
}