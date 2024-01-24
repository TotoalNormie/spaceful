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
            $table->decimal('price', 6, 2, true);
            $table->decimal('weight', 8, 3, true);
            $table->string('supplier');
            $table->string('img');
            $table->string('supplierDescription')->nullable(); 
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
