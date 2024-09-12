import { NextResponse } from 'next/server';
import { db } from '../../dbConfig/config';
import bcrypt from 'bcrypt';

export const POST = async (req, res) => {
  try {
    const body = await req.json();
    const { email, firstName, lastName, password } = body;
    console.log('vvv', { email, firstName, lastName, password });
    const matchingUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });
    // 12345gdhdh

    if (matchingUser == null) {
      const hash = await bcrypt.hash(password, 10);

      const newUser = await db.user.create({
        data: {
          email: email,
          name: `${firstName} ${lastName}`,
          password: hash,
        },
      });

      return NextResponse.json(
        {
          message: 'successfully created',
          user: newUser,
        },
        {
          status: 201,
        }
      );
    }
    return NextResponse.json({
      message: 'User already exist',
    });
  } catch (error) {

    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
  // {
  //     stack, message
  // }
  //   return NextResponse.json(body);
};
