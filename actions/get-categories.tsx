import { Category } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
     const res = await fetch(URL, {
      next: { revalidate: 60 },
     });
    
   
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    return res.json();
    
  } catch (error) {
    // Handle the error, you might want to log it or return an empty array, depending on your use case.
    console.error('Error fetching categories:', error);
    return [];
  }
};

export default getCategories; 
