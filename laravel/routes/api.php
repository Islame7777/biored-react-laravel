<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\CompteController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PanierController;


Route::apiResource('categories', CategoryController::class);
Route::apiResource('produits', ProduitController::class);
Route::apiResource('compte', CompteController::class);
Route::apiResource('commande', CommandeController::class);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/panier', [PanierController::class, 'index']);
Route::post('/panier', [PanierController::class, 'store']);
Route::delete('/panier/{id}', [PanierController::class, 'destroy']);




