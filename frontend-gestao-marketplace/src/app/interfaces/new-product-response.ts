import { IProducts } from "./products";

export interface INewProductResponse {
  message: string;
data: {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  status: string;
  image: string;
}
}

export interface IProductsResponse {
  message: string;
  data: IProducts[];
}