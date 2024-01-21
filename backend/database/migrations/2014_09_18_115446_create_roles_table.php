<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->id();
            $table->string('roleName');
            $table->boolean('addnewproduct')->default(true);
            $table->boolean('addtowarehouse')->default(true);
            $table->boolean('reports')->default(true);
            $table->boolean('itemsearch')->default(true);
            $table->boolean('productsearch')->default(true);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
