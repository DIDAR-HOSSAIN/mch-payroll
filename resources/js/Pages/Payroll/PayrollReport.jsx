import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

const PayrollReport = ({ reportData = [] }) => {
    const [loading, setLoading] = useState(false);

    const { data, setData, get } = useForm({
        date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        get('/attendance/report', {
            preserveScroll: true,
            onFinish: () => setLoading(false),
        });
    };

    const formatTime = (time) =>
        new Date(time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

    return (
        <>
            <Head title="Payroll Attendance Report" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h2 className="text-xl font-bold mb-4">Payroll Attendance Report</h2>

                <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4 mb-6">
                    <input
                        type="date"
                        value={data.date}
                        onChange={(e) => setData('date', e.target.value)}
                        className="border rounded-md px-3 py-2 text-sm shadow-sm"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                    >
                        {loading ? 'Loading...' : 'Filter'}
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="text-left px-3 py-2 border">Date</th>
                                <th className="text-left px-3 py-2 border">Employee ID</th>
                                <th className="text-left px-3 py-2 border">Name</th>
                                <th className="text-left px-3 py-2 border">In Time</th>
                                <th className="text-left px-3 py-2 border">Out Time</th>
                                <th className="text-left px-3 py-2 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center px-3 py-4 border">
                                        No data found
                                    </td>
                                </tr>
                            ) : (
                                reportData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-3 py-2">{item.date}</td>
                                        <td className="border px-3 py-2">{item.employee_id}</td>
                                        <td className="border px-3 py-2">{item?.name}</td>
                                        <td className="border px-3 py-2">{formatTime(item.in_time)}</td>
                                        <td className="border px-3 py-2">{formatTime(item.out_time)}</td>
                                        <td className="border px-3 py-2">
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-xs font-semibold ${item.status === 'Present'
                                                        ? 'bg-green-100 text-green-700'
                                                        : item.status === 'Late'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-red-100 text-red-700'
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PayrollReport;
