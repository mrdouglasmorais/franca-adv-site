"use client";

import { useEffect, useState } from "react";

export function useCarousel(length: number, intervalMs = 7000) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const sync = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const paused = userPaused || hovered || hidden || reduce;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [paused, length, intervalMs, index]);

  function go(next: number) {
    setIndex(((next % length) + length) % length);
  }

  return {
    index,
    paused,
    userPaused,
    setUserPaused,
    setHovered,
    reduce,
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
  };
}
