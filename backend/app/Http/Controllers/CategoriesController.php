<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    function select($id)
    {
        $categories = Categories::where('warehouse_app_id', $id)->get();

        return response()->json(
            $categories
        );
    }
}
