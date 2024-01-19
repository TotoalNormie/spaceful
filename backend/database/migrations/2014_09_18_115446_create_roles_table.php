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
            $table->boolean('read')->default(1);
            $table->boolean('write')->default(0);
            $table->boolean('manageUser')->default(0);
            $table->boolean('manageRoles')->default(0);
            $table->boolean('managePermissions')->default(0);
            $table->boolean('createReports')->default(0);
            $table->boolean('createOrders')->default(0);
            $table->boolean('manageCategories')->default(0);
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
