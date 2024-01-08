<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function create(Request $request, User $user){
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
            'roles_id' => 'required|integer',
        ]);
        // $user = new User();
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->roles_id = $request->roles_id;
        if($user->save()){
            return response()->json([
                'message' => 'User added sucessfuly'
            ]);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }

    function login(Request $request){
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
            'roles_id' => 'required|integer',
        ]);

        if (Auth::attempt($request)) {
            $request->session()->regenerate();
 
            return redirect()->intended('dashboard');
        }
    }

    function destroy(Request $request, $id){
        $user = User::where('id', $id)->first();

        if(!$user){
            return response()->json(['error' => 'User not found.']);
        }
        if($user->delete()){
            return response()->json([
                'message' => 'User deleted sucessfuly'
            ]);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }
}
