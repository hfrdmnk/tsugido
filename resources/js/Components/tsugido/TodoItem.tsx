import { Checkbox } from '@/Components/tsugido/Checkbox';
import { cn } from '@/lib/utils';
import { Todo } from '@/types/models';
import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function TodoItem({ todo, isFocus }: { todo: Todo; isFocus?: boolean }) {
    const handleCheckChange = () => {
        router.patch(route('todos.update', todo.id), {
            completed: !todo.completed,
        });
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="-mx-1 flex items-center gap-3 rounded-sm p-1"
        >
            <Checkbox
                checked={todo.completed}
                onCheckedChange={handleCheckChange}
                className={cn(
                    isFocus &&
                        'border-emerald-500 data-[state=checked]:border-emerald-500 data-[state=checked]:bg-emerald-500',
                )}
            />
            <span
                className={cn([
                    'flex-1 cursor-pointer select-none',
                    todo.completed && 'text-muted-foreground line-through',
                ])}
                onClick={handleCheckChange}
            >
                {todo.title}
            </span>
        </motion.div>
    );
}
