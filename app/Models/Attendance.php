<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'date',
        'in_time',
        'out_time',
        'status',
        'source'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
