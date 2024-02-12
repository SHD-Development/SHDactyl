<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bypass extends Model
{
    use HasFactory;
    protected $fillable = [
        'discord_id',
        'bypass',
    ];
}
