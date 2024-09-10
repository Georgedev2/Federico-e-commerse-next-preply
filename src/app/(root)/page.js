import Image from 'next/image';
import Link from 'next/link';
import Search from '../Search';

import fetchFilteredProducts from '../lib';

export default async function ProductList(props) {
  const {
    searchParams: { query,category },
  } = props;

  try {

    const k=category && category.split('-')[1]
    console.log('query',k)
    
    const filtered = await fetchFilteredProducts(query);
// category=above-100
    return (
      <div className="">
        <Search />
        <Link href={'?category=above-100'}>more than $100</Link>
        <>
          <div className="flex">
            {filtered.length > 0 ? (
              filtered.map(({ id, name, price }) => (
                <div key={id} className="product">
                  <Link href={`/products/${id}#go`}>
                    <div
                      className="w-full h-full flex flex-col"
                      style={{
                        width: '250px',
                        height: '300px',
                      }}
                    >
                      <div className="relative w-full h-full overflow-hidden rounded-t-md"></div>
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
        </>
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
