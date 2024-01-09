<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

// use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    function create(Request $request, User $user){
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
            'roles_id' => 'integer',
        ]);
        // $user = new User();
        $user->name = $request->name;
        $user->password = Hash::make($request->password);

        if(empty($request->roles_id)){
            $user->roles_id = 1;
        }else{
            $user->roles_id = $request->roles_id;
        }

        if($user->save()){
            return response()->json([
                'message' => 'User added sucessfuly'
            ]);
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }

    function login(Request $request){
        
        // if (Auth::attempt($credentials)) {
        //     $request->session()->regenerate();
        
        //     // return redirect()->intended('dashboard');
        // }
            
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);
        
        $user = User::where('name', $request->name)->first();
        if(!$user){
            return response()->json([
                'error' => 'User not found'
            ]);
        }

        $credentials = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        // $token = $request->user()->createToken('MyApp')->accessToken;
        // $token = $request->name->createToken()->accessToken;
        $token = $request->user()->createToken('Personal Access Token');
        return ['token' => $token->plainTextToken];
        // return response()->json([
        //     'token' => $token->plainTextToken,
        // ]);

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
