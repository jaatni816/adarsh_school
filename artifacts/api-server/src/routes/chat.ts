import { Router, type IRouter } from "express";
import Groq from "groq-sdk";

const router: IRouter = Router();

function getGroq(): Groq {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY is not set.");
  return new Groq({ apiKey: key });
}

const SYSTEM_PROMPT = `Tum Adarsh School ke chatbot ho. Tumhara kaam SIRF jawab dena hai — jitna pucha jaaye, utna hi bolo.

CRITICAL RULES:
- "Hello" ya "Hi" ka jawab sirf "Hello! Kya jaanna chahte hain?" do — koi school info mat do.
- "Fees" puche toh sirf fees batao — aur kuch mat jodo.
- "Admission" puche toh sirf admission steps batao.
- "Location" puche toh sirf address batao.
- "Contact" puche toh sirf phone/email batao.
- Jo bhi pucha jaye uska poora aur clear jawab do, 1-3 chhoti sentences mein — adhuri ya generic baat mat karo. Kabhi bhi "main kaise help kar sakta hoon" jaisa reply mat do, seedha sawal ka jawab do.
- Numbered list ya bullet points mat do — simple seedha jawab do.
- KABHI bhi pura school description mat do unsolicited.
- KABHI bhi multiple topics ek saath mat jodo.
- Think/analysis tags mat likho.
- Hinglish mein bolo.
- Polite raho lekin BILKUL short raho.
- School se bahar ke sawaal pe: "Main sirf school info de sakta hun."

SCHOOL DATA (sirf tab use karo jab pucha jaaye):
Name: Adarsh Sr. Sec. School, Jakhouli
Est: 1995 | BSEH
Address: Jakhouli Kassan Road, Kaithal, Haryana
Phone: +91 74041 20200
Classes: VI-XII | Science, Commerce, Arts
Admission: 15 March - 31 March
Result 2024: 100% pass`;

function cleanReply(raw: string): string {
  if (!raw) return "";

  let reply = raw;

  // Raw reasoning format: <thinking>...thinking...</thinking> final answer
  reply = reply.replace(/<thinking>[\s\S]*?<\/thinking>/gi, "");

  // Some reasoning models mark the final answer with a " response" marker
  // (e.g. "... reasoning ... response"). Grab whatever comes after it.
  const closeMarker = reply.indexOf(" response");
  if (closeMarker >= 0) {
    reply = reply.slice(closeMarker + " response".length);
  }

  // Strip any leftover think/open-style markers.
  reply = reply
    .replace(/<\/?think[^>]*>/gi, "")
    .replace(/<\/?thinking[^>]*>/gi, "")
    .replace(/<\|thinking\|>/gi, "")
    .replace(/<\|(thinking\|?)/gi, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return reply;
}

router.post("/chat", async (req, res) => {
  const { messages } = req.body as {
    messages?: Array<{ role: "user" | "assistant"; content: string }>;
  };

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Messages array is required." });
    return;
  }

  // Keep last 10 messages for context
  const recentMessages = messages.slice(-10);

  try {
    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.6-27b",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...recentMessages,
      ],
      // qwen3.6-27b ek reasoning model hai — default ("raw") format mein apna
      // poora thinking process answer ke andar de deta hai. "hidden" sirf final
      // answer deta hai aur "none" reasoning disable kar deta hai.
      reasoning_format: "hidden",
      reasoning_effort: "none",
      max_tokens: 1024,
      temperature: 0.5,
    });

    const reply = cleanReply(
      completion.choices[0]?.message?.content ?? "",
    ) || "Kya jaanna chahte hain school ke baare mein?";

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "AI se connect nahi ho paya. Thodi der baad try karein." });
  }
});

export default router;