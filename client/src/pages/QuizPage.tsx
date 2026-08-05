import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/common/Footer';
import { useQuiz } from '@/hooks/useDictionary';
import { toast } from 'sonner';

const DIFFICULTIES = ['easy', 'medium', 'hard', 'mixed'];

export default function QuizPage() {
  const { quiz, loading, generate, submit } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);
  const [difficulty, setDifficulty] = useState('mixed');

  const handleGenerate = useCallback(async () => {
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setShowResult(false);
    await generate(10, difficulty);
  }, [generate, difficulty]);

  const handleAnswer = useCallback((answer: string) => {
    if (selected) return;
    setSelected(answer);
    setShowResult(true);
    const correct = quiz?.questions[currentIndex]?.answer;
    if (answer === correct) setScore((s) => s + 1);
  }, [selected, quiz, currentIndex]);

  const handleNext = useCallback(() => {
    if (!quiz) return;
    if (currentIndex + 1 >= quiz.questions.length) {
      setFinished(true);
      submit(score + (selected === quiz.questions[currentIndex]?.answer ? 0 : 0), quiz.questions.length, difficulty)
        .catch(() => {});
      toast.success('Quiz complete!');
    } else {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setShowResult(false);
    }
  }, [quiz, currentIndex, score, selected, submit, difficulty]);

  const q = quiz?.questions[currentIndex];
  const totalCorrect = score + (showResult && selected === q?.answer ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 mx-auto max-w-2xl w-full px-4 sm:px-6 pt-12 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-orange-50 mb-5">
            <GraduationCap className="h-7 w-7 text-orange-500" />
          </div>
          <h1 className="font-display text-[36px] font-extrabold text-navy">Vocabulary Quiz</h1>
          <p className="text-navy/50 mt-2">Test your word knowledge</p>
        </motion.div>

        {!quiz ? (
          <div className="card-premium p-8 text-center">
            <p className="text-navy/50 mb-5 text-[15px]">Choose difficulty and start the quiz</p>
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${difficulty === d ? 'bg-orange-500 text-white shadow-md' : 'bg-cream-200 text-navy/60 hover:bg-cream-300'}`}
                >
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </button>
              ))}
            </div>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="btn-gradient h-12 px-8 flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {loading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" /> : 'Start Quiz'}
            </button>
          </div>
        ) : finished ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-premium p-10 text-center">
            <div className="text-[64px] font-extrabold text-navy mb-2">{Math.round((totalCorrect / quiz.questions.length) * 100)}%</div>
            <p className="text-navy/50 text-[15px] mb-6">{totalCorrect} of {quiz.questions.length} correct</p>
            <button onClick={handleGenerate} className="btn-gradient h-12 px-8 flex items-center gap-2 mx-auto">
              <RotateCcw className="h-5 w-5" /> Try Again
            </button>
          </motion.div>
        ) : q ? (
          <div className="card-premium p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-semibold text-navy/40 uppercase tracking-wider">
                Question {currentIndex + 1} / {quiz.questions.length}
              </span>
              <span className="text-xs font-semibold text-orange-500">Score: {score}</span>
            </div>
            <h2 className="text-[18px] font-semibold text-navy mb-6">{q.question}</h2>
            <div className="grid gap-3">
              {q.options.map((opt) => {
                const isCorrect = opt === q.answer;
                const isSelected = opt === selected;
                let cls = 'border-border bg-card hover:border-orange-300 hover:bg-orange-50/50';
                if (showResult && isCorrect) cls = 'border-green-300 bg-green-50 text-green-700';
                else if (showResult && isSelected && !isCorrect) cls = 'border-red-300 bg-red-50 text-red-600';

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    disabled={!!selected}
                    className={`p-4 rounded-2xl border text-left text-[15px] font-medium transition-all ${cls}`}
                  >
                    <span className="flex items-center gap-3">
                      {showResult && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-400 shrink-0" />}
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
            {showResult && q.explanation && (
              <p className="mt-4 p-4 rounded-xl bg-cream-200 text-sm text-navy/60">{q.explanation}</p>
            )}
            {showResult && (
              <button onClick={handleNext} className="btn-gradient h-11 px-6 mt-6 w-full">
                {currentIndex + 1 >= quiz.questions.length ? 'See Results' : 'Next Question'}
              </button>
            )}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
