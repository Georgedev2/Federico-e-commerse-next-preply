import { NextResponse } from "next/server";

export const POST= async(req, res)=>{
    const body= await req.json();
    
    return NextResponse.json(body);
}