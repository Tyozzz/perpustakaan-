<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id(); // Kolom id (primary key, auto increment)
            $table->string('jenis'); // Kolom jenis
            $table->string('category'); // Kolom category
            $table->timestamp('created')->nullable(); // Kolom created (custom, bukan created_at)
            $table->timestamp('update')->nullable(); // Kolom update (custom, bukan updated_at)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
