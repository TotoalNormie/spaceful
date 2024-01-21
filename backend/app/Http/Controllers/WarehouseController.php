<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\Warehouse;
use App\Models\warehouse_app;
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
        $warehouseId = warehouse_app::where('user_id', $token->tokenable_id);
        if(!$warehouseId){
            return response()->json(['error' => 'not logged in']);
        }

        // $warehouse = Warehouse::where('warehouse_app_id', 1)->join('products', 'warehouses.products_id', '=', 'products.id')->select('warehouses.id', 'warehouses.amount', 'products.name', 'warehouses.shelfId')->get();
        $warehouse = DB::table('warehouses')->where('warehouses.warehouse_app_id', 1)->join('products', 'warehouses.products_id', '=', 'products.id')->select('warehouses.id', 'warehouses.amount', 'products.name', 'warehouses.shelfId')->get();
        if(!$warehouse){
            return response()->json(['error' => 'not logged in']);
        }
        return response()->json($warehouse);
    }
  
    public function getWarehouse($id)

    {

        return response()->json([
            'success' => 'you did it :3',
            'id' => $id
        ]);
    }

    public function create(Request $request, Warehouse $warehouse, $id)

    public function create(Request $request)
    {
        // $data = $request->all();

        // print_r($data);

        // $loggedIn = Auth::check();
        // echo 'user:';
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
