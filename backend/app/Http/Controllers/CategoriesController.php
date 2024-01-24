<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use App\Models\warehouse_app;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    function select($id)
    {
        $categories = Categories::where('warehouse_app_id', $id)->get();

        return response()->json(
            $categories
        );
    }

    function create(Request $request){
        $validator = Validator::make($request->all(), [
            'categoryName' => 'required|string',
            'warehouse_app_id' => 'required|int|min:1',
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();

        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();
        if(!$token){
            return response()->json(['error' => 'not logged in']);
        }
        // $role = Roles::where('user_id', $token->tokenable_id)->select('roleName')->first();
        $warehouseApp = warehouse_app::where('user_id', $token->tokenable_id)->select('id')->first();
        $categories= Categories::new();
        $categories->categoryName = $request->categoryName;
        $categories->warehouse_app_id = $warehouseApp->id;
        if($categories->save()){
            return response()->json([
                'message' => 'Category created successfully',
                'data' => $categories
            ]);
        }else{ 
            return response()->json([
                'message' => 'Error creating category'
            ]); 
        }

    }
}
