const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchNavigation = async () => {
  const res = await fetch(`${API_BASE_URL}/navigation`);
  return res.json();
};

export const fetchCategories = async (navigationId?: number) => {
  const url = navigationId
    ? `${API_BASE_URL}/categories?navigationId=${navigationId}`
    : `${API_BASE_URL}/categories`;
  const res = await fetch(url);
  return res.json();
};

export const fetchProductsByCategory = async (categoryId: string) => {
  const res = await fetch(`${API_BASE_URL}/products/category/${categoryId}`);
  return res.json();
};

export const fetchProductById = async (id: string) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`);
  return res.json();
};

export const fetchSearchResults = async (_query: string) => {
  return [];
};
