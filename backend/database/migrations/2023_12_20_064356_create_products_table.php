<?php

use App\Models\Categories;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignIdFor(Categories::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(warehouse_app::class)->constrained()->cascadeOnDelete();
            // $table->integer('productId');
            $table->float('price');
            $table->float('weight');
            $table->string('supplier');
            $table->string('supplierDescription');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
