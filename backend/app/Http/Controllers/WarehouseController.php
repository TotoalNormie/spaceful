<?php

namespace App\Http\Controllers;

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
        if($token){
            return response()->json(['success' => $token]);
        }else{
            return response()->json(['error' => 'not logged in']);
        }
        // var_dump($tokenId);
        // if (!$loggedIn)
        //     return response()->json([
        //         'error' => 'Not logged in'
        //     ], 200);

        // echo $this->authController->status();

        // Your processing logic here

        // Return a response if needed
        // return response()->json(['message' => 'Data received successfully']);
    }
}
