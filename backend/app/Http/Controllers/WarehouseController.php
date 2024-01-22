<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Models\Products;
use App\Models\Roles;
use App\Models\User;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\warehouse_app;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\DB;

class WarehouseController extends Controller
{
    function report(Request $request){
        // $warehouse->join('products', 'warehouses.products_id', '=', 'products.id')->select('warehouses.*')->get();
        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();
        if(!$token){
            return response()->json(['error' => 'not logged in']);
        }
        $warehouseId = warehouse_app::where('user_id', $token->tokenable_id)->select('id')->first();
        if(!$warehouseId){
            return response()->json(['error' => 'not logged in']);
        }

        // $warehouse = Warehouse::where('warehouse_app_id', 1)->join('products', 'warehouses.products_id', '=', 'products.id')->select('warehouses.id', 'warehouses.amount', 'products.name', 'warehouses.shelfId')->get();

        // return response()->json($warehouseId->id);
        $warehouse = DB::table('warehouses')->where('warehouses.warehouse_app_id', $warehouseId->id)->join('products', 'warehouses.products_id', '=', 'products.id')->select('warehouses.id', 'warehouses.amount', 'products.name', 'warehouses.shelfId')->get();
        if(!$warehouse){
            return response()->json(['error' => 'not logged in']);
        }
        return response()->json($warehouse);
    }

    function getLegitNumbers(){
        $closed = Orders::where('status', 1)->select('id')->count();
        $productCount = Products::all()->count();
        $open = Orders::where('status', 0)->select('id')->count();
        return response()->json([$closed, $productCount, $open]);
    }

    function fitogusCharts(Request $request){
        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();
        if(!$token){
            return response()->json(['error' => 'not logged in']);
        }
        // $role = Roles::where('user_id', $token->tokenable_id)->select('roleName')->first();
        $role = DB::table('users')->join('roles', 'users.roles_id', '=', 'roles.id')->where('users.id', $token->tokenable_id)->select('roles.roleName')->first();
        $warehouseId = warehouse_app::where('user_id', $token->tokenable_id)->select('id')->first();
        return response()->json([$warehouseId->id, $role->roleName]);
    }
  
    public function getWarehouse($id){

        return response()->json([
            'success' => 'you did it :3',
            'id' => $id
        ]);
    }

    public function create(Request $request, Warehouse $warehouse, $id)
    {

        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();
        // var_dump($token);
        if(!$token){
            return response()->json(['error' => 'not logged in']);
        }

        $request->validate([
            'product' => 'required|string',
            'quantity' => 'required|integer',
            'supplier' => 'required|string',
            'product_id' => 'required|integer',
            'date' => 'required|date',
        ]);

        $warehouse->product = $request->product;
        $warehouse->quantity = $request->quantity;
        $warehouse->warehouse_app_id = $id;
        $warehouse->product_id = $request->product_id;
        $warehouse->supplier = $request->supplier;
        $warehouse->date = $request->date;

        if($warehouse->save()){
            return response()->json(['success' => 'Product added to warehouse.']);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }
}
