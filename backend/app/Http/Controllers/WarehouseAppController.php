<?php

namespace App\Http\Controllers;

use App\Models\warehouse_app;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class WarehouseAppController extends Controller
{
    public function create(Request $request, warehouse_app $warehouse_app)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
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

        $warehouseApp = warehouse_app::find($id); // Assuming you have a WarehouseApp model

        $isOwner = $warehouseApp->where('user_id', $user_id)->count();

        $hasAccess = warehouse_app::join('warehouse_workers', 'warehouse_workers.warehouse_app_id', '=', 'warehouse_apps.id')
            ->where('warehouse_workers.user_id', $user_id)
            ->select('warehouse_apps.*')
            ->count();

        if ($isOwner === 0 && $hasAccess === 0) {
            return response()->json(['error' => 'Don\'t have access to the warehouse app'], 403);
        }

        return response()->json([
            'success' => 'Data retrieved successfully',
            'data' => $warehouseApp,
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