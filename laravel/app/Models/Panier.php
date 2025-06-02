<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Panier extends Model {

    
    protected $fillable = ['nom', 'produit_id', 'prix', 'stock'];


 
    
    public function produit()
    {
        return $this->belongsTo(Produit::class, 'produit_id');
    }
    
    

}