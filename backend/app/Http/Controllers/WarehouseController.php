<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;


class WarehouseController extends Controller
{
    public function getWarehouse($id, Warehouse $warehouse)
    {
            $items = Warehouse::where('warehouse_app_id', $id)->get();
        return response()->json([
            'success' => 'you did it :3',
            'data' => $items
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
