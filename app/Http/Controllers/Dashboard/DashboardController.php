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
use App\Models\Coupon;

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
        $user = Auth::user();
        $data = $request->validate([
            'name' => 'required|max:30',
            'node' => 'required|numeric|integer',
            'cpu' => 'required|numeric|integer|min:5|max:400',
            'ram' => 'required|numeric|integer|min:32|max:8192',
            'disk' => 'required|numeric|integer|min:64|max:20480',
            'databases' => 'required|numeric|integer|min:0|max:20',
            'backups' => 'required|numeric|integer|min:0|max:30',
        ]);
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->post($url . '/api/application/servers', [
                    'name' => $data['name'],
                    'user' => $user->panel_id,
                ]);
        return redirect('/dashboard/server/create')->with('success', 'yes');
    }
    public function couponPage()
    {
        return Inertia::render('Resource/Coupon');
    }
    public function redeemCoupon(Request $request)
    {
        $user = Auth::user();
        $coupon = $request['coupon'];
        $realCoupon = Coupon::where('code', $coupon)->first();
        if ($realCoupon) {
            return redirect('/dashboard/resource/coupon')->with('success', 'yes');
        } else {
            return redirect('/dashboard/resource/coupon')->with('error', 'error');
        }
    }
}
