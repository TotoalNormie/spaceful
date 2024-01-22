<?php

namespace App\Http\Controllers;

use App\Models\warehouse_app;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class WarehouseAppController extends Controller
{
    public function create(Request $request, warehouse_app $warehouse_app)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();

        if (!$token) {
            return response()->json(['error' => 'not logged in'], 500);
        }

        $user_id = $token->tokenable_id;

        $warehouse_app->user_id = $user_id;
        $warehouse_app->name = $request->name;
        $warehouse_app->description = $request->description ?? '';

        if ($warehouse_app->save()) {
            // Retrieve the ID of the saved row
            $savedId = $warehouse_app->id;

            return response()->json([
                'success' => 'Warehouse app created successfully',
                'id' => $savedId,
            ]);
        } else {
            // Failed to save - Display specific error messages
            $errors = $warehouse_app->getErrors();
            return response()->json(['error' => $errors], 500);
        }
    }
    public function get(Request $request, warehouse_app $warehouse_app, $id)
    {
        $fullToken = $request->bearerToken();
        $tokenId = explode("|", $fullToken);
        $token = PersonalAccessToken::where('id', $tokenId[0])->select('tokenable_id')->first();

        if (!$token) {
            return response()->json(['error' => 'not logged in'], 500);
        }

        $user_id = $token->tokenable_id;

        $matchedData = $warehouse_app
            ->where('user_id', $user_id)
            ->where('id', $id)
            ->get();
        if ($matchedData->isEmpty()) {
            return response()->json(['error' => 'warehouse app does not exist'], 404);
        }

        return response()->json([
            'success' => 'Data retrieved successfully',
            'data' => $matchedData->first(), // Access the first item in the collection
        ]);

    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'description' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $warehouse_app = warehouse_app::find($id);

        if (!$warehouse_app) {
            return response()->json(['error' => 'Warehouse app not found'], 404);
        }

        $warehouse_app->name = $request->name;
        $warehouse_app->description = $request->description ?? '';

        if ($warehouse_app->save()) {
            // Retrieve the ID of the saved row

            return response()->json([
                'success' => 'Warehouse app updated successfully',
            ]);
        } else {
            // Failed to save - Display specific error messages
            $errors = $warehouse_app->getErrors();
            return response()->json(['error' => $errors], 500);
        }
    }
}