import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import App from '@/Layouts/AppLayout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export default function Today({ auth }: PageProps) {
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
            alert('Submit the form');
        },
        { enableOnFormTags: true },
    );

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        reset('title');
    };

    return (
        <App user={auth.user}>
            <div className="container mx-auto flex-1 px-4">
                <h1 className="text-2xl font-semibold">Today</h1>
                <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-background to-background/0">
                    <div className="container py-8">
                        <form onSubmit={handleSubmit} className="flex items-end gap-2">
                            <div className="flex flex-1 flex-col gap-2">
                                <Label htmlFor="todo-title">Add a new todo</Label>
                                <Input
                                    placeholder="Focus with [space]"
                                    id="todo-title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    ref={inputRef}
                                />
                            </div>
                            <Button type="submit" disabled={processing || data.title.length < 1}>
                                Add Todo
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </App>
    );
}
