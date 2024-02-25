<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('api')->group(function () {
    // Public APIs
    Route::get('/application/users/public/leaderboard', [UserApiController::class, 'leaderboard']);
});

Route::middleware('application_api')->group(function () {
    // Internal APIs
    Route::get('/application/users', [UserApiController::class, 'userList']);
    Route::get('/application/users/{id}', [UserApiController::class, 'userDetails']);
    Route::patch('/application/users/{id}', [UserApiController::class, 'modifyUser']);
    Route::delete('/application/users/{id}', [UserApiController::class, 'deleteUser']);
    Route::delete('/application/users/{id}/ip', [UserApiController::class, 'clearIpRecords']);
    Route::get('/application/users/external/{id}', [UserApiController::class, 'externalUserDetails']);
    Route::patch('/application/users/external/{id}', [UserApiController::class, 'modifyExternalUser']);
    Route::delete('/application/users/external/{id}', [UserApiController::class, 'deleteExternalUser']);
    Route::patch('/application/users/external/{id}/coins/add', [UserApiController::class, 'addExternalUserCoins']);
    Route::patch('/application/users/external/{id}/coins/set', [UserApiController::class, 'setExternalUserCoins']);
    Route::patch('/application/users/external/{id}/bypass', [UserApiController::class, 'toggleBypass']);
});
