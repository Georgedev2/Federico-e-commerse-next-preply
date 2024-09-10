export async function fetchFilteredProducts(query, filterType = 'search') {
  try {
    const res = await fetch(`${process.env.BASE_URL_DEV}/products`, {
      cache: 'no-store', // Ensure you are not caching for fresh data
    });
    const products = await res.json();

    const filteredProducts = query
      ? products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        )
      : products;

    return filteredProducts;
  } catch (error) {
    // Log the error for debugging
    console.error('Error fetching product data:', error.message);
    // Re-throw the error for further handling (if needed)
    throw error;
  }
}

export default fetchFilteredProducts;
