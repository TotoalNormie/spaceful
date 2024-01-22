<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\warehouse_app;
use App\Models\WarehouseWorkers;
use Illuminate\Http\Request;

class WarehouseWorkersController extends Controller
{
    static function create($user_id, $warehouse_app_id)
    {
        if(!User::find($user_id)) return ['error' => 'User not found'];
        if(!warehouse_app::find($warehouse_app_id)) return ['error' => 'Warehouse App not found'];

        $workers = new WarehouseWorkers;
        $workers->user_id = $user_id;
        $workers->warehouse_app_id = $warehouse_app_id;

        if(!$workers->save()) {
            $errors = $workers->getErrors();
            return ['error' => $errors];
        }

        return true;
    } 
}
