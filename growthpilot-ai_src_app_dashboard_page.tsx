import Link from "next/link";
import { redirect } from "next/navigation";
import { getUserId } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Target, CheckCircle2, Clock3, Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { GenerateQuestsButton } from "@/components/QuestActions";
export default async function Dashboard(){
 const uid=await getUserId();if(!uid)redirect("/login");
 const business=await prisma.business.findFirst({where:{ownerId:uid},orderBy:{createdAt:"asc"}});
 if(!business)redirect("/onboarding");
 const [quests,completed,pending,opportunities]=await Promise.all([
  prisma.quest.findMany({where:{businessId:business.id,createdAt:{gte:new Date(new Date().setHours(0,0,0,0))}},orderBy:{createdAt:"desc"},take:5}),
  prisma.quest.count({where:{businessId:business.id,status:"COMPLETED"}}),
  prisma.task.count({where:{businessId:business.id,status:{in:["TODO","IN_PROGRESS"]}}}),
  prisma.opportunity.findMany({where:{businessId:business.id},orderBy:{createdAt:"desc"},take:3})
 ]);
 return <div className="space-y-7">
  <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-slate-500">EXECUTIVE COMMAND CENTRE</p><h1 className="mt-2 text-3xl font-bold text-white">Good day.</h1><p className="mt-2 text-slate-400">Here is your growth workspace for {business.name}.</p></div><GenerateQuestsButton/></div>
  <section className="rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-600/15 to-indigo-500/5 p-5 md:p-6"><div className="flex items-center gap-2 text-sm font-semibold text-blue-300"><Sparkles size={17}/> GROWTHPILOT EXECUTIVE BRIEFING</div><h2 className="mt-3 text-xl font-semibold text-white">Make progress on what matters.</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Your daily quests are designed around your business profile. Generate a fresh set when you need new priorities. Market intelligence features should be connected to verified research sources before relying on time-sensitive opportunities.</p></section>
  <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[{label:"Today's quests",value:quests.length,Icon:Target},{label:"Quests completed",value:completed,Icon:CheckCircle2},{label:"Open tasks",value:pending,Icon:Clock3},{label:"Saved opportunities",value:opportunities.length,Icon:Lightbulb}].map(x=><div className="panel p-5" key={x.label}><x.Icon className="text-blue-400" size={20}/><p className="mt-4 text-3xl font-bold text-white">{x.value}</p><p className="mt-1 text-sm text-slate-500">{x.label}</p></div>)}</section>
  <section className="grid gap-5 xl:grid-cols-[1.4fr_1fr]"><div className="panel p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-white">Today's quests</h2><p className="mt-1 text-sm text-slate-500">Suggested actions for your business</p></div><Link href="/dashboard/quests" className="flex items-center gap-1 text-sm text-blue-400">View all <ArrowRight size={15}/></Link></div>
   <div className="mt-5 space-y-3">{quests.length?quests.map(q=><div key={q.id} className="rounded-xl border border-slate-800 bg-slate-900/40 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-medium text-slate-100">{q.title}</p><p className="mt-1 text-sm leading-6 text-slate-400">{q.description}</p></div><span className="rounded-full bg-blue-500/10 px-2 py-1 text-xs text-blue-300">{q.priority.toLowerCase()}</span></div><p className="mt-3 text-xs text-slate-600">{q.category} · {q.status.toLowerCase().replace("_"," ")}</p></div>):<div className="rounded-xl border border-dashed border-slate-700 p-7 text-center"><p className="text-slate-300">No quests generated today.</p><p className="mt-1 text-sm text-slate-500">Generate your first set of personalised business activities.</p><div className="mt-4"><GenerateQuestsButton/></div></div>}</div>
  </div><div className="panel p-5"><div className="flex items-center justify-between"><div><h2 className="font-semibold text-white">Opportunity intelligence</h2><p className="mt-1 text-sm text-slate-500">Your saved opportunities</p></div><Link href="/dashboard/opportunities" className="text-sm text-blue-400">View all</Link></div>{opportunities.length?opportunities.map(o=><div key={o.id} className="mt-4 border-b border-slate-800 pb-4 last:border-0"><p className="font-medium text-slate-200">{o.title}</p><p className="mt-1 text-sm text-slate-500">{o.summary}</p></div>):<div className="mt-6 rounded-xl bg-slate-900/60 p-4 text-sm leading-6 text-slate-500">No verified opportunities have been added yet. Connect a trusted research workflow before displaying live market claims.</div>}</div></section>
 </div>;
}
