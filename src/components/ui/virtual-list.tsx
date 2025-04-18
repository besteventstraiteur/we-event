
import React from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import { cn } from '@/lib/utils';

interface VirtualListProps<T> extends Omit<FixedSizeListProps, 'itemCount' | 'itemSize' | 'children'> {
  items: T[];
  itemSize: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  emptyMessage?: string;
}

export function VirtualList<T>({
  items,
  itemSize,
  renderItem,
  className,
  emptyMessage = "Aucun élément à afficher",
  ...props
}: VirtualListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-auto", className)}>
      <FixedSizeList
        itemCount={items.length}
        itemSize={itemSize}
        width="100%"
        {...props}
      >
        {({ index, style }) => (
          <div style={style}>
            {renderItem(items[index], index)}
          </div>
        )}
      </FixedSizeList>
    </div>
  );
}

/**
 * Hooks pour la pagination
 */
export function usePagination(totalItems: number, itemsPerPage: number = 10) {
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageItems = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return { start, end };
  }, [currentPage, itemsPerPage]);

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

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return {
    currentPage,
    totalPages,
    pageItems,
    nextPage,
    prevPage,
    goToPage
  };
}
