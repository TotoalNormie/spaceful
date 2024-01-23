<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\warehouse_app;
use App\Models\WarehouseWorkers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WarehouseWorkersController extends Controller
{
    static function create($user_id, $warehouse_app_id)
    {
        if (!User::find($user_id))
            return ['error' => 'User not found'];
        if (!warehouse_app::find($warehouse_app_id))
            return ['error' => 'Warehouse App not found'];

        $workers = new WarehouseWorkers;
        $workers->user_id = $user_id;
        $workers->warehouse_app_id = $warehouse_app_id;

        if (!$workers->save()) {
            $errors = $workers->getErrors();
            return ['error' => $errors];
        }

        return true;
    }

    function get($id)
    {
        $workers = DB::table('warehouse_workers')
            ->join('users', 'users.id', '=', 'warehouse_workers.user_id')
            ->join('roles', 'roles.id', '=', 'users.roles_id')
            ->where('warehouse_workers.warehouse_app_id', $id)
            ->select('warehouse_workers.user_id', 'users.name', 'users.email', 'users.name', 'users.roles_id', 'roles.RoleName')
            ->orderBy('warehouse_workers.user_id')
            ->get();
        if (!$workers) {
            return response()->json(['error' => 'no results']);
        }
        return response()->json($workers);

    }
}
