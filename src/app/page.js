import Image from 'next/image';
import Link from 'next/link';
import Search from './Search';

export async function fetchFilteredProducts(query) {
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

export default async function ProductList(props) {
  const {
    searchParams: { query },
  } = props;

  try {
    const filtered = await fetchFilteredProducts(query);

    return (
      <div className="flex justify-center px-4 mt-28">
        <Search />
        <div
          className="flex flex-wrap justify-center gap-6 max-w-7xl w-full"
          style={{ marginBlock: '100px' }}
        >
          {filtered.length > 0 ? (
            filtered.map(({ id, name, price }) => (
              <div
                key={id}
                className="bg-white border rounded-md shadow-md flex flex-col items-center"
                style={{
                  width: '252px',
                  height: '300px',
                }}
              >
                <Link href={`/products/${id}`}>
                  <div
                    className="w-full h-full flex flex-col"
                    style={{
                      width: '250px',
                      height: '300px',
                    }}
                  >
                    <div className="relative w-full h-full overflow-hidden rounded-t-md">
                      {/* <Image
                        src="/photo.jpg"
                        alt={`Image of ${name}`}
                        layout="fill"
                        objectFit="cover"
                        className="object-cover"
                      /> */}
                    </div>
                    <div className="w-full h-1/3 flex flex-col items-center p-4">
                      <h3 className="text-sm text-gray-700">{name}</h3>
                      {price ? (
                        <p className="text-sm font-medium text-gray-900 mt-2">
                          {price}
                        </p>
                      ) : (
                        <p className="text-sm font-medium text-red-500 mt-2">
                          Price Unavailable
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-96">
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching product data:', error);
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          An unexpected error occurred: {error.message || 'Unknown error'}
        </p>
      </div>
    );
  }
}
