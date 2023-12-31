<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Dashboard\DashboardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return Inertia::render('Welcome', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'indexPage'])->name('dashboard');
    Route::get('/dashboard/server/create', [DashboardController::class, 'serverCreationPage'])->name('dashboard.server.create');
    Route::post('/dashboard/server/create', [DashboardController::class, 'serverCreation'])->name('server.create');
    Route::get('/dashboard/resource/store', [DashboardController::class, 'resourceStorePage'])->name('dashboard.resource.store');
    Route::get('/test', function () {
        return Inertia::render('Test');
    })->name('test');
    Route::redirect('/', '/login');
    Route::post('/reset/password', [DashboardController::class, 'resetPassword'])->name('reset.password');
});

Route::get('/login/discord', [SocialController::class, 'redirectToDiscord'])->name('login.discord');
Route::get('/login/discord/callback', [SocialController::class, 'handleDiscordCallback'])->name('login.discord.callback');
