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
use App\Models\ActionLog;
use Spatie\DiscordAlerts\Facades\DiscordAlert;
use Carbon\Carbon;
use Laravel\Socialite\Facades\Socialite;

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
            if (!($realCoupon->used_times >= $realCoupon->times)) {
                $history = ActionLog::where('action_type', 'resource.coupon.redeem')
                    ->where('user_id', $user->id)
                    ->where('status', 'success')
                    ->whereJsonContains('content->code', $realCoupon->code)->first();

                if (!$history) {
                    ActionLog::create([
                        'action_type' => 'resource.coupon.redeem',
                        'user_id' => $user->id,
                        'content' => [
                            'code' => $realCoupon->code,
                        ],
                        'status' => 'success'
                    ]);
                    DiscordAlert::to('coins')->message("", [
                        [
                            'title' => '[兌換代碼]',
                            'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                                '代碼名稱：' . $realCoupon->name . '\n' . '代碼：`' . $realCoupon->code . '`\n' . '獲得代幣：$ ' . $realCoupon->coins . ' SDC\n' . '可用次數：' . $realCoupon->times . ' 次\n' . '已使用次數：' . $realCoupon->used_times . ' 次',
                            'color' => '#03cafc',
                            'footer' => [
                                'icon_url' => config('shdactyl.webhook.icon_url'),
                                'text' => 'SHDactyl',
                            ],
                            'timestamp' => Carbon::now(),
                            'author' => [
                                'name' => $user->name,
                                'icon_url' => $user->avatar,
                            ],
                        ]
                    ]);
                    $user->increment('coins', $realCoupon->coins);
                    $user->save();
                    $realCoupon->used_times++;
                    $realCoupon->save();
                    return redirect('/dashboard/resource/coupon')->with('success', '成功兌換名為 "' . $realCoupon->name . '" 的代碼並獲得了 $ ' . $realCoupon->coins . ' SDC');

                } else {
                    return redirect('/dashboard/resource/coupon')->with('error', '你已經兌換過了這個名為 "' . $realCoupon->name . '" 的代碼');
                }
            } else {
                return redirect('/dashboard/resource/coupon')->with('error', '這個名為 "' . $realCoupon->name . '" 的代碼已達使用次數上限');
            }
        } else {
            return redirect('/dashboard/resource/coupon')->with('error', '沒有這個代碼');
        }
    }
}
