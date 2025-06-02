<?php

namespace App\Http\Controllers;

use App\Models\Compte;
use Illuminate\Http\Request;

class CompteController extends Controller
{
    // GET /compte
    public function index()
    {
        return response()->json(Compte::all());
    }

    // POST /compte
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:comptes',
            'password' => 'required|string|min:6',
          'role' => 'required|string|in:Utilisateur,Admin',
 // Validation du rôle
        ]);

        $compte = Compte::create([
            'username' => $validated['username'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => $validated['role'], // Ajout du rôle
        ]);

        return response()->json($compte, 201);
    }

    // GET /compte/{id}
    public function show($id)
    {
        $compte = Compte::find($id);
        if (!$compte) {
            return response()->json(['message' => 'Compte non trouvé'], 404);
        }
        return response()->json($compte);
    }

    // PUT/PATCH /compte/{id}
    public function update(Request $request, $id)
    {
        $compte = Compte::find($id);
        if (!$compte) {
            return response()->json(['message' => 'Compte non trouvé'], 404);
        }

        $validated = $request->validate([
            'username' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:comptes,email,' . $id,
            'password' => 'sometimes|required|string|min:6',
            'role' => 'sometimes|required|in:utilisateur,admin', // Validation du rôle
        ]);

        $compte->update($validated);

        return response()->json($compte);
    }

    // DELETE /compte/{id}
    public function destroy($id)
    {
        $compte = Compte::find($id);
        if (!$compte) {
            return response()->json(['message' => 'Compte non trouvé'], 404);
        }

        $compte->delete();
        return response()->json(['message' => 'Compte supprimé avec succès']);
    }
}
