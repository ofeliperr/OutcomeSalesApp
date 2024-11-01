export interface CategoryModel {
  id: number;
  name: string;
}

export interface ProductModel {
  id: number;
  name: string;
  category: CategoryModel;
}

export interface BrandModel {
  id: number;
  name: string;
  price: number;
}
