export type  LoginResponse = {
  token: string;
  user: any;
}

export interface Product {
productId:number,quantity:number
}
 export interface CartItem {
  id?: number;
  productId: number;
  quantity: number;
}

export interface User {
  id?: number;
  name?:{
    firstname?: string; 
    lastname?: string; 
  }
  email?: string;
  username?:string;
  password?: string;
  address?: object;
  phone?:string
}


export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: Product[];
}