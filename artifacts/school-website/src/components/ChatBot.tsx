import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY ?? '';

const SYSTEM_PROMPT = `Tum Adarsh School ke chatbot ho. Tumhara kaam SIRF jawab dena hai — jitna pucha jaaye, utna hi bolo.

CRITICAL RULES:
- "Hello" ya "Hi" ka jawab sirf "Hello! Kya jaanna chahte hain?" do — koi school info mat do.
- "Fees" puche toh sirf fees batao — aur kuch mat jodo.
- "Admission" puche toh sirf admission steps batao.
- "Location" puche toh sirf address batao.
- "Contact" puche toh sirf phone/email batao.
- Har jawab MAX 2 lines ka ho.
- KABHI bhi pura school description mat do unsolicited.
- KABHI bhi multiple topics ek saath mat jodo.
- Think tags mat likho.
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

const WELCOME: Message = {
  role: 'assistant',
  content: 'Hello! Kya jaanna chahte hain?',
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      if (!GROQ_API_KEY) {
        throw new Error('API_KEY_MISSING');
      }

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'qwen/qwen3.6-27b',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...updated.slice(-10),
          ],
          max_tokens: 256,
          temperature: 0.5,
        }),
      });

      const data = await res.json() as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      };

      if (data.error) {
        throw new Error(data.error.message ?? 'API Error');
      }

      const raw = data.choices?.[0]?.message?.content ?? '';
      let reply = raw
        .replace(/<think>[\s\S]*?<\/think>/gi, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      if (reply.includes('<think>')) reply = reply.split('<think>')[0].trim();
      if (!reply) reply = 'Kya jaanna chahte hain school ke baare mein?';
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      const msg = err instanceof Error && err.message === 'API_KEY_MISSING'
        ? 'API key set nahi hai. VITE_GROQ_API_KEY env variable set karein.'
        : 'AI se connect nahi ho paya. Internet ya API key check karein.';
      setMessages((prev) => [...prev, { role: 'assistant', content: msg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpen(true)}
              className="w-14 h-14 rounded-full bg-secondary text-white shadow-lg hover:shadow-xl flex items-center justify-center relative"
              aria-label="Open chatbot"
            >
              <MessageCircle className="w-6 h-6" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-secondary/40 animate-ping" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[380px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-border bg-white"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">Adarsh Assistant</p>
                <p className="text-primary-foreground/60 text-xs">School ka AI Sahayak • Always online</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50/60">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 items-end ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'assistant' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {msg.role === 'assistant'
                      ? <Bot className="w-4 h-4 text-white" />
                      : <User className="w-4 h-4 text-white" />
                    }
                  </div>
                  {/* Bubble */}
                  <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-secondary text-white rounded-br-sm'
                      : 'bg-white text-foreground border border-border rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2 items-end"
                >
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex gap-2 flex-wrap border-t border-border bg-white shrink-0">
                {['Admission kaise karein?', 'Fees kitni hai?', 'School ki location?'].map((q) => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); setTimeout(sendMessage, 50); }}
                    className="text-xs px-3 py-1.5 rounded-full border border-secondary/30 text-secondary hover:bg-secondary hover:text-white transition-colors font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-border bg-white flex gap-2 items-center shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Kuch bhi poochein..."
                disabled={loading}
                className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary bg-gray-50 focus:bg-white transition-colors disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center hover:bg-secondary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
                aria-label="Send"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
