import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      cache:'no-store'
      // next: {
      //   revalidate: 3000,
      // },
    });
    const data = await res.json();
    return data;
  } catch (error) {}
};
const page = async () => {
  const data = await getData();
  console.log('data', data);
  return (
    <div>
      {data.map(({ name, id }) => (
        <Link key={id} href={`/products/${id}`} >{name}</Link>
      ))}
    </div>
  );
};

export default page;
