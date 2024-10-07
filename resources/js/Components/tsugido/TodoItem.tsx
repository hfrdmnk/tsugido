import { Checkbox } from '@/Components/ui/checkbox';
import { Todo } from '@/types/models';
import { router } from '@inertiajs/react';

export default function TodoItem({ todo }: { todo: Todo }) {
    const handleCheckChange = () => {
        router.patch(route('todos.update', todo.id), {
            completed: !todo.completed,
        });
    };

    return (
        <div className="flex items-center gap-2 rounded-sm p-1">
            <Checkbox checked={todo.completed} onCheckedChange={handleCheckChange} />
            <span className="flex-1">{todo.title}</span>
        </div>
    );
}
