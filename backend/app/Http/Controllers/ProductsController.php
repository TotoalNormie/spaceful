<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    //
    function show(){
        $products = Products::all();
        return response()->json($products);
    }

    function report(){
        $products = DB::table('products')->join('categories', 'products.categories_id', '=', 'categories.id')->select('products.name', 'categories.categoryName', 'products.price', 'products.weight', 'products.supplier')->get();
        // $products = Products::where(1)->join('categories', 'products.categories_id', '=', 'categories.id')->select('products.name', 'categories.categoryName', 'products.price', 'products.weight', 'products.supplier')->get();
        return response()->json($products);
    }

    function create(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'price' => ['required', 'decimal:1,2', 'min:0.01'],
            'weight' => ['required', 'decimal:1,2', 'min:0.01'],
            'supplier' => ['required', 'string'],
            'appId' => ['required', 'integer'],
            'supplier_description' => ['string'],
            'category' => ['integer'],
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();

        $product = new Products();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->weight = $request->weight;
        $product->supplier = $request->supplier;
        $product->supplierDescription = $request->supplier_description;
        $product->warehouse_app_id = $request->appId;
        if(empty($request->category)){
            $product->categories_id = 1;
        }

        if($product->save()){
            return response()->json(['message' => 'Product created successfully']);
        }else{
            return response()->json(['message' => 'Product not created']);
        }

    }

    function update($id, Request $request){

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'price' => ['required', 'string'],
            'weight' => ['required', 'string'],
            'supplier' => ['required', 'string'],
            'supplier_description' => ['string'],
            'category' => ['integer'],
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();

        $product = Products::find($id);
        if(!$product){
            return response()->json(['error' => 'Product not found'], 404);
        }
        $product->name = $request->name;
        $product->price = $request->price;
        $product->weight = $request->weight;
        $product->supplier = $request->supplier;
        $product->supplierDescription = $request->supplier_description;
        if(empty($request->category)){
            $product->categories_id = 1;
        }

        if($product->save()){
            return response()->json(['message' => 'Product updated successfully']);
        }else{
            return response()->json(['message' => 'Product failed to update'], 500);
        }
    }

    function destroy($id){
        $product = Products::find($id);
        if(!$product){
            return response()->json(['error' => 'Product not found'], 404);
        }
        if($product->delete()){
            return response()->json(['message' => 'Product deleted successfully']);
        }else{

            return response()->json(['error' => 'Failed to delete product Id - '.$id.'']);
        }
    }
}
