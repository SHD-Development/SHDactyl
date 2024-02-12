<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Admin\AdminController;

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
    Route::get('/dashboard/server/manage', [DashboardController::class, 'serverManagementPage'])->name('dashboard.server.manage');
    Route::post('/server/create', [DashboardController::class, 'serverCreation'])->name('server.create');
    Route::post('/server/unsuspend', [DashboardController::class, 'unsuspendServer'])->name('server.unsuspend');
    Route::delete('/server/delete', [DashboardController::class, 'deleteServer'])->name('server.delete');
    Route::patch('/server/modify', [DashboardController::class, 'modifyServer'])->name('server.modify');
    Route::get('/dashboard/resource/store', [DashboardController::class, 'resourceStorePage'])->name('dashboard.resource.store');
    Route::post('/resource/store/buy/{resource}', [DashboardController::class, 'buyResource'])->name('resource.store.buy');
    Route::get('/dashboard/resource/coupon', [DashboardController::class, 'couponPage'])->name('dashboard.resource.coupon');
    Route::post('/resource/coupon/redeem', [DashboardController::class, 'redeemCoupon'])->name('resource.coupon.redeem');
    Route::redirect('/', '/login');
    Route::post('/reset/password', [DashboardController::class, 'resetPassword'])->name('reset.password');
});
Route::get('/external/panel/{path}', function ($path) {

    $url = config('shdactyl.pterodactyl.url');

    $parts = explode('.', $path);

    $fullPath = collect($parts)->map(function ($part) {
        return trim($part, '.');
    })->implode('/');

    return redirect($url . '/' . $fullPath);

})->name('external.panel');
Route::get('/login/discord', [SocialController::class, 'redirectToDiscord'])->name('login.discord');
Route::get('/login/discord/callback', [SocialController::class, 'handleDiscordCallback'])->name('login.discord.callback');

Route::get('/admin/modules', [AdminController::class, 'modulesPage'])->name('modules.dashboard');
