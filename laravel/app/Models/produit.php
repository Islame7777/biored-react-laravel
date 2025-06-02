<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'categorie_id', 'prix', 'stock', 'image'];

    protected $casts = [
        'prix' => 'float',
        'stock' => 'integer',
    ];

    public function categorie()
    {
        return $this->belongsTo(Category::class);
    }
    public function getImageAttribute($value)
    {
        $cleaned = trim($value);
    
        // Si l'image contient déjà "storage/", ne rien rajouter
        if (str_starts_with($cleaned, '/storage') || str_starts_with($cleaned, 'storage')) {
            return $cleaned;
        }
    
        // Sinon, on construit l'URL proprement
        return $cleaned ? asset('storage/' . ltrim($cleaned, '/')) : null;
    }
    
    
    
}
