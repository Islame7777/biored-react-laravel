<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('paniers', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->decimal('prix', 8, 2);
            $table->integer('stock')->default(1);
            $table->unsignedBigInteger('produit_id');
            

            $table->timestamps();

            // Optionnel : si tu veux ajouter les relations
            // $table->unsignedBigInteger('produit_id');
            // $table->unsignedBigInteger('compte_id')->nullable();

            // Clés étrangères (optionnelles)
           $table->foreign('produit_id')->references('id')->on('produits');
            // $table->foreign('compte_id')->references('id')->on('utilisateurs');
            // $table->foreign('categorie_id')->references('id')->on('categories');
        });
    }

    public function down(): void {
        Schema::dropIfExists('paniers');
    }
};
