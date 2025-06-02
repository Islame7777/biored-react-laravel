<?php
namespace App\Http\Controllers;
    
    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;
    use Illuminate\Support\Str;
    use App\Models\Compte;
    use Illuminate\Support\Facades\Log;
    class AuthController extends Controller
    {
        // Inscription
        public function register(Request $request)
        {
            // Validation des entrées
            $validator = Validator::make($request->all(), [
                'username' => 'required|string|max:255',
                'email' => 'required|email|unique:comptes',
                'password' => 'required|string|min:6',
              'role' => 'required|string|in:Utilisateur,Admin',
            ]);
    
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }
    
            // Créer un utilisateur
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $validator['role'], // Ajout du rôle
            ]);
    
            return response()->json(['message' => 'Inscription réussie', 'user' => $user], 201);
        }
    
        // Connexion
        public function login(Request $request)
        {
            $validated = $request->validate([
                'email' => 'required|email',
                'password' => 'required|string',
            ]);
        
            $compte = Compte::where('email', $validated['email'])->first();
        
            if (!$compte) {
                return response()->json(['message' => 'Compte non trouvé.'], 404);
            }
        
            // Debugging: Afficher l'email et le mot de passe
            \Log::info('Email: ' . $validated['email']);
            \Log::info('Mot de passe: ' . $validated['password']);
        
            if (!Hash::check($validated['password'], $compte->password)) {
                return response()->json(['message' => 'Identifiants incorrects.'], 401);
            }
        
            return response()->json($compte);
        }
        
    }
    
