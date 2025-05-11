<?php
namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommandeController extends Controller
{
    // Retourner toutes les commandes
    public function index()
    {
        $commandes = Commande::with('client')->get();
    
        return response()->json($commandes);
    }
    
    // Ajouter une nouvelle commande


    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'montant' => 'required|numeric',
            'statut' => 'required|string',
        ]);
    
        $commande = new Commande();
        $commande->user_id = Auth::id(); // utilisateur connecté
        $commande->date = $request->date;
        $commande->montant = $request->montant;
        $commande->statut = $request->statut;
        $commande->save();
    
        // Charger le nom du client pour le retour API
        $commande->load('user');
    
        return response()->json([
            'id' => $commande->id,
            'client_nom' => $commande->user->name,
            'date' => $commande->date,
            'montant' => $commande->montant,
            'statut' => $commande->statut,
        ]);
    }
    
    public function update(Request $request, $id)
{
    // Validation des données
    $request->validate([
        'client_nom' => 'required|string',
        'date' => 'required|date',
        'montant' => 'required|numeric',
        'statut' => 'required|string',
    ]);

    // Recherche de la commande
    $commande = Commande::findOrFail($id);

    // Mise à jour
    $commande->update([
        'client_nom' => $request->client_nom,
        'date' => $request->date,
        'montant' => $request->montant,
        'statut' => $request->statut,
    ]);

    return response()->json($commande);
}
public function destroy($id)
{
    $commande = Commande::findOrFail($id);
    $commande->delete();

    return response()->json(['message' => 'Commande supprimée avec succès']);
}

}
