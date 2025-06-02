<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Panier;

class PanierController extends Controller
{
    public function index()
    {
        return Panier::with('produit')->get();
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'produit_id' => 'required|exists:categories,id',
            'prix' => 'required|numeric',
            'stock' => 'required|integer',
        ]);
        $panier = new Panier();
        $panier->nom = $request->nom;
        $panier->prix = $request->prix;
        $panier->stock = $request->stock;
         $panier->produit_id = $request->produit_id;
        $panier->save();
    
        return response()->json($panier, 201);
    }
    
    public function destroy($id) {
        $panier = Panier::findOrFail($id);
        $panier->delete();

        return response()->json(['message' => 'Article supprimé du panier']);
    }
}
