<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;


class WarehouseController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->all();

        // print_r($data);

        // $loggedIn = Auth::check();
        // echo 'user:';
        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();
        // var_dump($token);
        if($token){
            return response()->json(['success' => $token]);
        }else{
            return response()->json(['error' => 'not logged in']);
        }
        // var_dump($tokenId);
        // if (!$loggedIn)
        //     return response()->json([
        //         'error' => 'Not logged in'
        //     ], 200);

        // echo $this->authController->status();

        // Your processing logic here

        // Return a response if needed
        // return response()->json(['message' => 'Data received successfully']);
    }
}
