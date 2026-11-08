"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BrainCircuit, LayoutDashboard, Target, ListTodo, Lightbulb, MessageSquare, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
const nav=[["/dashboard","Overview",LayoutDashboard],["/dashboard/quests","Daily quests",Target],["/dashboard/tasks","Tasks",ListTodo],["/dashboard/opportunities","Opportunities",Lightbulb],["/dashboard/advisor","AI advisor",MessageSquare],["/dashboard/settings","Business profile",Settings]] as const;
export default function DashboardShell({children,userName}:{children:React.ReactNode;userName:string}){
 const path=usePathname();const router=useRouter();const [open,setOpen]=useState(false);
 async function logout(){await fetch("/api/auth/logout",{method:"POST"});router.push("/");router.refresh();}
 return <div className="min-h-screen md:flex">
  <aside className={`${open?"block":"hidden"} fixed inset-y-0 left-0 z-30 w-64 border-r border-slate-800 bg-[#0b1423] p-5 md:block`}>
   <Link href="/" className="flex items-center gap-3 text-lg font-bold"><span className="rounded-xl bg-blue-600 p-2"><BrainCircuit size={21}/></span>GrowthPilot <span className="text-blue-400">AI</span></Link>
   <p className="mb-3 mt-10 px-3 text-xs font-semibold uppercase tracking-widest text-slate-600">Workspace</p>
   <nav className="space-y-1">{nav.map(([href,label,Icon])=><Link onClick={()=>setOpen(false)} key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm ${path===href?"bg-blue-500/15 text-blue-300":"text-slate-400 hover:bg-slate-800/60 hover:text-white"}`}><Icon size={18}/>{label}</Link>)}</nav>
   <div className="absolute bottom-5 left-5 right-5"><div className="mb-4 rounded-xl border border-slate-800 bg-slate-900/70 p-3"><p className="text-xs text-slate-500">SIGNED IN AS</p><p className="mt-1 truncate text-sm font-medium text-slate-200">{userName}</p></div><button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-slate-800"><LogOut size={17}/> Sign out</button></div>
  </aside>
  {open&&<button aria-label="Close menu" onClick={()=>setOpen(false)} className="fixed inset-0 z-20 bg-black/60 md:hidden"><X/></button>}
  <div className="min-w-0 flex-1 md:ml-64"><header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-800 bg-[#080f1d]/90 px-5 backdrop-blur md:px-8"><button className="text-slate-300 md:hidden" onClick={()=>setOpen(true)}><Menu/></button><span className="hidden text-sm text-slate-500 md:block">AI-powered business growth workspace</span><div className="flex items-center gap-3"><span className="text-sm text-slate-400">{userName}</span><span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-300">{userName.slice(0,1).toUpperCase()}</span></div></header><main className="mx-auto max-w-7xl p-5 md:p-8">{children}</main></div>
 </div>;
}
