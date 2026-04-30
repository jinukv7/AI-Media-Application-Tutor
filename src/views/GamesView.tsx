import { useState } from 'react';
import { motion, Reorder } from 'motion/react';
import { ArrowLeft, Rocket, Box, Brain, Sparkles, CheckCircle, RefreshCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

type GameType = 'prompt' | 'gan' | 'token';

export default function GamesView({ onBack }: { onBack: () => void }) {
  const [activeGame, setActiveGame] = useState<GameType | null>(null);

  if (activeGame === 'prompt') return <PromptBuilderGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'gan') return <DiscriminatorDuelGame onBack={() => setActiveGame(null)} />;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Dashboard
      </button>

      <header className="text-center space-y-4">
        <h1 className="text-5xl font-black italic tracking-tighter text-indigo-900">SIMULATION ROOM</h1>
        <p className="text-gray-500 text-lg serif italic">Apply your theoretical knowledge in tactical AI scenarios.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <GameCard 
          title="RISE Architect"
          description="Build a high-quality prompt by correctly sequencing the R-I-S-E elements."
          icon={Rocket}
          color="bg-indigo-500"
          onClick={() => setActiveGame('prompt')}
        />
        <GameCard 
          title="Discriminator Duel"
          description="Identify AI-generated artifacts in medical and finance reports."
          icon={Brain}
          color="bg-rose-500"
          onClick={() => setActiveGame('gan')}
        />
        <GameCard 
          title="Token Tightrope"
          description="Trim content to fit context windows without losing ground truth."
          icon={Box}
          color="bg-amber-500"
          disabled
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

// ... PromptBuilderGame code ...

const DUEL_LEVELS = [
  {
    title: "The Medical Filter",
    context: "Which of these medical summaries shows signs of 'Techno-Benevolence' (hallucinated fairness)?",
    options: [
      { text: "Patient shows 85% recovery rate. Recommending standard follow-up based on historical clinical trials including diverse ethnic groups.", isAI: false },
      { text: "Patient is healthy because the AI algorithm has been optimized to ignore all demographic friction for maximum clinical smoothness.", isAI: true }
    ],
    explanation: "The second option uses 'Techno-Benevolence'—claiming to fix bias by ignoring demographics, which actually encodes existing inequality."
  },
  {
    title: "Token Economy",
    context: "Which summary correctly describes the relationship between tokens and words?",
    options: [
      { text: "1,000 tokens is roughly 750 words. This is a key BUDGETING constraint.", isAI: false },
      { text: "1 token equals 1 word exactly, meaning LLMs read exactly like humans do.", isAI: true }
    ],
    explanation: "LLMs process text in chunks (tokens), not word-by-word. 1000 tokens ≈ 750 words."
  }
];

function DiscriminatorDuelGame({ onBack }: { onBack: () => void }) {
  const [levelIdx, setLevelIdx] = useState(0);
  const [selectedIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);

  const level = DUEL_LEVELS[levelIdx];

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedOptionIdx(idx);
    if (level.options[idx].isAI) {
        confetti({ particleCount: 50, colors: ['#f43f5e'] });
    }
  };

  const next = () => {
    if (levelIdx < DUEL_LEVELS.length - 1) {
      setLevelIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
    } else {
      setIsDone(true);
    }
  };

  if (isDone) {
    return (
        <div className="p-10 text-center space-y-6">
            <h2 className="text-3xl font-bold">Training Complete</h2>
            <p className="text-gray-500 italic">Your internal discriminator model is now more robust.</p>
            <button onClick={onBack} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold">Return to HUD</button>
        </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-10">
      <button onClick={onBack} className="text-gray-500 flex items-center font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Simulation HUD
      </button>

      <div className="space-y-4">
        <h2 className="text-3xl font-black italic tracking-tighter text-rose-600 uppercase">DISCRIMINATOR DUEL</h2>
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
            <p className="font-bold text-rose-900">{level.title}</p>
            <p className="text-rose-700">{level.context}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {level.options.map((opt, i) => (
          <motion.div
            key={i}
            whileHover={selectedIdx === null ? { scale: 1.01 } : {}}
            onClick={() => handleSelect(i)}
            className={`p-8 rounded-3xl border-2 transition-all cursor-pointer ${
              selectedIdx === i 
                ? (opt.isAI ? 'border-rose-500 bg-rose-50 shadow-lg' : 'border-emerald-500 bg-emerald-50 shadow-lg')
                : 'border-gray-100 hover:border-indigo-200 bg-white'
            }`}
          >
            <p className="text-lg font-medium leading-relaxed">{opt.text}</p>
          </motion.div>
        ))}
      </div>

      {selectedIdx !== null && (
          <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
            <p className="font-bold mb-2">Analysis Result:</p>
            <p className="text-gray-700 italic border-l-4 border-indigo-500 pl-4 py-1">{level.explanation}</p>
            <button onClick={next} className="mt-6 w-full py-4 bg-indigo-600 text-white font-bold rounded-xl">Continue Analysis</button>
          </div>
      )}
    </div>
  );
}

function GameCard({ title, description, icon: Icon, color, onClick, disabled }: any) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02, y: -5 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={`p-8 rounded-[32px] border border-gray-100 flex flex-col h-full bg-white shadow-sm transition-all ${
        disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'
      }`}
    >
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 flex-1 leading-relaxed">{description}</p>
      {!disabled && (
        <div className="mt-8 pt-6 border-t border-gray-50 text-indigo-600 font-bold flex items-center">
          Launch Training <Sparkles className="w-4 h-4 ml-2" />
        </div>
      )}
      {disabled && (
          <div className="mt-8 pt-6 border-t border-gray-50 text-gray-400 font-bold">
            Locked Stage
          </div>
      )}
    </motion.div>
  );
}

