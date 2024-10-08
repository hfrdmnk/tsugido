import TodoItem from '@/Components/tsugido/TodoItem';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import App from '@/Layouts/AppLayout';
import { PageProps } from '@/types';
import { Todo } from '@/types/models';
import { useForm } from '@inertiajs/react';
import { Fragment, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';

export default function Today({ auth, todos }: PageProps<{ todos: Todo[] }>) {
    const inputRef = useRef<HTMLInputElement>(null);

    useHotkeys('space', (event) => {
        if (inputRef.current === null) return;

        event.preventDefault();
        inputRef.current.focus();
    });

    useHotkeys(
        'esc',
        () => {
            if (inputRef.current && document.activeElement === inputRef.current) {
                inputRef.current.blur();
            }
        },
        { enableOnFormTags: ['INPUT'] },
    );

    useHotkeys(
        'enter',
        (event) => {
            handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
        },
        { enableOnFormTags: true },
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (data.title.length >= 3) {
            e.preventDefault();
            post(route('today.store'));
            toast.success('Todo added successfully');
            reset('title');
        }
    };

    return (
        <App user={auth.user}>
            <div className="container mx-auto flex-1 px-4">
                <h1 className="text-2xl font-semibold">Today</h1>
                <div className="mt-4 flex flex-1 flex-col gap-2">
                    {todos.map((todo, index) => (
                        <Fragment key={todo.id}>
                            {index === 0 && !todo.completed && (
                                <Label className="text-muted-foreground">Your current focus</Label>
                            )}
                            {index === 1 && !todo.completed && (
                                <Label className="mt-2 text-muted-foreground">Up next</Label>
                            )}
                            {todo.completed && todos.findIndex((t) => t.completed) === index && (
                                <Label className="mt-2 text-muted-foreground">Completed</Label>
                            )}
                            <TodoItem todo={todo} isFocus={index === 0 && !todo.completed} />
                        </Fragment>
                    ))}
                </div>
                <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-background to-background/0">
                    <div className="container py-8">
                        <form onSubmit={handleSubmit} className="flex items-end gap-2">
                            <div className="flex flex-1 flex-col gap-2">
                                <Label htmlFor="todo-title">Add a new todo</Label>
                                <Input
                                    placeholder="What needs to be done?"
                                    id="todo-title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    ref={inputRef}
                                />
                            </div>
                            <Button type="submit" disabled={processing || data.title.length < 3}>
                                Add Todo
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </App>
    );
}
