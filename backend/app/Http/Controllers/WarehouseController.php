<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\Warehouse;


class WarehouseController extends Controller
{
    function report($id){
        // $warehouse->join('products', 'warehouses.products_id', '=', 'products.id')->select('warehouses.*')->get();
        $warehouse = Warehouse::where('warehouses.id', $id)->join('products', 'warehouses.products_id', '=', 'products.id')->select('warehouses.amount', 'products.name', 'warehouses.shelfId')->get();
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
