import { PropsWithChildren } from 'react';

export default function Key({ children }: PropsWithChildren<{}>) {
    return (
        <kbd className="rounded-sm border px-1 font-mono text-xs leading-none text-muted-foreground">{children}</kbd>
    );
}
