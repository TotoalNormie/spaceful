<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\RolesUrlsController;
use App\Http\Controllers\WarehouseAppController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\WarehouseWorkersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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


Route::get('/user', [AuthController::class, 'getUserData']);
Route::post('/user/data', [AuthController::class, 'update']);

Route::post('/warehouse/{id}/addtowarehouse', [WarehouseController::class, 'create']);

Route::post('/user', [AuthController::class, 'create']);
Route::delete('/user/{id}', [AuthController::class, 'destroy']);
Route::get('/status', [AuthController::class, 'status']);
Route::get('/user/info', [AuthController::class, 'getUserData']);
// Route::get('/user/warehouses/', [AuthController::class, 'getWarehouses']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::post('/roles', [RolesController::class, 'create']);
Route::post('/roles/url', [RolesUrlsController::class, 'create']);
// Route::delete('/{id}', [TodoController::class, 'destroy']);

Route::post('/products/create/', [ProductsController::class, 'create']);
Route::delete('/products/delete/{id}', [ProductsController::class, 'destroy']);
Route::get('/products/', [ProductsController::class, 'show']);
Route::post('/test/{id}', [ProductsController::class, 'update']);

Route::post('/warehouse-app/create', [WarehouseAppController::class, 'create']);
Route::post('/warehouse-app/update/{id}', [WarehouseAppController::class, 'update']);
Route::get('/warehouse-app/{id}', [WarehouseAppController::class, 'get']);

// warehouse workers

Route::get('/workers/name', [AuthController::class, 'generateName']);
Route::post('/warehouse/workers/add', [AuthController::class, 'createWorker']);
Route::post('/warehouse/workers/update/{user_id}', [AuthController::class, 'updateWorker']);

// get roles
Route::get('/roles', [RolesController::class, 'get']);

Route::get('/warehouse/workers/{id}', [WarehouseWorkersController::class, 'get']);



// reports
Route::get('/warehouse/report/', [WarehouseController::class, 'report']);
Route::get('/products/report/', [ProductsController::class, 'report']);

Route::get('/categories/{id}', [CategoriesController::class, 'select']);
Route::get('/products/{id}', [ProductsController::class, 'select']);

Route::get('/warehouse/legit/', [WarehouseController::class, 'getLegitNumbers']);
Route::get('/fitogus', [WarehouseController::class, 'fitogusCharts']);
// sito apaksa nekustinat savadak warehouse reports neies
Route::get('/warehouse/{id}', [WarehouseController::class, 'getWarehouse']);

Route::post('/orders/create/', [OrdersController::class, 'create']);
Route::get('/orders/', [OrdersController::class, 'show']);
Route::post('/orders/{id}', [OrdersController::class, 'update']);
Route::get('/orders/{id}', [OrdersController::class, 'showById']);
Route::get('/orders/destroy/{id}', [OrdersController::class, 'destroy']);
Route::post('/pass/forgor/', [AuthController::class, 'passForgor']);

// Route::get('/warehouse/report/', [WarehouseController::class, 'report']);
// Route::get('/products/report/', [ProductsController::class, 'report']);

// Route::get('/categories/{id}
