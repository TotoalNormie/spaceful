<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RolesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/', [ProductsController::class, 'show']);
Route::post('/user', [AuthController::class, 'create']);
Route::delete('/user', [AuthController::class, 'destroy']);
Route::post('/roles', [RolesController::class, 'create']);
// Route::delete('/{id}', [TodoController::class, 'destroy']);
