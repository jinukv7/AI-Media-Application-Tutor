import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Gamepad2, 
  MessageSquare, 
  Trophy, 
  ChevronRight,
  Brain,
  Zap,
  ShieldAlert,
  Settings,
  Rocket
} from 'lucide-react';
import { topics, Topic } from './data/moduleContent';
import TopicView from './views/TopicView';
import QuizView from './views/QuizView';
import TutorChat from './views/TutorChat';
import GamesView from './views/GamesView';

type ViewState = 'dashboard' | 'topic' | 'quiz' | 'chat' | 'games';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [score, setScore] = useState(0);

  const navigateToTopic = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('topic');
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Trophy },
    { id: 'chat', label: 'AI Tutor', icon: MessageSquare },
    { id: 'games', label: 'Play & Learn', icon: Gamepad2 },
  ];

  return (
    <div id="app-container" className="min-h-screen bg-[#f5f5f0] flex flex-col md:flex-row text-[#1a1a1a] font-sans">
      {/* Sidebar - Desktop */}
      <nav id="sidebar" className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col p-4 space-y-6 md:h-screen">
        <div id="logo-section" className="flex items-center space-x-2 px-2 py-4 border-b border-gray-100">
          <Brain className="w-8 h-8 text-indigo-600" />
          <span className="font-bold text-xl tracking-tight">AI Media Master</span>
        </div>

        <div id="nav-links" className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewState)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${
                currentView === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <div id="user-stats" className="p-4 bg-indigo-50 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">Expertise Rank</span>
            <Trophy className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-xl font-bold">Novice Agent</div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((score / 500) * 100, 100)}%` }}
              className="h-full bg-indigo-600" 
            />
          </div>
          <div className="mt-1 text-[10px] text-gray-500 text-right">{score} / 500 XP</div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 h-screen overflow-y-auto overflow-x-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 md:p-10 max-w-5xl mx-auto space-y-10"
            >
              <header id="welcome-header">
                <h1 className="text-4xl font-bold tracking-tight">Ready for the Exam?</h1>
                <p className="text-gray-500 mt-2 text-lg italic tracking-tight">Welcome back, Agent. Your personal mission to master AI Media starts here.</p>
              </header>

              <section id="topic-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {topics.map((topic, idx) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => navigateToTopic(topic)}
                    id={`topic-card-${topic.id}`}
                    className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-500" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                        {topic.id === 'intro' && <Brain className="w-6 h-6" />}
                        {topic.id === 'ml' && <Zap className="w-6 h-6" />}
                        {topic.id === 'gen-ai' && <Settings className="w-6 h-6" />}
                        {topic.id === 'prompt-eng' && <BookOpen className="w-6 h-6" />}
                        {topic.id === 'ethics' && <ShieldAlert className="w-6 h-6" />}
                        {topic.id === 'production' && <Rocket className="w-6 h-6" />}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{topic.description}</p>
                      <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm">
                        <span>Start Mission</span>
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </section>
            </motion.div>
          )}

          {currentView === 'topic' && selectedTopic && (
            <TopicView 
              key="topic-view"
              topic={selectedTopic} 
              onBack={() => setCurrentView('dashboard')}
              onStartQuiz={() => setCurrentView('quiz')}
            />
          )}

          {currentView === 'quiz' && selectedTopic && (
            <QuizView
              key="quiz-view"
              topic={selectedTopic}
              onBack={() => setCurrentView('topic')}
              onFinish={(points) => {
                setScore(s => s + points);
                setCurrentView('dashboard');
              }}
            />
          )}

          {currentView === 'chat' && (
            <TutorChat key="chat-view" onBack={() => setCurrentView('dashboard')} />
          )}

          {currentView === 'games' && (
            <GamesView key="games-view" onBack={() => setCurrentView('dashboard')} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
