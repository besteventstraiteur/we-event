
import { useState } from 'react';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  pageItems: number[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  startIndex: number;
  endIndex: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  initialPage = 1
}: UsePaginationProps): UsePaginationResult => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Fix: Generate a properly typed array of indices
  const pageItems = Array.from({ length: endIndex - startIndex }, 
    (_, i) => startIndex + i);

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return {
    currentPage,
    totalPages,
    pageItems,
    goToPage,
    nextPage,
    previousPage,
    startIndex,
    endIndex
  };
};
