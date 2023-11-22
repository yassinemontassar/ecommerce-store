import { Size } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

const getSizes = async (): Promise<Size[]> => {
  try {
     const res = await fetch(URL, {cache: 'no-store'});
    
    if (!res.ok) {
      throw new Error('Failed to fetch sizes');
    }

    return res.json();
    
  } catch (error) {
    // Handle the error, you might want to log it or return an empty array, depending on your use case.
    console.error('Error fetching sizes:', error);
    return [];
  }
};

export default getSizes; 
