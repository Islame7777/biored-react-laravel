<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // Afficher toutes les catégories
    public function index()
    {
        return response()->json(Category::all());
    }

    // Créer une nouvelle catégorie
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:Actif,Inactif',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return response()->json($category, 201);
    }

    // Afficher une catégorie spécifique
    public function show($id)
    {
        return response()->json(Category::findOrFail($id));
    }

    // Mettre à jour une catégorie
    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
    
        $category->update([
            'name' => $request->name,
            'status' => $request->status,
            'description' => $request->description,
        ]);
    
        return response()->json($category);
    }
    
    
    // Supprimer une catégorie
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée']);
    }
}
