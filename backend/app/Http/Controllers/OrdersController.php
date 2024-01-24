<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Models\Products;
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
            'amount' => ['required', 'numeric', 'min:1'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 500);
        }
        $price = Products::where('id', $request->product)->select('price')->first();
        // return $price->price;
        $orders->products_id = $request->product;
        $orders->orderType = $request->type;
        $orders->supplier = $request->supplier;
        $orders->status = $request->status;
        $orders->amount = $request->amount;
        $orders->sum = $price->price * $request->amount;
        if($orders->save()){
            return response()->json([
                'message' => 'Order for Id:'.$request->product.' created successfully',
            ], 200);
        }else{
            return response()->json([
                'message' => 'Order failed',
            ], 500);
        }
    }

    function update(Request $request, $id){
        $validator = Validator::make($request->all(), [
            'status' => ['required', 'integer'],
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();
        $order = Orders::find($id);
        // return $order;
        if(!$order){
            return response()->json([
                'error' => 'Order not found',
            ], 404);
        }
        $order->status = $request->status;
        if($order->save()){
            return response()->json([
                'message' => 'Order Id:'.$id.' updated successfully',
            ], 200);
        }else{
            return response()->json([
                'error' => 'Order Id:'.$id.' failed to update',
            ], 200);
        }
    }

    function show(){
        return Orders::all();
    }

    function showById($id){
        return Orders::find($id)->first();
    }

    function destroy($id){
        $order = Orders::find($id);
        if($order->delete()){
            return response()->json([
                'message' => 'Order deleted successfully',
            ], 200);
        }else{
            return response()->json([
                'message' => 'Order failed',
            ], 500);
        }
    }
}
