"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrainCircuit } from "lucide-react";

export default function AuthForm({mode}:{mode:"login"|"register"}) {
  const router=useRouter(); const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");try{
    const res=await fetch(`/api/auth/${mode}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,password})});
    const data=await res.json();if(!res.ok)throw new Error(data.error||"Unable to continue.");
    router.push(mode==="register"?"/onboarding":"/dashboard");router.refresh();
  }catch(err){setError(err instanceof Error?err.message:"Something went wrong.");}finally{setBusy(false);}}
  return <main className="flex min-h-screen items-center justify-center px-5 py-12"><div className="panel w-full max-w-md p-8">
    <Link href="/" className="mb-8 flex items-center gap-3 text-xl font-bold"><span className="rounded-xl bg-blue-600 p-2"><BrainCircuit size={22}/></span>GrowthPilot <span className="text-blue-400">AI</span></Link>
    <h1 className="text-2xl font-bold text-white">{mode==="login"?"Welcome back":"Create your account"}</h1><p className="mt-2 text-sm text-slate-400">{mode==="login"?"Sign in to your executive workspace.":"Start building a more intelligent business routine."}</p>
    <form onSubmit={submit} className="mt-7 space-y-4">
      {mode==="register"&&<label className="block text-sm text-slate-300">Full name<input className="input mt-2" value={name} onChange={e=>setName(e.target.value)} required minLength={2}/></label>}
      <label className="block text-sm text-slate-300">Email address<input className="input mt-2" type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
      <label className="block text-sm text-slate-300">Password<input className="input mt-2" type="password" autoComplete={mode==="login"?"current-password":"new-password"} value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/></label>
      {error&&<p role="alert" className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      <button className="btn w-full" disabled={busy}>{busy?"Please wait…":mode==="login"?"Sign in":"Create account"}</button>
    </form>
    <p className="mt-6 text-center text-sm text-slate-400">{mode==="login"?"New to GrowthPilot AI?":"Already have an account?"} <Link className="text-blue-400 hover:underline" href={mode==="login"?"/register":"/login"}>{mode==="login"?"Create an account":"Sign in"}</Link></p>
  </div></main>;
}
