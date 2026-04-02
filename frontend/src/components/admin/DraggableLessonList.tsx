'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Video, FileText, Trash2, Edit } from 'lucide-react';
import { Lesson } from '@/types/course';

interface DraggableLessonListProps {
  items: Lesson[];
  onReorder: (items: Lesson[]) => void;
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
}

interface SortableItemProps {
  id: string;
  lesson: Lesson;
  index: number;
  onEdit: (lesson: Lesson) => void;
  onDelete: (id: string) => void;
}

function SortableItem({ id, lesson, index, onEdit, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center justify-between p-5 bg-white border rounded-2xl transition-all group mb-3
        ${isDragging ? 'border-indigo-600 shadow-2xl ring-4 ring-indigo-50 shadow-indigo-200/50 cursor-grabbing' : 'border-slate-100 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-50/50'}
      `}
    >
      <div className="flex items-center space-x-4">
        <div 
          {...attributes} 
          {...listeners}
          className="text-slate-300 group-hover:text-indigo-400 transition-colors cursor-grab active:cursor-grabbing p-1 hover:bg-slate-50 rounded-lg"
        >
          <GripVertical className="h-5 w-5" />
        </div>
        <div className="h-10 w-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
          {index + 1}
        </div>
        <div>
          <h3 className="font-bold text-slate-900 mb-0.5 group-hover:text-indigo-600 transition-colors">{lesson.title}</h3>
          <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center space-x-1">
              <Video className="h-3 w-3" />
              <span>Video</span>
            </span>
            {lesson.content && (
              <span className="flex items-center space-x-1">
                <FileText className="h-3 w-3" />
                <span>Resources</span>
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(lesson)}
          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
          title="Edit lesson"
        >
          <Edit className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(lesson.id)}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
          title="Delete lesson"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function DraggableLessonList({ items, onReorder, onEdit, onDelete }: DraggableLessonListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(items, oldIndex, newIndex);
      // Update the 'order' property of each lesson based on its new position
      const reorderedItems = newItems.map((item, idx) => ({
        ...item,
        order: idx + 1
      }));
      
      onReorder(reorderedItems);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-1">
          {items.map((lesson, index) => (
            <SortableItem
              key={lesson.id}
              id={lesson.id}
              lesson={lesson}
              index={index}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
