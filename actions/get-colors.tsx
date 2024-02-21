import { Color } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

const getColors = async (): Promise<Color[]> => {
  try {
     const res = await fetch(URL, {
      next: { revalidate: 60 },
     });
  
    if (!res.ok) {
      throw new Error('Failed to fetch colors');
    }

    return res.json();
    
  } catch (error) {
    // Handle the error, you might want to log it or return an empty array, depending on your use case.
    console.error('Error fetching colors:', error);
    return [];
  }
};

export default getColors; 
