export type  LoginResponse = {
  token: string;
  user: any;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
 export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

export interface User {
  id?: number;
  firstname?: string; 
  lastname?: string; 
  email?: string;
  username?:string;
  password?: string;
  name?:object;
  address?: object;
  phone?:string
}


export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: Product[];
}