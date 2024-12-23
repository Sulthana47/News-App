import axios from 'axios';

const BASE_URL = 'https://content.guardianapis.com/search';
const API_KEY = 'ba3cab63-3dbd-49f8-819a-8e2b1d4001d8';

export const fetchArticlesCategories = async (section = "") => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        'section': section || undefined,   
        'api-key': API_KEY,                 
        'order-by': 'newest',               
      },
    });

    return response.data.response.results || [];  
  } catch (error) {
    console.error("Error while fetching from The Guardian API:", error);
    return []; 
  }
};

