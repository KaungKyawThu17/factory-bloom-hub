import * as React from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const REDUCED_MOTION_SERVER_SNAPSHOT = true;

type ReducedMotionListener = () => void;

const listeners = new Set<ReducedMotionListener>();
let mediaQuery: MediaQueryList | undefined;
let removeMediaQueryListener: (() => void) | undefined;

function getMediaQuery() {
  if (typeof window === "undefined" || !window.matchMedia) {
    return undefined;
  }

  mediaQuery ??= window.matchMedia(REDUCED_MOTION_QUERY);
  return mediaQuery;
}

function getReducedMotionSnapshot() {
  return getMediaQuery()?.matches ?? false;
}

function getReducedMotionServerSnapshot() {
  return REDUCED_MOTION_SERVER_SNAPSHOT;
}

function notifyReducedMotionListeners() {
  listeners.forEach((listener) => listener());
}

function subscribeToReducedMotion(listener: ReducedMotionListener) {
  listeners.add(listener);

  const query = getMediaQuery();
  if (query && !removeMediaQueryListener) {
    query.addEventListener("change", notifyReducedMotionListeners);
    removeMediaQueryListener = () => {
      query.removeEventListener("change", notifyReducedMotionListeners);
    };
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0) {
      removeMediaQueryListener?.();
      removeMediaQueryListener = undefined;
    }
  };
}

export function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}
