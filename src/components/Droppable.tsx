import { useDroppable } from "@dnd-kit/react";
import { ReactNode } from "react";

interface DroppableProps {
  id: string;
  children: ReactNode;
  className: string;
}

export function Droppable({ id, children, className }: DroppableProps) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
}
