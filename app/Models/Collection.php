<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'user_id',
        'book_id',
    ];

    /**
     * Relasi: Koleksi dimiliki oleh seorang user.
     */
    // app/Models/Collection.php
public function user()
{
    return $this->belongsTo(User::class);
}

public function book()
{
    return $this->belongsTo(Book::class);
}

}
