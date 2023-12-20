<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    //
    function show(){
        $products = Products::all();
        return response()->json($products);
        // return view('products');
    }
}
