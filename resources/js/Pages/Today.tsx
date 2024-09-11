import App from '@/Layouts/AppLayout';
import { PageProps } from '@/types';

export default function Today({ auth }: PageProps) {
    return (
        <App user={auth.user}>
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold">Today</h1>
            </div>
        </App>
    );
}
