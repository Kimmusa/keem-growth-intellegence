import OpenAI from "openai";
import { z } from "zod";

const apiKey = process.env.OPENAI_API_KEY;
const client = apiKey ? new OpenAI({ apiKey }) : null;
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";

export async function generateQuests(business: {
  name: string; category: string; subcategory: string | null; location: string;
  products: string | null; targetCustomers: string | null; goals: string | null; challenges: string | null;
}) {
  if (!client) return fallbackQuests(business);
  const schema = z.object({ quests: z.array(z.object({
    title: z.string(), description: z.string(), rationale: z.string(),
    expectedBenefit: z.string(), category: z.string(),
    priority: z.enum(["LOW","MEDIUM","HIGH","URGENT"]),
    estimatedMinutes: z.number().int().min(5).max(480),
    completionCriteria: z.string()
  })).min(3).max(5) });
  const response = await client.chat.completions.create({
    model, temperature: 0.4,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You are GrowthPilot AI, a cautious business growth strategist. Return JSON only with a quests array containing 3 to 5 specific, realistic, measurable business activities for today. Tailor to the business context. Do not invent market facts, events, grants, customer demand, financial returns, or claim research was performed. Prefer actions the owner can execute with limited resources. Avoid generic advice." },
      { role: "user", content: JSON.stringify({ date: new Date().toISOString().slice(0,10), business }) }
    ]
  });
  const raw = response.choices[0]?.message?.content || "{}";
  const parsed = schema.parse(JSON.parse(raw));
  return parsed.quests;
}

function fallbackQuests(b: {name:string;category:string;location:string;goals:string|null}) {
  return [
    { title: "Review your highest-priority business goal", description: "Spend 20 minutes reviewing progress against one current business goal and record the next measurable action.", rationale: `Keeps ${b.name}'s daily activity aligned with its stated direction.`, expectedBenefit: "Clearer priorities and visible progress.", category: "Strategy", priority: "HIGH" as const, estimatedMinutes: 20, completionCriteria: "Record one progress update and one next action." },
    { title: "Speak with three existing or prospective customers", description: "Ask about a current need, buying barrier or experience with your product or service.", rationale: "Direct customer conversations can reveal practical improvements.", expectedBenefit: "Better customer understanding and potential sales follow-up.", category: "Sales", priority: "HIGH" as const, estimatedMinutes: 45, completionCriteria: "Log three conversations or attempts and their outcomes." },
    { title: "Identify one operational improvement", description: "Review a repeated task and identify one small change that could save time or reduce errors.", rationale: "Operational improvements can free up capacity.", expectedBenefit: "A documented process improvement to test.", category: "Operations", priority: "MEDIUM" as const, estimatedMinutes: 30, completionCriteria: "Document the issue and one proposed improvement." },
    { title: "Plan one focused visibility activity", description: "Prepare a useful update about a product, service or customer problem for one relevant communication channel.", rationale: `Builds consistent visibility for a ${b.category} business in ${b.location}.`, expectedBenefit: "A ready-to-publish piece of customer-facing communication.", category: "Marketing", priority: "MEDIUM" as const, estimatedMinutes: 30, completionCriteria: "Prepare and schedule or publish one relevant update." }
  ];
}

export async function askAdvisor(question: string, businessContext: unknown) {
  if (!client) return "AI is not configured yet. Add OPENAI_API_KEY to your environment to enable the GrowthPilot advisor. In the meantime, review your business goals and break the next milestone into one measurable action.";
  const result = await client.chat.completions.create({
    model, temperature: 0.3,
    messages: [
      { role: "system", content: "You are GrowthPilot AI, a practical business advisor. Use the supplied business profile as context. Be specific and realistic. Clearly label assumptions. Do not fabricate market research, citations, grants, events, competitor facts or guaranteed financial outcomes. When current facts are needed, tell the user that independent research and source verification are required." },
      { role: "user", content: `Business context: ${JSON.stringify(businessContext)}\n\nQuestion: ${question}` }
    ]
  });
  return result.choices[0]?.message?.content || "I couldn't generate a response. Please try again.";
}
