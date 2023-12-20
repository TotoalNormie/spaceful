<?php

namespace App\Http\Controllers;

use App\Models\Roles;
use Illuminate\Http\Request;

class RolesController extends Controller
{
    function create(Request $request, Roles $role){
        $request->validate([
            'roleName' => 'required|string',
            'read' => 'required|boolean',
            'write' => 'required|boolean',
            'manageUser' => 'required|boolean',
            'manageRoles' => 'required|boolean',
        ]);
        $role->roleName = $request->roleName;
        $role->read = $request->read;
        $role->write = $request->write;
        $role->manageUser = $request->manageUser;
        $role->manageRoles = $request->manageRoles;
        if($role->save()){
            return response()->json([
                'message' => 'Role added sucessfuly'
            ]);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }
}
