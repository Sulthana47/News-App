import axios from "axios";

const API_KEY = "ab360371ef5d4791ba3a6e0983206797";
const BASE_URL = "https://newsapi.org/v2";

export const fetchArticles = async (searchQuery = "", filters = {}) => {
  const { date, source} = filters;

  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: searchQuery || "latest",
        from: date || undefined, 
        sources: source || undefined, 
        language: "en", 
        sortBy: "publishedAt", 
      },
      headers: {
        "x-api-key": API_KEY,
      },
    });

    return response.data.articles || [];
  } catch (error) {
    console.error("Error while fetching:", error);
    return [];
  }
};
