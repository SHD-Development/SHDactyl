<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IpRecords extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'ip',
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
