import App from '@/Layouts/AppLayout';
import { PageProps } from '@/types';

export default function Today({ auth }: PageProps) {
    return (
        <App user={auth.user}>
            <div className="container mx-auto flex-1 px-4">
                <h1 className="text-2xl font-semibold">Today</h1>
                <div className="fixed bottom-0 left-0 w-full bg-gradient-to-t from-background to-background/0">
                    <div className="container py-8"></div>
                </div>
            </div>
        </App>
    );
}
