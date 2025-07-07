import { useForm } from '@inertiajs/react';

export default function ManualAttendanceForm({ employees }) {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        date: '',
        in_time: '',
        out_time: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('manual.attendance.store'));
    };

    return (
        <form onSubmit={submit} className="space-y-4 p-4 max-w-lg mx-auto bg-white rounded shadow">
            <select value={data.employee_id} onChange={(e) => setData('employee_id', e.target.value)} className="w-full border p-2">
                <option value="">Select Employee</option>
                {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                ))}
            </select>

            <input type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="w-full border p-2" />

            <input type="time" value={data.in_time} onChange={(e) => setData('in_time', e.target.value)} className="w-full border p-2" />
            <input type="time" value={data.out_time} onChange={(e) => setData('out_time', e.target.value)} className="w-full border p-2" />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={processing}>Submit</button>
        </form>
    );
}
