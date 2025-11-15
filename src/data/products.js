const BASE_URL = "https://fakestoreapi.com/products";

// Helper to generate SEO-friendly slug
export function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces.symbols with '-'
    .replace(/^-+|-+$/g,''); // Remove starting/ending hyphens
}

// Get all products (with slugs)
export async function fetchAllProducts() {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error("Fail to fetch products");

  const data = await response.json();

  // Add slug property for SEO URLs
  return data.map((product) => ({
    ...product,
    slug: createSlug(product.title),
  }));
}

// Get one product ID
export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) throw new Error(`Product with ID ${id} not found`);
  return response.json();
}