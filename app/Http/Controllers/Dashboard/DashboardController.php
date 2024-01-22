<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use RealRashid\SweetAlert\Facades\Alert;


class DashboardController extends Controller
{
    public function indexPage()
    {
        $user = Auth::user();
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->get($url . '/api/application/users/' . $user->panel_id);
        $data = json_decode($res, true);
        Alert::info('Beta', '目前處於 Open Beta 階段，若遇到任何問題請回報，感謝您。');
        return Inertia::render('Dashboard', [
            'data' => $data
        ]);
    }
    public function serverCreationPage()
    {
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $nodes = config('shdactyl.nodes');

        return Inertia::render('Server/Create', [
            'nodes' => $nodes
        ]);
    }
    public function resourceStorePage()
    {
        return Inertia::render('Resource/Store');
    }
    public function resetPassword()
    {
        $user = Auth::user();
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $password = Str::random();
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->patch($url . '/api/application/users/' . $user->panel_id, [
                    'email' => $user->email,
                    'username' => $user->discord_id,
                    'first_name' => $user->name,
                    'last_name' => $user->database_id,
                    'password' => $password,
                ]);
        $user->password = bcrypt(request($password));
        $user->save();
        return redirect('/dashboard')->with('success', '新的密碼：' . $password);

    }

    public function serverCreation(Request $request)
    {
        dd($request);
        $request->validate([
            'name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email'],
        ]);
    }
}
