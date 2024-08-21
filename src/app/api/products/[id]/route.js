import { NextResponse } from 'next/server';
import { data } from '../data';

const findById = (id) => {
  return data.find((el) => {
    return el.id == id;
  });
};

// ~>  http://localhost:3000/api/products/2
export const GET = (req, { params }) => {

  const id = Number(params.id); // params { id: '1' }
  const result = findById(id);
  if (!result ) {
    return NextResponse.json({
      message: `product with id of ${params.id} dose not exist`,
    });
  }
  return NextResponse.json(result);
};
