// import { usePathname } from "next/navigation";

const page = async ({ params: { id }, searchParams }) => {
  const productId = Number(id);

  try {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    const data = await res.json();
    //  console.log('data', data)
    return <div>{data.name}</div>;
  } catch (error) {}
};

export default page;
