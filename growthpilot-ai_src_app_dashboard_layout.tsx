import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import DashboardShell from "@/components/DashboardShell";
export default async function Layout({children}:{children:React.ReactNode}){
 const id=await getUserId();if(!id)redirect("/login");
 const user=await prisma.user.findUnique({where:{id},select:{name:true}});if(!user)redirect("/login");
 return <DashboardShell userName={user.name}>{children}</DashboardShell>;
}
