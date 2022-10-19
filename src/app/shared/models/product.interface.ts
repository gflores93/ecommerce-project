import { CategoryInterface } from './category.interface';

export interface ProductInterface {
  description: string;
  id?: number;
  image: string;
  price: number;
  quantity?: number;
  rating?: any;
  title: string;
  total?: number | any;
  categoryId: number;
  active: boolean;
  category?: CategoryInterface;
}
