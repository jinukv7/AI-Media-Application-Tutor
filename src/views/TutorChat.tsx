import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, Bot, Loader2, ArrowLeft, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';
import { topics } from '../data/moduleContent';

const SYSTEM_INSTRUCTION = `You are a professional AI Media Tutor. Your goal is to help students prepare for their exams based ONLY on the provided module content.

The module covers:
1. Intro to AI: Turing Test, Birth (1956), Expert Systems, Deep Blue.
2. ML Paradigms: Supervised (Labeled data/Ground Truth), Unsupervised (Unlabeled/Clustering), Reinforcement (Trial/Error).
3. Supervised: Regression vs Classification.
4. Generative AI: Prompt Engineering (RISE/CODE frameworks), Token Economy (rough rule: 1000 tokens ≈ 750 words), Context Windows, Transformers (2017 Breakthrough).
5. Architecture: GANs (Generator vs Discriminator), Diffusion (Forward noise vs Reverse denoising).
6. Ethics: Dr. Ruha Benjamin's "The New Jim Code" (Engineered Inequality, Coded Exposure, Techno-Benevolence), Fair Use (4 factors).

Guidelines:
- Keep answers concise, academic, and encouraging.
- If asked about something outside the module, gently pivot back to core concepts.
- Use formatting (bolding, lists) to make explanations scannable.
- You can explain complex concepts using analogies provided in the module (e.g., GANs as "Forger vs Expert").
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function TutorChat({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello, Agent. I'm your dedicated AI Media Tutor. Which module concepts should we analyze today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is missing from environment');
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMessage].map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "I apologize, Agent. I encountered a signal disruption. Could you repeat that?";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Error connecting to tutor neural network. Please check your config." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 md:p-10">
      <header className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-indigo-600 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Dashboard
        </button>
        <div className="flex items-center space-x-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
          <Bot className="w-5 h-5 text-indigo-600" />
          <span className="font-bold text-indigo-600 text-sm">Neural Tutor Active</span>
        </div>
      </header>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 mb-6 pr-2 scrollbar-thin scrollbar-thumb-indigo-200"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] space-x-3 ${m.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-100 shadow-sm text-indigo-600'
                }`}>
                  {m.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                <div className={`p-5 rounded-3xl text-[17px] leading-relaxed shadow-sm ${
                  m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-100 rounded-tl-none text-gray-800'
                }`}>
                  <div className="markdown-body">
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center space-x-3 text-indigo-400">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm font-medium animate-pulse">Consulting Knowledge Base...</span>
             </div>
          </div>
        )}
      </div>

      <footer className="relative">
        <div className="absolute -top-12 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-indigo-50/50 backdrop-blur px-4 py-1 rounded-full text-[10px] text-indigo-400 font-bold uppercase tracking-widest border border-indigo-100/50">
                Powered by Gemini LLM • Module Verified
            </div>
        </div>
        <div className="bg-white border border-gray-100 shadow-2xl p-2 rounded-[32px] flex items-center pr-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about AI Media..."
            className="flex-1 px-6 py-4 bg-transparent outline-none text-lg"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-95"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}
