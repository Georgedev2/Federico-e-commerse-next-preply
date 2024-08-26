import { NextResponse } from 'next/server';
import { data } from '../data';

const findById = (id) => {
  return data.find((el) => {
    return el.id == id;
  });
};

// ~>  http://localhost:3000/api/products/2
export const GET = (req, { params }) => {
  try {
    const id = Number(params.id); // params { id: '1' }
    if (!id) {
      return NextResponse.json(
        {
          message: `invalid product with id`,
        },
        { status: 400 }
      );
    }
    const result = findById(id); // null
  
    if (!result) {
      return NextResponse.json(
        {
          message: `product with id of ${params.id} dose not exist`,
        },
        { status: 404 }
      );
    }
  
    return NextResponse.json(result);
  } catch (error) {
    console.log('error---',typeof error, error.toString().split(':'))// error--- TypeError: next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.jso is not a function
    const errorArray=error.toString().split(':')// [  'TypeError',  ' next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.jso is not a function']
  const  errorType=errorArray[0];
   const cause=errorArray[1];
    return NextResponse.json({
      data:null,
      error:{
        message:cause,
        code:500,
        cause:errorType
      }
    },{status:500});
  }

};
