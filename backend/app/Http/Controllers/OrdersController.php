<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class OrdersController extends Controller
{
    function create(Request $request, Orders $orders){
        $validator = Validator::make($request->all(), [
            'product' => ['required', 'integer'],
            'type' => ['required', 'string', 'min:3', 'max:4'],
            'supplier' => ['required', 'string', 'min:1', 'max:255'],
            'status' => ['required', 'int'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 500);
        }
        $orders->products_id = $request->product;
        $orders->orderType = $request->type;
        $orders->supplier = $request->supplier;
        $orders->status = $request->status;
        if($orders->save()){
            return response()->json([
                'message' => 'Order for '.$request->product.' created successfully',
            ], 200);
        }else{
            return response()->json([
                'message' => 'Order failed',
            ], 500);
        }
    }
    
    function show(){
        return Orders::all();
    }
}
