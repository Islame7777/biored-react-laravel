<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;

class ProduitController extends Controller
{
    // Liste des produits avec leurs catégories
    public function index()
    {
        return Produit::with('categorie')->get();
    }

    // Ajouter un nouveau produit
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'categorie_id' => 'required|exists:categories,id',
            'prix' => 'required|numeric',
            'stock' => 'required|integer',
        ]);

        $produit = Produit::create($validated);
        return response()->json($produit->load('categorie'), 201);
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
