import { Product } from '@/types';
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  categoryId?: string;
  colorId?: string; 
  name?: string;
  sizeId?: string; 
  price?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

const getProducts = async (query: Query = {}): Promise<Product[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: { 
      colorId: query.colorId,
      sizeId: query.sizeId,
      name: query.name,
      price: query.price,
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
      isNew: query.isNew,
    },
  });

  const res = await fetch(url, {
    next: { revalidate: 300 },
  });
  return res.json();
};

export default getProducts;
