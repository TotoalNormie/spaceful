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
use Dotenv\Validator;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Support\Carbon;

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

    public function getWarehouse($id, Warehouse $warehouse)

    {
            // $items = Warehouse::where('warehouse_app_id', $id)->get();
            $items = DB::table('warehouses')->join('products', 'warehouses.products_id', '=', 'products.id')->select('*')->where('warehouses.warehouse_app_id', $id)->get();
        return response()->json([
            'success' => 'you did it :3',
            'data' => $items
        ]);
    }

    public function create(Request $request, Warehouse $warehouse, $id)
    {

        $validator = FacadesValidator::make($request->all(), [
            'product' => 'required|string',
            'shelfId' => 'required|string',
            'amount' => 'required|integer',
            'products_id' => 'required|integer',
            // 'date' => 'required|date',
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        // return var_dump($id);
        // "SQLSTATE[22007]: Invalid datetime format: 1366 Incorrect integer value: '[object Object]' for column `spaceful`.`warehouses`.`warehouse_app_id` at row 1 (Connection: mysql, SQL: insert into `warehouses` (`products_id`, `warehouse_app_id`, `shelfId`, `amount`, `date`, `updated_at`, `created_at`) values (1, [object Object], A1, 2, 2024-01-24 06:51:37, 2024-01-24 06:51:37, 2024-01-24 06:51:37))"

        $warehouse->products_id = $request->product;
        $warehouse->warehouse_app_id = $id;
        $warehouse->shelfId = $request->shelfId;
        $warehouse->amount = $request->amount;
        $warehouse->products_id = $request->products_id;
        // $warehouse->date = strtotime($request->date);
        $warehouse->date = Carbon::now();
        // echo $warehouse->date;



        if($warehouse->save()){
            return response()->json(['success' => 'Product added to warehouse.']);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }
}