<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Http\Requests\StoreAttendanceRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use MehediJaman\LaravelZkteco\LaravelZkteco;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return inertia('AttendanceReport');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAttendanceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttendanceRequest $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Attendance $attendance)
    {
        //
    }

    public function sync()
    {
        $zk = new LaravelZkteco('192.168.1.50');

        if ($zk->connect()) {
            $data = $zk->getAttendance();

            foreach ($data as $entry) {
                // Check if already exists to avoid duplicates
                $exists = Attendance::where('uid', $entry['uid'])
                    ->where('timestamp', $entry['timestamp'])
                    ->exists();

                if (!$exists) {
                    Attendance::create([
                        'uid' => $entry['uid'],
                        'employee_id' => $entry['id'],
                        'state' => $entry['state'],
                        'timestamp' => $entry['timestamp'],
                        'type' => $entry['type'],
                    ]);
                }
            }

            return response()->json(['message' => 'Attendance synced successfully.']);
        }

        return response()->json(['error' => 'Unable to connect to device'], 500);
    }

    public function report(Request $request)
    {
        $filterDate = $request->date ?? now()->toDateString();

        $attendanceData = Attendance::select('employee_id', 'timestamp')
            ->whereDate('timestamp', $filterDate)
            ->orderBy('timestamp')
            ->get()
            ->groupBy(fn($item) => $item->employee_id);

        $report = [];

        foreach ($attendanceData as $employeeId => $entries) {
            $first = $entries->first();
            $last = $entries->last();
            $date = date('Y-m-d', strtotime($first->timestamp));
            $inTime = $first->timestamp;
            $outTime = $last->timestamp;
            $status = 'Present';

            $expectedStart = strtotime($date . ' 09:00:00');
            $actualIn = strtotime($inTime);

            if ($actualIn > $expectedStart + 300) {
                $status = 'Late';
            }

            if ($inTime === $outTime) {
                $status = 'Absent';
            }

            $report[] = [
                'employee_id' => $employeeId,
                'date' => $date,
                'in_time' => $inTime,
                'out_time' => $outTime,
                'status' => $status,
            ];
        }

        return Inertia::render('Payroll/PayrollReport', [
            'reportData' => $report,
        ]);
    }

}
