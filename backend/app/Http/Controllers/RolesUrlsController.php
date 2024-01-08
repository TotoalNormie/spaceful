<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RolesUrls;

class RolesUrlsController extends Controller
{
    function create(Request $request, RolesUrls $role){
        $request->validate([
            'userId' => 'required|string',
            'roleId' => 'required|string',
            'url' => 'required|string',
        ]);
        $role->roles_id = $request->roleId;
        $role->user_id = $request->userId;
        $role->url = $request->url;
        if($role->save()){
            return response()->json([
                'message' => 'Role url added sucessfuly'
            ]);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }
}
