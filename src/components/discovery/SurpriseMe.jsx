import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import { Sparkles, MapPin, X, RotateCcw, Heart, Compass } from 'lucide-react';
import { ExplorerContext } from '../../context/ExplorerContext';


const SHUFFLE_DURATION_MS = 1400;
const SHUFFLE_TICK_MS = 90;

function pickRandomState(states, favorites, excludeId) {
  if (!states || states.length === 0) return null;

  const pool = states.filter((s) => s.id !== excludeId);
  const candidates = pool.length > 0 ? pool : states;

  // Weight unfavorited / "undiscovered" states 3x so the surprise
  // keeps nudging users toward states they haven't engaged with yet.
  const weighted = [];
  candidates.forEach((s) => {
    const weight = favorites?.includes(s.id) ? 1 : 3;
    for (let i = 0; i < weight; i++) weighted.push(s);
  });

  return weighted[Math.floor(Math.random() * weighted.length)];
}

export default function SurpriseMe({ trigger }) {
  const ctx = useContext(ExplorerContext) || {};
  const {
    states = [],
    favorites = [],
    toggleFavorite = () => {},
    selectState = () => {},
  } = ctx;

  const [isOpen, setIsOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleState, setShuffleState] = useState(null);
  const [result, setResult] = useState(null);
  const shuffleTimer = useRef(null);
  const shuffleTimeout = useRef(null);

  const clearTimers = useCallback(() => {
    if (shuffleTimer.current) clearInterval(shuffleTimer.current);
    if (shuffleTimeout.current) clearTimeout(shuffleTimeout.current);
  }, []);

  const runSurprise = useCallback(() => {
    if (states.length === 0) return;
    setResult(null);
    setIsShuffling(true);

    shuffleTimer.current = setInterval(() => {
      const s = states[Math.floor(Math.random() * states.length)];
      setShuffleState(s);
    }, SHUFFLE_TICK_MS);

    shuffleTimeout.current = setTimeout(() => {
      clearInterval(shuffleTimer.current);
      const chosen = pickRandomState(states, favorites, result?.id);
      setShuffleState(chosen);
      setResult(chosen);
      setIsShuffling(false);
    }, SHUFFLE_DURATION_MS);
  }, [states, favorites, result]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    runSurprise();
  }, [runSurprise]);

  const handleClose = useCallback(() => {
    clearTimers();
    setIsOpen(false);
    setIsShuffling(false);
    setShuffleState(null);
    setResult(null);
  }, [clearTimers]);

  const handleSpinAgain = useCallback(() => {
    clearTimers();
    runSurprise();
  }, [clearTimers, runSurprise]);

  const handleExplore = useCallback(() => {
    if (!result) return;
    selectState(result.id);
    handleClose();
  }, [result, selectState, handleClose]);

  useEffect(() => clearTimers, [clearTimers]);

  const displayState = shuffleState || result;
  const isFavorited = result ? favorites.includes(result.id) : false;

  return (
    <>
      {/* Keyframes Tailwind doesn't ship out of the box; referenced below via animate-[...] */}
      <style>{`
        @keyframes sm-fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes sm-pop-in {
          from { opacity: 0; transform: scale(0.94) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {trigger ? (
        <span onClick={handleOpen} className="cursor-pointer">
          {trigger}
        </span>
      ) : (
        <button
          onClick={handleOpen}
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-gradient-to-br from-amber-400/15 to-amber-400/5 px-[18px] py-2.5 font-sans text-sm font-semibold text-amber-400 transition-all hover:-translate-y-0.5 hover:bg-amber-400/20"
        >
          <Sparkles size={18} />
          <span>Surprise Me</span>
        </button>
      )}

      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-sm animate-[sm-fade-in_0.2s_ease]"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[420px] rounded-[20px] border border-amber-400/25 bg-[#0e1830] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] animate-[sm-pop-in_0.25s_cubic-bezier(0.16,1,0.3,1)]"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-white/10"
            >
              <X size={20} />
            </button>

            <div className="mb-4 flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Compass size={14} />
              <span>{isShuffling ? 'Scanning India…' : 'Your surprise pick'}</span>
            </div>

            {displayState ? (
              <div
                className={`overflow-hidden rounded-2xl border border-white/10 bg-[#101c38] transition-[filter] duration-150 ${
                  isShuffling ? 'saturate-[0.7] brightness-90' : ''
                }`}
              >
                <div
                  className="relative flex h-40 items-end bg-cover bg-center p-3 transition-[background-image] duration-75"
                  style={{
                    backgroundImage: displayState.heroImage
                      ? `url(${displayState.heroImage})`
                      : 'linear-gradient(135deg, #1b2a4a, #0e1830)',
                  }}
                >
                  <div className="absolute inset-0 bg-lineart-to-t from-[#0e1830]/90 to-transparent to-60%" />
                  <div className="relative z-10 inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-1 font-sans text-[11px] font-semibold text-amber-200">
                    <MapPin size={12} />
                    {displayState.region}
                  </div>
                </div>

                <div className="min-h-21 px-4.5 pb-4.5 pt-4">
                  <h3 className="mb-1.5 font-serif text-2xl text-stone-100">
                    {displayState.name}
                  </h3>
                  {!isShuffling && displayState.tagline && (
                    <p className="mb-2.5 font-sans text-[13px] leading-relaxed text-slate-400">
                      {displayState.tagline}
                    </p>
                  )}
                  {!isShuffling && displayState.attractions?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {displayState.attractions.slice(0, 3).map((a, i) => (
                        <span
                          key={i}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-sans text-[11px] text-slate-300"
                        >
                          {typeof a === 'string' ? a : a.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-10 text-center font-sans text-slate-400">
                No states available yet.
              </div>
            )}

            <div className="mt-[18px] flex gap-2">
              <button
                onClick={handleSpinAgain}
                disabled={isShuffling}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-white/5 px-3.5 py-[11px] font-sans text-[13px] font-semibold text-slate-300 transition-all hover:not-disabled:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RotateCcw size={16} />
                Spin again
              </button>
              <button
                onClick={() => result && toggleFavorite(result.id)}
                disabled={isShuffling || !result}
                aria-label="Toggle favorite"
                className={`inline-flex w-[42px] flex-none items-center justify-center rounded-xl px-3.5 py-[11px] transition-all hover:not-disabled:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${
                  isFavorited ? 'bg-amber-400/20 text-amber-400' : 'bg-white/5 text-amber-400'
                }`}
              >
                <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={handleExplore}
                disabled={isShuffling || !result}
                className="inline-flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 px-3.5 py-[11px] font-sans text-[13px] font-semibold text-[#0e1830] transition-all hover:not-disabled:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Explore this state
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}