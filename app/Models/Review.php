<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;


class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'book',
        'review',
        'rating',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
