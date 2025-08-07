export interface IProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
  }

export interface ICart {
  id?: string;
  user_id: string;
  product_id: string;
  quantity: number;
}

export interface ICartReturn extends ICart {
  products: IProduct
}