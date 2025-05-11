<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


use Illuminate\Support\Facades\DB;

class ProduitSeeder extends Seeder
{
    public function run()
    {
        DB::table('produits')->insert([
            ['nom' => 'Pack Soin Complet Visage', 'categorie_id' => 12, 'prix' => 350, 'stock' => 20],
            ['nom' => 'Pack Cheveux Brillance & Force', 'categorie_id' => 12, 'prix' => 320, 'stock' => 15],
            ['nom' => 'Pack Maquillage Essentiel', 'categorie_id' => 12, 'prix' => 290, 'stock' => 25],
            ['nom' => 'Pack Peau Sensible', 'categorie_id' => 12, 'prix' => 310, 'stock' => 18],
            ['nom' => 'Pack Soleil Été SPF50+', 'categorie_id' => 12, 'prix' => 330, 'stock' => 12],
            ['nom' => 'Pack Corps & Bien-être', 'categorie_id' => 12, 'prix' => 370, 'stock' => 10],
            ['nom' => 'Pack Bébés & Maternité', 'categorie_id' => 12, 'prix' => 340, 'stock' => 14],
            ['nom' => 'Pack Soins Mains & Pieds', 'categorie_id' => 12, 'prix' => 280, 'stock' => 17],
            ['nom' => 'Pack Parfum Mixte', 'categorie_id' => 12, 'prix' => 390, 'stock' => 8],
            ['nom' => 'Pack Routine Nuit', 'categorie_id' => 12, 'prix' => 360, 'stock' => 11],
            ['nom' => 'Pack Hygiène Familial', 'categorie_id' => 12, 'prix' => 300, 'stock' => 20],
            ['nom' => 'Pack Starter Beauté', 'categorie_id' => 12, 'prix' => 275, 'stock' => 22],
        ]);
    }
}
