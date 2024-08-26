import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      cache:'no-store'
      // next: {
      //   revalidate: 3000,
      // },
    });
    if(res.ok){
      const data = await res.json();
      return data;
    }
   
  } catch (error) {
    
    
  }
};
const page = async () => {
  // const data = await getData();
  // console.log('data', data);
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      cache:'no-store'
      // next: {
      //   revalidate: 3000,
      // },
    });
    if(res.ok){
      const data = await res.json();
      return (
        <div>
          {data.map(({ name, id }) => (
            <Link key={id} href={`/products/90`} >{name}</Link>
          ))}
        </div>
      );
    }
    console.log(res)
    return <div></div>
   
  } catch (error) {
    console.log(error)
    return <>
    </>
    
  }

};
// href={`/products/${id}`}
export default page;
