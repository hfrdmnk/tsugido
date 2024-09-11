import { User } from '@/types';
import { PropsWithChildren } from 'react';

export default function App({ children }: PropsWithChildren<{ user: User }>) {
    return <div className="min-h-screen">{children}</div>;
}
