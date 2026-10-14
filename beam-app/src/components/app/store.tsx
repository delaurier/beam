"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { Toast, type ToastMessage } from "@/components/docs/toast";
import { SEED, type Farm } from "@/lib/farm";

// The farm's data lives in the browser: one object in localStorage, seeded from SEED.
// There is no server yet, so this is the whole persistence layer.
const KEY = "beam-farm-v1";
let state: Farm | null = null;
const listeners = new Set<() => void>();

function load(): Farm {
  if (state) return state;
  try {
    const raw = localStorage.getItem(KEY);
    state = raw ? { ...SEED, ...(JSON.parse(raw) as Partial<Farm>) } : SEED;
  } catch {
    state = SEED;
  }
  return state;
}
function write(next: Farm) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
  listeners.forEach((l) => l());
}
function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export type AddKind = "sale" | "field" | "equipment" | "expense";
type Store = {
  farm: Farm;
  update: (change: (farm: Farm) => Farm) => void;
  reset: () => void;
  notify: (title: string, description?: string) => void;
  /** Set by the top bar's Add menu; the page that owns that kind opens its form and clears it. */
  pendingAdd: AddKind | null;
  setPendingAdd: (kind: AddKind | null) => void;
};
const Ctx = createContext<Store | null>(null);

export function FarmProvider({ children }: { children: ReactNode }) {
  const farm = useSyncExternalStore(subscribe, load, () => SEED);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [pendingAdd, setPendingAdd] = useState<AddKind | null>(null);
  const update = useCallback((change: (farm: Farm) => Farm) => write(change(load())), []);
  const reset = useCallback(() => write(SEED), []);
  const notify = useCallback((title: string, description?: string) => setToast((t) => ({ id: (t?.id ?? 0) + 1, title, description })), []);
  const value = useMemo(() => ({ farm, update, reset, notify, pendingAdd, setPendingAdd }), [farm, update, reset, notify, pendingAdd]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <Toast message={toast} />
    </Ctx.Provider>
  );
}

export function useFarm() {
  const store = useContext(Ctx);
  if (!store) throw new Error("useFarm must be used inside FarmProvider");
  return store;
}

let counter = 0;
/** A new row id that cannot collide with a seeded one. */
export const newId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${counter++}`;
