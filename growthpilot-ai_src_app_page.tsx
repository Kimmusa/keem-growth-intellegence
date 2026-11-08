import Link from "next/link";
import { ArrowRight, BrainCircuit, Compass, Target, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Home() {
  return <main className="min-h-screen overflow-hidden">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-3 text-xl font-bold"><span className="rounded-xl bg-blue-600 p-2"><BrainCircuit size={23}/></span>GrowthPilot <span className="text-blue-400">AI</span></Link>
      <div className="flex items-center gap-3"><Link href="/login" className="px-4 py-2 text-sm text-slate-300">Log in</Link><Link href="/register" className="btn text-sm">Get started <ArrowRight size={16}/></Link></div>
    </nav>
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-2 lg:pt-24">
      <div>
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300"><span className="h-2 w-2 rounded-full bg-blue-400"/> Business growth intelligence, powered by AI</div>
        <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl">Turn business intelligence into <span className="text-blue-400">daily action.</span></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">Know what is happening in your market. Discover opportunities that matter. Get a clear plan for what to do today.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/register" className="btn">Start your growth journey <ArrowRight size={17}/></Link><a href="#how-it-works" className="btn btn-secondary">Explore the platform</a></div>
        <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400"><span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> Personalised daily priorities</span><span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400"/> Action-focused insights</span></div>
      </div>
      <div className="panel relative p-5 shadow-2xl shadow-blue-950/40">
        <div className="mb-5 flex items-center justify-between"><div><p className="text-xs uppercase tracking-widest text-slate-500">Executive command centre</p><h2 className="mt-1 text-xl font-semibold">Your growth briefing</h2></div><span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">Preview</span></div>
        <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4"><div className="flex items-center gap-2 text-sm font-semibold text-blue-300"><BrainCircuit size={17}/> AI executive briefing</div><p className="mt-3 text-lg font-semibold text-white">Make today count.</p><p className="mt-1 text-sm leading-6 text-slate-400">Focus on customer acquisition, operational execution and the next measurable business milestone.</p></div>
        <div className="mt-4 grid grid-cols-3 gap-3">{[["04","Daily quests"],["03","Opportunities"],["02","Tasks due"]].map(([n,l])=><div key={l} className="rounded-xl bg-slate-900/70 p-3"><p className="text-2xl font-bold text-white">{n}</p><p className="mt-1 text-xs text-slate-500">{l}</p></div>)}</div>
        <div className="mt-5 space-y-3"><p className="text-sm font-semibold">Today's suggested quests</p>{["Review your sales pipeline","Speak with three customers","Identify one process improvement"].map((t,i)=><div key={t} className="flex items-center gap-3 rounded-xl border border-slate-700/70 bg-slate-900/40 p-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/15 text-sm text-blue-300">0{i+1}</span><span className="flex-1 text-sm text-slate-200">{t}</span><Target size={16} className="text-slate-500"/></div>)}</div>
        <p className="mt-4 text-xs text-slate-600">Illustrative preview. Connect a business profile to generate personalised content.</p>
      </div>
    </section>
    <section id="how-it-works" className="border-t border-slate-800/80 bg-slate-950/30 px-6 py-20"><div className="mx-auto max-w-7xl"><p className="text-sm font-semibold uppercase tracking-widest text-blue-400">One intelligent workspace</p><h2 className="mt-3 max-w-2xl text-3xl font-bold text-white md:text-4xl">From knowing what matters to getting it done.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{[{icon:Compass,title:"Discover opportunities",desc:"Bring industry developments and relevant opportunities into one business-focused view."},{icon:BrainCircuit,title:"Get intelligent direction",desc:"Receive practical recommendations shaped around your business profile and goals."},{icon:TrendingUp,title:"Execute with accountability",desc:"Turn recommendations into quests, track progress and review what has been accomplished."}].map(x=><div key={x.title} className="panel p-6"><x.icon className="text-blue-400" size={25}/><h3 className="mt-5 text-lg font-semibold text-white">{x.title}</h3><p className="mt-2 leading-7 text-slate-400">{x.desc}</p></div>)}</div></div></section>
    <footer className="mx-auto flex max-w-7xl flex-wrap justify-between gap-3 px-6 py-8 text-sm text-slate-500"><span>© {new Date().getFullYear()} GrowthPilot AI</span><span>Business growth intelligence. Daily execution.</span></footer>
  </main>;
}
