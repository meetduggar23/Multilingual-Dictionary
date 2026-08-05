import { useState, useCallback, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useDictionary } from '@/hooks/useDictionary';
import { escapeHtml } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function renderLine(line: string): string {
  return escapeHtml(line)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}

export default function AIAssistantPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your AI dictionary assistant. Ask me about any word — I can explain meanings, give examples, suggest synonyms, and more.' },
  ]);
  const { search } = useDictionary();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simple AI-like response using dictionary data
    const word = input.replace(/^(what is|define|meaning of|tell me about|explain)\s+/i, '').trim();
    const results = await search(word);

    if (results && results.length > 0) {
      const entry = results[0];
      const meanings = entry.meanings.map((m) => {
        const defs = m.definitions.slice(0, 2).map((d) => d.definition).join('; ');
        return `**${m.partOfSpeech}:** ${defs}`;
      }).join('\n');

      const response = `Here's what I found for **"${entry.word}"**:\n\n${meanings}\n\nWould you like synonyms, examples, or more details?`;
      setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    } else {
      setMessages((prev) => [...prev, { role: 'assistant', content: `I couldn't find a definition for "${word}". Try a different word or check the spelling.` }]);
    }
  }, [input, search]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-3xl w-full px-4 sm:px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <Sparkles className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-navy">AI Assistant</h1>
          <p className="text-navy/50 mt-2">Ask anything about words and language</p>
        </motion.div>

        {/* Chat area */}
        <div className="card-premium overflow-hidden flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto p-6 space-y-5 scrollbar-none">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-orange-50 shrink-0 mt-0.5">
                    <Bot className="h-4 w-4 text-orange-500" />
                  </div>
                )}
                <div className={`max-w-[80%] p-4 rounded-2xl text-[14px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-orange-500 text-white rounded-br-sm'
                    : 'bg-cream-200 text-navy rounded-bl-sm'
                }`}>
                  {msg.content.split('\n').map((line, j) => (
                    <p key={j} className={j > 0 ? 'mt-2' : ''} dangerouslySetInnerHTML={{
                      __html: renderLine(line)
                    }} />
                  ))}
                </div>
                {msg.role === 'user' && (
                  <div className="h-8 w-8 flex items-center justify-center rounded-xl bg-orange-500 shrink-0 mt-0.5">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-cream-300 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about any word..."
                className="flex-1 h-11 bg-cream-100 rounded-xl px-4 text-sm text-navy placeholder:text-cream-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="h-11 w-11 flex items-center justify-center rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition-all disabled:opacity-50 shrink-0"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
