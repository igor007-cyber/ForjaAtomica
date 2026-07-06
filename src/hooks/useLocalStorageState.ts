"use client";

import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getStorageItem, setStorageItem } from "@/src/utils/storage";

/**
 * Estado sincronizado com o localStorage, seguro para SSR:
 * renderiza `initialValue` no servidor e hidrata do storage após montar.
 * Retorna [valor, setValor, hidratado].
 */
export function useLocalStorageState<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);
  const initialRef = useRef(initialValue);

  useEffect(() => {
    // Hidratação única a partir de um sistema externo (localStorage) após a
    // montagem — necessário para o HTML do servidor coincidir com o cliente.
    setValue(getStorageItem(key, initialRef.current));
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (hydrated) setStorageItem(key, value);
  }, [key, value, hydrated]);

  return [value, setValue, hydrated];
}
