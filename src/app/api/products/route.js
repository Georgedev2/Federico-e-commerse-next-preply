
import { NextResponse } from 'next/server';
import db from '../../dbConfig'
const data = [
  {
    name: 'Iphone 18pro max',
    id: 1,
  },
  {
    name: 'samsung s32 altra',
    id: 2,
    descr: '',
  },
  {
    name: 'techno P5',
    id: 3,
  },
  {
    name: 'techno P10',
    id: 9,
  },
];
// ~>  http://localhost:3000/api/products
export const GET = (req, res) => {
// db.user
  return NextResponse.json(data);
};
