<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CompteController extends Controller
{
    public function handle(Request $request)
    {
        $action = $request->input('action');

        if ($action === 'register') {
            return $this->register($request);
        } elseif ($action === 'login') {
            return $this->login($request);
        }

        return response()->json(['message' => 'Action invalide'], 400);
    }

    private function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|alpha',
            'lastname' => 'required|string|alpha',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation échouée',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->firstname . ' ' . $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'client', // ou 'user' si tu préfères
        ]);

        return response()->json(['message' => 'Inscription réussie'], 201);
    }

    private function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email ou mot de passe invalide'], 401);
        }

        // Tu peux générer un token JWT ici si tu veux
        return response()->json([
            'message' => 'Connexion réussie',
            'token' => base64_encode($user->email), // exemple simple à remplacer par un vrai token
            'role' => $user->role
        ]);
    }
}
