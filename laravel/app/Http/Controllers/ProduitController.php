<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    // Liste des produits avec leurs catégories
    public function index()
    {
        $produits = \App\Models\Produit::all();
    
        // appliquer l'accessor manuellement
        $produits->each(function ($produit) {
            $produit->image = $produit->image;
        });
    
        return response()->json($produits);
    }
    
    
    
    public function store(Request $request)
{
    $request->validate([
        'nom' => 'required|string|max:255',
        'prix' => 'required|numeric',
        'categorie_id' => 'required|exists:categories,id',
        'stock' => 'required|integer',
        'image' => 'nullable|image|max:2048', // 2 Mo max
    ]);

    $path = null;
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('produits', 'public');
    }

    $produit = Produit::create([
        'nom' => $request->nom,
        'prix' => $request->prix,
        'categorie_id' => $request->categorie_id,
        'stock' => $request->stock,
        'image' => $path, // Exemple : produits/tshirt.jpg
    ]);

    return response()->json($produit);
}


    // Afficher un produit spécifique
    public function show($id)
    {
        $produit = Produit::with('categorie')->findOrFail($id);
        return response()->json($produit);
    }

    // Modifier un produit
    public function update(Request $request, $id)
    {
        $produit = Produit::findOrFail($id);

        $validated = $request->validate([
            'nom' => 'sometimes|required|string|max:255',
            'categorie_id' => 'sometimes|required|exists:categories,id',
            'prix' => 'sometimes|required|numeric',
            'stock' => 'sometimes|required|integer',
        ]);

        $produit->update($validated);
        return response()->json($produit->load('categorie'));
    }

    // Supprimer un produit
    public function destroy($id)
    {
        $produit = Produit::findOrFail($id);
        $produit->delete();

        return response()->json(['message' => 'Produit supprimé avec succès.']);
    }
}
