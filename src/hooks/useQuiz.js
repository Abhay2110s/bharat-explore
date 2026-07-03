import { useState, useEffect, useCallback } from 'react';

export function useQuiz({ questions, timed = false, timePerQuestion = 10 }) {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  const [isFinished, setIsFinished] = useState(false);

  const start = useCallback(({ category = 'all' } = {}) => {
    let filtered = questions;
    if (category !== 'all') {
      filtered = questions.filter(q => q.category === category);
    }
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    setQueue(shuffled);
    setCurrentIndex(0);
    setAnswers([]);
    setScore(0);
    setTimeLeft(timePerQuestion);
    setIsFinished(false);
  }, [questions, timePerQuestion]);

  const answer = useCallback((index) => {
    if (isFinished || currentIndex >= queue.length) return;
    const question = queue[currentIndex];
    const isCorrect = index === question.answer;
    setAnswers(prev => [...prev, index]);
    setScore(prev => prev + (isCorrect ? 1 : 0));
    setCurrentIndex(prev => prev + 1);
    setTimeLeft(timePerQuestion);
  }, [currentIndex, queue, isFinished, timePerQuestion]);

  useEffect(() => {
    if (!timed || isFinished || currentIndex >= queue.length) return;
    if (timeLeft <= 0) {
      answer(-1);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timed, timeLeft, answer, isFinished, currentIndex, queue.length]);

  useEffect(() => {
    if (currentIndex >= queue.length && queue.length > 0) {
      setIsFinished(true);
    }
  }, [currentIndex, queue.length]);

  const currentQuestion = queue[currentIndex] || null;
  const total = queue.length;

  return {
    currentQuestion,
    questionNumber: currentIndex + 1,
    total,
    answers,
    score,
    timeLeft,
    isFinished,
    start,
    answer,
  };
}
