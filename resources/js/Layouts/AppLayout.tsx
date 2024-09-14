import Key from '@/Components/key';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export default function App({ children }: PropsWithChildren<{ user: User }>) {
    const { url } = usePage();

    useHotkeys('a', () => router.visit(route('archive')));
    useHotkeys('t', () => router.visit(route('today')));

    const linkClasses = (href: string) => {
        return cn(
            'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-foreground gap-2',
            url === href && 'bg-background text-foreground shadow',
        );
    };

    return (
        <div className="flex min-h-screen flex-col">
            <nav className="container flex items-center justify-center py-8">
                <ul className="flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                    <li>
                        <Link href={route('archive')} className={linkClasses('/archive')}>
                            Archive <Key>a</Key>
                        </Link>
                    </li>
                    <li>
                        <Link href={route('today')} className={linkClasses('/today')}>
                            Today <Key>t</Key>
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>{children}</main>
            <footer className="container mt-auto py-8 text-center text-sm text-muted-foreground">
                <p>
                    A{' '}
                    <a href="https://linea.studio" target="_blank">
                        Linea
                    </a>{' '}
                    projektli.
                </p>
            </footer>
        </div>
    );
}
