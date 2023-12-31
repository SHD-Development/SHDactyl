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
    // Without API Key

});
Route::middleware('irapikey')->group(function () {
    // Internal Read
    Route::get('/application/users/{id}', [UserApiController::class, 'userDetails']);
});
Route::middleware('iwapikey')->group(function () {
    // Internal Write
});
Route::middleware('irwapikey')->group(function () {
    // Internal Read & Write
});
Route::middleware('erapikey')->group(function () {
    // External Read
});
Route::middleware('ewapikey')->group(function () {
    // External Write
});
Route::middleware('erwapikey')->group(function () {
    // External Read & Write

});
