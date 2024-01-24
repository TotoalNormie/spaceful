<?php

use App\Models\Products;
use App\Models\Warehouse;
use App\Models\warehouse_app;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Products::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(warehouse_app::class)->constrained()->cascadeOnDelete();
            $table->string('orderType', 4);
            $table->string('supplier');
            $table->boolean('status');
            $table->integer('amount', false, true);
            $table->decimal('sum', 8, 2, true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
