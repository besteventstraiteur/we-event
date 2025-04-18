
import { useState, useMemo } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  initialPage = 1
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  
  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  // Ensure current page is within bounds
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  if (safePage !== currentPage) {
    setCurrentPage(safePage);
  }
  
  // Calculate start and end indices
  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
  // Calculate the actual items for the current page
  const pageItems = useMemo(() => {
    return { start: startIndex, end: endIndex };
  }, [startIndex, endIndex]);
  
  // Navigation functions
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };
  
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };
  
  const goToPage = (page: number) => {
    const pageNumber = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(pageNumber);
  };
  
  return {
    currentPage,
    totalPages,
    pageItems,
    nextPage,
    prevPage,
    goToPage,
    startIndex,
    endIndex
  };
};
