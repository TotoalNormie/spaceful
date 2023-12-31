<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\RolesUrlsController;
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
Route::delete('/user/{id}', [AuthController::class, 'destroy']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/roles', [RolesController::class, 'create']);
Route::post('/roles/url', [RolesUrlsController::class, 'create']);
// Route::delete('/{id}', [TodoController::class, 'destroy']);
