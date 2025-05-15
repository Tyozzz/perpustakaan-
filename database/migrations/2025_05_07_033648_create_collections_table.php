<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCollectionsTable extends Migration
{
   public function up()
{
    Schema::create('collections', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('book_id')->constrained()->onDelete('cascade');
        $table->timestamps();
    });
}

    public function down()
    {
        Schema::dropIfExists('collections');
    }
}
