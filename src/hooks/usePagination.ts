"use client";

import { useMemo, useState } from "react";

interface UsePaginationResult<T> {
  page: number;
  totalPages: number;
  pageItems: T[];
  setPage: (page: number) => void;
}

export function usePagination<T>(
  items: T[],
  pageSize = 8
): UsePaginationResult<T> {
  const [page, setPage] = useState(1);
  const [prevLength, setPrevLength] = useState(items.length);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  // volta para a primeira página quando a lista muda de tamanho
  // (ajuste de estado durante o render, conforme recomendação do React)
  if (prevLength !== items.length) {
    setPrevLength(items.length);
    setPage(1);
  }

  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, safePage, pageSize]
  );

  return {
    page: safePage,
    totalPages,
    pageItems,
    setPage: (p: number) => setPage(Math.max(1, Math.min(p, totalPages))),
  };
}
