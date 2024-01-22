<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Artisan;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('warehouse_apps', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnDelete();
            $table->string('name', 25);
            $table->string('description', 4096)->default('');
        });
        Artisan::call( 'db:seed', [
            '--class' => 'RoleSeeder']
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warehouse_apps');
    }
};
