
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDroppable } from "@dnd-kit/core";

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  color: "blue" | "yellow" | "purple" | "green";
  children: React.ReactNode;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  id,
  title,
  count,
  color,
  children
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id
  });

  const getColumnColor = () => {
    const colors = {
      blue: {
        header: "bg-blue-50",
        badge: "bg-blue-100 text-blue-800"
      },
      yellow: {
        header: "bg-yellow-50",
        badge: "bg-yellow-100 text-yellow-800"
      },
      purple: {
        header: "bg-purple-50",
        badge: "bg-purple-100 text-purple-800"
      },
      green: {
        header: "bg-green-50",
        badge: "bg-green-100 text-green-800"
      }
    };
    
    return colors[color];
  };

  const columnColors = getColumnColor();

  return (
    <Card 
      ref={setNodeRef}
      className={`${isOver ? 'ring-2 ring-blue-400' : ''} h-full flex flex-col`}
    >
      <CardHeader className={`${columnColors.header} rounded-t-lg pb-2`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <Badge className={columnColors.badge} variant="outline">
            {count}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto max-h-[70vh] mt-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default KanbanColumn;
