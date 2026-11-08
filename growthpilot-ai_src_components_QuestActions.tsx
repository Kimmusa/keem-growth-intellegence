"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles, Check } from "lucide-react";
export function GenerateQuestsButton(){const router=useRouter();const [busy,setBusy]=useState(false);const [msg,setMsg]=useState("");
 async function run(){setBusy(true);setMsg("");try{const r=await fetch("/api/quests/generate",{method:"POST"});const d=await r.json();if(!r.ok)throw new Error(d.error);setMsg(`Generated ${d.count} quests.`);router.refresh();}catch(e){setMsg(e instanceof Error?e.message:"Unable to generate quests.");}finally{setBusy(false);}}
 return <div><button onClick={run} disabled={busy} className="btn"><Sparkles size={16}/>{busy?"Generating…":"Generate daily quests"}</button>{msg&&<p className="mt-2 text-xs text-slate-400">{msg}</p>}</div>;
}
export function QuestStatusButton({id,status}:{id:string;status:string}){const router=useRouter();const [busy,setBusy]=useState(false);
 async function update(next:string){setBusy(true);try{const r=await fetch(`/api/quests/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({status:next})});if(!r.ok)throw new Error("Update failed");router.refresh();}catch(e){alert(e instanceof Error?e.message:"Update failed");}finally{setBusy(false);}}
 return status==="COMPLETED"?<span className="flex items-center gap-1 text-xs text-emerald-400"><Check size={14}/> Completed</span>:<button disabled={busy} onClick={()=>update("COMPLETED")} className="btn btn-secondary text-xs">Mark complete</button>;
}