const PROMPT_PARTS = [
  { id: 'R', tag: 'ROLE', text: 'Act as a professional data analyst.', correctIdx: 0 },
  { id: 'I', tag: 'INSTRUCTION', text: 'Summarize the user feedback provided below.', correctIdx: 1 },
  { id: 'S', tag: 'SPECIFICS', text: 'Focus on recurring bugs and limit to 3 paragraphs.', correctIdx: 2 },
  { id: 'E', tag: 'EXAMPLES', text: 'Output as a bulleted list with priority ratings.', correctIdx: 3 },
];

function PromptBuilderGame({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState(() => [...PROMPT_PARTS].sort(() => Math.random() - 0.5));
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkOrder = () => {
    const correct = items.every((item, idx) => item.correctIdx === idx);
    setHasChecked(true);
    setIsCorrect(correct);
    if (correct) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.8 }
      });
    }
  };

  const reset = () => {
    setItems([...PROMPT_PARTS].sort(() => Math.random() - 0.5));
    setHasChecked(false);
    setIsCorrect(false);
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto space-y-10">
      <button onClick={onBack} className="text-gray-500 flex items-center font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Simulation HUD
      </button>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
            <span className="bg-indigo-600 text-white p-2 rounded-lg"><Rocket className="w-6 h-6" /></span>
            <h2 className="text-3xl font-black italic">RISE ARCHITECT</h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          Order these prompt components following the <span className="font-bold text-indigo-600 italic">R-I-S-E</span> framework architecture.
        </p>
      </div>

      <div className="bg-indigo-900 p-8 rounded-[40px] shadow-2xl relative">
        <div className="absolute top-4 right-8 flex space-x-2">
            {[0,1,2,3].map(i => (
                <div key={i} className={`w-2 h-2 rounded-full ${hasChecked ? (isCorrect ? 'bg-emerald-400' : 'bg-rose-400') : 'bg-indigo-700 animate-pulse'}`} />
            ))}
        </div>
        
        <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-4">
          {items.map((item) => (
            <Reorder.Item 
              key={item.id} 
              value={item}
              className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl cursor-grab active:cursor-grabbing hover:bg-white/15 transition-all text-white flex items-center space-x-6"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/50 flex items-center justify-center font-black text-xs shrink-0">
                {item.id}
              </div>
              <div>
                <div className="text-[10px] font-black tracking-[0.2em] text-indigo-300 uppercase mb-1">{item.tag}</div>
                <div className="font-medium text-lg leading-tight">{item.text}</div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>

        <div className="mt-10 space-y-4">
          {!hasChecked ? (
            <button
              onClick={checkOrder}
              className="w-full py-5 bg-indigo-500 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-400 transition-all flex items-center justify-center uppercase tracking-widest"
            >
              Validate Sequence
            </button>
          ) : (
            <div className="space-y-4 text-center">
              {isCorrect ? (
                <div className="text-emerald-400 font-bold flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 mb-2" />
                  <div className="text-2xl italic">Architecture Perfect. +100 XP</div>
                </div>
              ) : (
                <div className="text-rose-400 font-bold flex flex-col items-center">
                  <div className="text-2xl italic">Logic Error Detected.</div>
                </div>
              )}
              <button
                onClick={reset}
                className="mx-auto flex items-center text-white/60 hover:text-white transition-colors"
              >
                <RefreshCcw className="w-4 h-4 mr-2" /> Reboot Simulation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
