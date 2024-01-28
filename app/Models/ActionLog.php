<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActionLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'action_type',
        'user_id',
        'content',
        'status',
    ];
    protected $casts = [
        'content' => 'array'
    ];
}
