import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Topic, Question } from '../data/moduleContent';

interface QuizViewProps {
  topic: Topic;
  onBack: () => void;
  onFinish: (points: number) => void;
}

export default function QuizView({ topic, onBack, onFinish }: QuizViewProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = topic.quiz[currentQuestionIdx];

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4f46e5', '#818cf8', '#c7d2fe']
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < topic.quiz.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const totalPoints = correctCount * 50;
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-10 mt-12 bg-white rounded-[40px] shadow-2xl text-center space-y-8"
      >
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-12 h-12 text-indigo-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold italic tracking-tight">Mission Accomplished</h2>
          <p className="text-gray-500 text-lg">You've successfully analyzed {topic.title}.</p>
        </div>
        
        <div className="py-8 bg-indigo-50 rounded-3xl">
          <div className="text-6xl font-black text-indigo-600">+{totalPoints}</div>
          <div className="text-indigo-400 font-bold uppercase tracking-widest text-sm mt-2">Expertise XP Earned</div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onFinish(totalPoints)}
            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl hover:bg-indigo-700 transition-colors"
          >
            Claim Rewards
          </button>
          <button
            onClick={() => {
              setCurrentQuestionIdx(0);
              setCorrectCount(0);
              setIsAnswered(false);
              setSelectedOption(null);
              setShowResult(false);
            }}
            className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-10 space-y-8">
      <div className="flex items-center justify-between">
        <span className="px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold uppercase tracking-wider">
          Module Quiz: {topic.title}
        </span>
        <span className="text-gray-400 font-medium">Question {currentQuestionIdx + 1}/{topic.quiz.length}</span>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold leading-tight">{currentQuestion.text}</h2>
        
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, idx) => {
            const isCorrect = idx === currentQuestion.correctAnswer;
            const isSelected = idx === selectedOption;
            
            let btnClass = "bg-white border-2 border-gray-100";
            if (isAnswered) {
              if (isCorrect) btnClass = "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-100";
              else if (isSelected) btnClass = "bg-rose-50 border-rose-500 text-rose-700";
              else btnClass = "bg-gray-50 border-gray-100 opacity-50";
            } else {
              btnClass = "hover:border-indigo-600 hover:bg-indigo-50/50 cursor-pointer";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full p-6 rounded-2xl text-left font-medium text-lg transition-all flex items-center justify-between ${btnClass}`}
              >
                <span>{option}</span>
                {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4"
          >
            <div>
              <span className="font-bold text-indigo-900 block mb-1">Agent Insight:</span>
              <p className="text-indigo-700">{currentQuestion.explanation}</p>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center group"
            >
              {currentQuestionIdx === topic.quiz.length - 1 ? 'Finish Mission' : 'Next Question'}
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
