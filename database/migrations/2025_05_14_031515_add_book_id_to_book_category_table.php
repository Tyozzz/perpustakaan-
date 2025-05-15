<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('book_category', function (Blueprint $table) {
            $table->unsignedBigInteger('book_id')->after('id');
            $table->unsignedBigInteger('category_id')->after('book_id');
        });
    }

    public function down()
    {
        Schema::table('book_category', function (Blueprint $table) {
            $table->dropColumn(['book_id', 'category_id']);
        });
    }
};
