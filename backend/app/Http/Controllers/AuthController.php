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

        if (Auth::check()) {
            return redirect('/');
        }

        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
            'email' => 'required|string',
            'roles_id' => 'integer',
        ]);
        // $user = new User();
        $user->name = $request->name;
        $user->password = Hash::make($request->password);
        $user->email = $request->email;

        if(empty($request->roles_id)){
            $user->roles_id = 1;
        }else{
            $user->roles_id = $request->roles_id;
        }

        if($user->save()){
            // return response()->json([
            //     'message' => 'User added sucessfuly'
            // ]);

            $credentials = $request->validate([
                'name' => 'required|string',
                'password' => 'required|string',
            ]);
     
            if (Auth::attempt($credentials)) {
                $request->session()->regenerate();
     
                return response()->json([
                    'message' => 'Yay 😎'
                ], 200);
                // return redirect()->intended('dashboard');
            }
        }else {
            return response()->json(['error' => 'Fill all parameters.']);
        }
    }

    function login(Request $request, User $user){
            
        // $request->validate([
        //     'name' => 'required|string',
        //     'password' => 'required|string',
        // ]);
        
        // $user = User::where('name', $request->name)->first();
        // if(!$user){
        //     return response()->json([
        //         'error' => 'User not found'
        //     ]);
        // }

        // $credentials = $request->validate([
        //     'name' => 'required|string',
        //     'password' => 'required|string',
        // ]);

        // if (!Auth::attempt($credentials)) {
        //     return response()->json([
        //         'message' => 'Unauthorized'
        //     ], 401);
        // }

        // $token = $request->user()->createToken('Personal Access Token');
        // return ['token' => $token->plainTextToken];

        $found = User::where('name', $request->name)->first();

        if(!$found){
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }

        if (Auth::check()) {
            return redirect('/');
        }

        $credentials = $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return response()->json([
                'message' => 'Yay 😎'
            ], 200);
            // return redirect()->intended('dashboard');
        }
 
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');

    }

    function logout(Request $request){

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'message' => 'User logged out sucessfuly'
        ], 200);
        // if (Auth::check()) {
        //     Auth::logout();
        //     $request->session()->invalidate();
        //     $request->session()->regenerateToken();
        //     return response()->json([
        //         'message' => 'User logged out sucessfuly'
        //     ], 200);
        // }
        // return redirect('/login');

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
