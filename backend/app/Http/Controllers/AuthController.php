<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    function create(Request $request, User $user){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'password' => 'required|string',
            'email' => 'string|required',
            'roles_id' => 'integer',
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();

        $found = User::where('name', $request->name)->first();
        if($found){
            return response()->json([
                'error' => 'User already in database.'
            ], 404);
        }
        $email = User::where('email', $request->email)->first();
        if($email){
            return response()->json([
                'error' => 'User with that email aleady exists.'
            ], 404);
        }

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

            $token = $user->createToken('Personal Access Token');
            return ['token' => $token->plainTextToken];

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

        // $credentials = $request->validate([
        //     'name' => 'required|string',
        //     'password' => 'required|string',
        // ]);
 
        // if (Auth::attempt($credentials)) {
        // // if (Auth::login($user)){
        //     $request->session()->regenerate();
 
        //     return response()->json([
        //         'message' => 'Yay 😎'
        //     ], 200);
        // }
        
        $request->validate([
            'name' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('name', $request->name)->first();

        if(!$user){
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }

        // $user->name = $request->name;
        // $user->password = $request->password;


        // $token = $request->user()->createToken($request->token_name);
        // $token = $request->user()->createToken('Personal Access Token');

        $token = $user->createToken('Personal Access Token');
 
        return ['token' => $token->plainTextToken];
        
        // return response()->json([
        //     'message' => 'Yay 😎'
        // ], 200);

    }

    function logout(Request $request, User $user, PersonalAccessToken $token){

        // Auth::logout();
        // $request->session()->invalidate();
        // $request->session()->regenerateToken();

        $fullToken = $request->bearerToken();

        $tokenId = explode("|", $fullToken);
        if(empty($fullToken) || $fullToken == 'undefined'){
            return response()->json([
                'error' => 'Already logged out'
            ], 500);
        }
        // return response()->json([
        //     'error' => $fullToken
        // ], 500);
        // $token = ;
        if(PersonalAccessToken::where('id', $tokenId[0])->delete()){
            return response()->json([
                'message' => 'User logged out sucessfuly'
            ], 200);
        }else{
            return response()->json([
                'error' => 'Something went wrong'
            ], 500);
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

    function getUserData(Request $request){
        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();

        if (!$token) {
            return response()->json(['error' => 'not logged in'], 500);
        }

        $user_id = $token->tokenable_id;
        $data = User::find($user_id);

        return response()->json(['data' => $data]);
    }

    function passForgor(Request $request){
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
            'email' => 'string|required',
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Validation failed',
                'error' => $validator->errors()->toArray()
            ], 422);
        }
        $request = (object) $validator->validated();
        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json([
                'error' => 'User not found'
            ], 404);
        }
        $user->password = Hash::make($request->password);
        if($user->save()){
            return response()->json([
                'message' => 'Password changed sucessfuly'
            ]);
        }
        // $token = $user->createToken('Reset Password Token');
        // return ['token' => $token->plainTextToken];
    }
}
