import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const AttendanceSync = () => {
    const { processing, get } = useForm();

    const handleSync = () => {
        get('/attendance/sync', {
            preserveScroll: true,
            onSuccess: () => alert('Attendance synced successfully'),
            onError: () => alert('Failed to sync attendance'),
        });
    };

    return (
        <div className="p-4">
            <Button onClick={handleSync} disabled={processing}>
                {processing ? 'Syncing...' : 'Sync Attendance'}
            </Button>
        </div>
    );
};

export default AttendanceSync;
