<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';
    protected $primaryKey = 'id';
    protected $fillable = [
        'title', 'author', 'publisher', 'year', 'categories',
    ];

  public function categories()
{
    return $this->belongsToMany(Category::class, 'book_category', 'book_id', 'category_id');
}





}