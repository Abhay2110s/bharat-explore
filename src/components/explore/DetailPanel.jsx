import React, { useContext, useEffect, useCallback, useMemo } from 'react';
import { X, MapPin, Heart, PlusCircle, Calendar, Tag, Star } from 'lucide-react';
import { ExplorerContext } from '../../context/ExplorerContext';

export default function DetailPanel({ stateId: stateIdProp, onClose: onCloseProp }) {
  const ctx = useContext(ExplorerContext) || {};
  const {
    states = [],
    selectedStateId,
    selectState = () => {},
    favorites = [],
    toggleFavorite = () => {},
    addToTrip,
    tripStops = [],
  } = ctx;

  const activeId = stateIdProp ?? selectedStateId;
  const isOpen = Boolean(activeId);

  const state = useMemo(
    () => states.find((s) => s.id === activeId) || null,
    [states, activeId]
  );

  const handleClose = useCallback(() => {
    if (onCloseProp) onCloseProp();
    else selectState(null);
  }, [onCloseProp, selectState]);

  // Escape key closes the panel
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll while panel is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  const isFavorited = state ? favorites.includes(state.id) : false;
  const isInTrip = state ? tripStops.includes(state.id) : false;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-[900] bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Sliding panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[901] h-full w-full max-w-[480px] overflow-y-auto bg-[#0e1830] shadow-[-24px_0_60px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {state && (
          <>
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="fixed right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-slate-200 backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <X size={20} />
            </button>

            {/* Hero */}
            <div
              className="relative h-64 w-full bg-cover bg-center"
              style={{
                backgroundImage: state.heroImage
                  ? `url(${state.heroImage})`
                  : 'linear-gradient(135deg, #1b2a4a, #0e1830)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1830] via-[#0e1830]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 px-6 pb-5">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 font-sans text-[11px] font-semibold text-amber-200">
                  <MapPin size={12} />
                  {state.region}
                </div>
                <h2 className="font-serif text-4xl leading-tight text-stone-100">
                  {state.name}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 pb-28 pt-5">
              {state.tagline && (
                <p className="mb-1 font-sans text-sm font-medium italic text-amber-300/90">
                  {state.tagline}
                </p>
              )}

              {state.description && (
                <p className="mb-5 font-sans text-[14px] leading-relaxed text-slate-400">
                  {state.description}
                </p>
              )}

              {/* Key facts */}
              {(state.bestTimeToVisit || state.tags?.length > 0) && (
                <div className="mb-6 flex flex-wrap gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  {state.bestTimeToVisit && (
                    <div className="flex items-start gap-2">
                      <Calendar size={16} className="mt-0.5 shrink-0 text-amber-400" />
                      <div>
                        <p className="font-sans text-[11px] uppercase tracking-wide text-slate-500">
                          Best time to visit
                        </p>
                        <p className="font-sans text-[13px] text-slate-200">
                          {state.bestTimeToVisit}
                        </p>
                      </div>
                    </div>
                  )}
                  {state.tags?.length > 0 && (
                    <div className="flex items-start gap-2">
                      <Tag size={16} className="mt-0.5 shrink-0 text-amber-400" />
                      <div>
                        <p className="mb-1 font-sans text-[11px] uppercase tracking-wide text-slate-500">
                          Known for
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {state.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-sans text-[11px] text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Attractions */}
              {state.attractions?.length > 0 && (
                <div>
                  <h3 className="mb-3 font-serif text-xl text-stone-100">
                    Top attractions
                  </h3>
                  <div className="flex flex-col gap-3">
                    {state.attractions.map((attraction, i) => {
                      const name = typeof attraction === 'string' ? attraction : attraction.name;
                      const description =
                        typeof attraction === 'string' ? null : attraction.description;
                      const image = typeof attraction === 'string' ? null : attraction.image;

                      return (
                        <div
                          key={i}
                          className="flex gap-3 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3"
                        >
                          <div
                            className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center"
                            style={{
                              backgroundImage: image
                                ? `url(${image})`
                                : 'linear-gradient(135deg, #223055, #101c38)',
                            }}
                          />
                          <div className="min-w-0">
                            <div className="mb-0.5 flex items-center gap-1.5">
                              <Star size={12} className="shrink-0 text-amber-400" />
                              <p className="truncate font-sans text-[14px] font-semibold text-stone-100">
                                {name}
                              </p>
                            </div>
                            {description && (
                              <p className="line-clamp-2 font-sans text-[12.5px] leading-snug text-slate-400">
                                {description}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky action bar */}
            <div className="fixed bottom-0 right-0 w-full max-w-[480px] border-t border-white/10 bg-[#0e1830]/95 px-6 py-4 backdrop-blur-sm">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleFavorite(state.id)}
                  aria-label="Toggle favorite"
                  className={`inline-flex w-[46px] flex-none items-center justify-center rounded-xl transition-all hover:-translate-y-0.5 ${
                    isFavorited ? 'bg-amber-400/20 text-amber-400' : 'bg-white/5 text-amber-400'
                  }`}
                >
                  <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={() => addToTrip && addToTrip(state.id)}
                  disabled={!addToTrip || isInTrip}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 px-4 py-3 font-sans text-[14px] font-semibold text-[#0e1830] transition-all hover:not-disabled:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <PlusCircle size={16} />
                  {isInTrip ? 'Already in trip' : 'Add to trip'}
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}