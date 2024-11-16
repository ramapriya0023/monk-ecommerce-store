const testingURL =
  "https://monk-ecommerce-storeserver-2tg7mm1yy-ramapriyas-projects.vercel.app/proxy/products/search";
const baseUrl = "http://stageapi.monkcommerce.app/task/products/search";
const API_KEY = "72njgfa948d9aS7gs5";

export const fetchProducts = async (search = "", page = 0, limit = 10) => {
  try {
    const response = await fetch(
      `${testingURL}?search=${search}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
