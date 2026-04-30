import { motion } from 'motion/react';
import { ArrowLeft, Play, Info, List as ListIcon } from 'lucide-react';
import { Topic, Section } from '../data/moduleContent';

interface TopicViewProps {
  topic: Topic;
  onBack: () => void;
  onStartQuiz: () => void;
}

export default function TopicView({ topic, onBack, onStartQuiz }: TopicViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 md:p-10 max-w-4xl mx-auto space-y-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Dashboard
      </button>

      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">{topic.title}</h1>
        <p className="text-xl text-gray-500 italic serif">{topic.description}</p>
      </header>

      <div className="space-y-12 pb-24">
        {topic.sections.map((section, idx) => (
          <SectionCard key={section.id} section={section} index={idx} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-600 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Ready to test your knowledge?</h3>
            <p className="text-indigo-100 italic">Complete the module quiz to earn Expertise XP.</p>
          </div>
          <button
            onClick={onStartQuiz}
            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center"
          >
            <Play className="w-5 h-5 mr-2 fill-current" />
            Start Module Quiz
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function SectionCard({ section, index }: { section: Section; index: number }) {
  const isList = section.type === 'list';
  const isInfo = section.type === 'info';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      viewport={{ once: true }}
      className={`p-8 rounded-3xl border ${
        isInfo ? 'bg-amber-50 border-amber-100' : 'bg-white border-gray-100 shadow-sm'
      }`}
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 rounded-lg ${isInfo ? 'bg-amber-200 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
          {isList ? <ListIcon className="w-5 h-5" /> : isInfo ? <Info className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
        </div>
        <h2 className="text-2xl font-bold">{section.title}</h2>
      </div>

      <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed text-lg">
        {section.content.split('\n').map((line, i) => (
          <p key={i} className={isList ? 'mb-2 flex items-start' : 'mb-4'}>
            {isList && <span className="mr-3 text-indigo-600 font-bold">•</span>}
            {line}
          </p>
        ))}
      </div>
    </motion.section>
  );
}

function BookOpen(props: any) {
    return <BookOpenIcon {...props} />
}

import { BookOpen as BookOpenIcon } from 'lucide-react';
