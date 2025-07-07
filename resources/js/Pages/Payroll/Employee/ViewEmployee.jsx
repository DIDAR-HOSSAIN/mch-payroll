import { Link } from '@inertiajs/react';
import React from 'react';

const ViewEmployee = ({ employees }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Employees</h2>
            <Link href="/employees/create" className="btn btn-primary mb-4">Add New</Link>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Name</th>
                        <th>Employee ID</th>
                        <th>Roster</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.employee_id}</td>
                            <td>{emp.roster?.office_start} - {emp.roster?.office_end}</td>
                            <td>
                                <Link href={`/employees/${emp.id}/edit`} className="text-blue-500">Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewEmployee;
