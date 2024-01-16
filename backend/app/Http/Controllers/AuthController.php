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
            return  response()->json([
                'message' => 'user logged in can\'t register'
            ], 401);
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

    function status(Request $request){
        if (Auth::check()) {
            return response()->json([
                'message' => 'Logged in.'
            ], 200);
        }else{
            return response()->json([
                'error' => 'User not logged in'
            ], 200);
        }
    }

    function login(Request $request, User $user){

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
        // if (Auth::login($user)){
            $request->session()->regenerate();
 
            return response()->json([
                'message' => 'Yay 😎'
            ], 200);
            // return redirect('/');
        }
 
        return back()->withErrors([
            'name' => 'The provided credentials do not match our records.',
        ])->onlyInput('name');

    }

    function logout(Request $request){

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'message' => 'User logged out sucessfuly'
        ], 200);

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

    function getWarehouses(Request $request){
        // $foundUser = User::where('name', $request->name)->select('id')->first();
        // $userId = 0;
        // if(!$foundUser){
        //     return response()->json([
        //         'error' => 'User not found'
        //     ], 500);
        // }else{
        //     $userId = $foundUser->id;
        // }

        if (!Auth::check()) {
            return response()->json([
                'error' => 'user not logged in'
            ], 401);
        }

        return response()->json([
            'userId' => Auth::id()
        ], 200);

        // $found = User::join('warehouses', 'users.id',  '=', 'warehouses.managerId')->select('warehouses.id')->where('users.id', Auth::id())->get();
        // if($found){
        //     $temp = [];
        //     foreach($found as $foundWarehouses){
        //         array_push($temp, $foundWarehouses->id);
        //     }
        //     return response()->json([
        //         'message' => $temp
        //     ], 200);
        // }
    }
}
