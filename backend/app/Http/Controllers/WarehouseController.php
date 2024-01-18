<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;


class WarehouseController extends Controller
{

    public function getWarehouse($id)
    {

        return response()->json([
            'success' => 'you did it :3',
            'id' => $id
        ]);
    }


    public function create(Request $request)
    {
    }
}
