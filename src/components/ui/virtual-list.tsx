
import React from 'react';
import { FixedSizeList } from 'react-window';
import { cn } from "@/lib/utils";

interface VirtualListProps<T> {
  items: T[];
  height: number;
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscanCount?: number;
}

const VirtualList = <T extends unknown>({
  items,
  height,
  itemHeight,
  renderItem,
  className,
  overscanCount = 5,
}: VirtualListProps<T>) => {
  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <FixedSizeList
        height={height}
        itemCount={items.length}
        itemSize={itemHeight}
        width="100%"
        overscanCount={overscanCount}
      >
        {({ index, style }) => (
          <div style={style}>
            {renderItem(items[index], index)}
          </div>
        )}
      </FixedSizeList>
    </div>
  );
};

export default VirtualList;
