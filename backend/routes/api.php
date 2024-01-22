<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\RolesUrlsController;
use App\Http\Controllers\WarehouseAppController;
use App\Http\Controllers\WarehouseController;
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
Route::get('/products/{id}', [ProductsController::class, 'show']);
Route::get('/user', [AuthController::class, 'getUserData']);
Route::post('/warehouse/{id}/addtowarehouse', [WarehouseController::class, 'create']);
Route::post('/user', [AuthController::class, 'create']);
Route::delete('/user/{id}', [AuthController::class, 'destroy']);
Route::get('/status', [AuthController::class, 'status']);
// Route::get('/user/warehouses/', [AuthController::class, 'getWarehouses']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/roles', [RolesController::class, 'create']);
Route::post('/roles/url', [RolesUrlsController::class, 'create']);
Route::get('/warehouse/{id}', [WarehouseController::class, 'getWarehouse']);
// Route::delete('/{id}', [TodoController::class, 'destroy']);

Route::post('/products/create', [ProductsController::class, 'create']);
Route::delete('/products/delete/{id}', [ProductsController::class, 'destroy']);
Route::post('/test/{id}', [ProductsController::class, 'update']);

Route::post('/warehouse-app/create', [WarehouseAppController::class, 'create']);
Route::get('/warehouse-app/{id}', [WarehouseAppController::class, 'get']);