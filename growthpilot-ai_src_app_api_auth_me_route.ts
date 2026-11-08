import {NextResponse} from "next/server";import {getUserId} from "@/lib/auth";import {prisma} from "@/lib/prisma";
export async function GET(){const id=await getUserId();if(!id)return NextResponse.json({user:null},{status:401});const user=await prisma.user.findUnique({where:{id},select:{id:true,name:true,email:true}});return NextResponse.json({user});}
