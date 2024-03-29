<?php

namespace App\Http\Controllers\Auth;

use App\Exceptions\AltException;
use App\Exceptions\ProxyException;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Request;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use Spatie\DiscordAlerts\Facades\DiscordAlert;
use Carbon\Carbon;
use App\Models\IpRecords;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Bypass;

class SocialController extends Controller
{
    public function redirectToDiscord(): RedirectResponse
    {
        return Socialite::driver('discord')->redirect();
    }

    public function handleDiscordCallback(): RedirectResponse
    {
        $user = Socialite::driver('discord')->user();
        $resProxy = Http::withHeaders([
            'Accept' => 'application/json',
        ])->get('http://ip-api.com/json/' . Request::ip() . '?fields=proxy');
        $dataProxy = json_decode($resProxy, true);
        $bypass = Bypass::where('discord_id', $user->id)->first();
        if ($bypass) {
            if (isset($dataProxy['proxy'])) {
                if ($dataProxy['proxy'] == true && $bypass->bypass == false) {
                    DiscordAlert::to('exception')->message("", [
                        [
                            'title' => '[代理阻擋]',
                            'description' => '帳號：<@' . $user->id . '> (' . $user->id . ')\n' .
                                '電子郵件：' . $user->email .
                                '\nIP 紀錄：' . Request::ip(),
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
                    throw new ProxyException();
                }
            }
        } else {
            if (isset($dataProxy['proxy'])) {
                if ($dataProxy['proxy'] == true) {
                    DiscordAlert::to('exception')->message("", [
                        [
                            'title' => '[代理阻擋]',
                            'description' => '帳號：<@' . $user->id . '> (' . $user->id . ')\n' .
                                '電子郵件：' . $user->email .
                                '\nIP 紀錄：' . Request::ip(),
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
                    throw new ProxyException();
                }
            }
        }
        $existingUser = User::where('discord_id', $user->id)->first();

        if ($existingUser) {
            $duplicateIps = IpRecords::where('ip', Request::ip())
                ->where('user_id', '!=', $existingUser->id)
                ->first();
            if ($duplicateIps) {
                DiscordAlert::to('exception')->message("", [
                    [
                        'title' => '[多帳阻擋]',
                        'description' => '帳號：<@' . $existingUser->discord_id . '> (' . $existingUser->discord_id . ')\n' .
                            '電子郵件：' . $existingUser->email .
                            '\nIP 紀錄：' . Request::ip(),
                        'color' => '#03cafc',
                        'footer' => [
                            'icon_url' => config('shdactyl.webhook.icon_url'),
                            'text' => 'SHDactyl',
                        ],
                        'timestamp' => Carbon::now(),
                        'author' => [
                            'name' => $existingUser->name,
                            'icon_url' => $existingUser->avatar,
                        ],
                    ]
                ]);
                throw new AltException();
            }
            auth()->login($existingUser, true);
            $ipRecord = IpRecords::create([
                'user_id' => $existingUser->id,
                'ip' => Request::ip(),
            ]);
            $ipRecords = IpRecords::where('user_id', $existingUser->id)
                ->orderBy('id')
                ->take(3)
                ->get();
            $ips = [];
            foreach ($ipRecords as $ip) {
                $ips[] = $ip['ip'];
            }
            DiscordAlert::to('login')->message("", [
                [
                    'title' => '[登入請求]',
                    'description' => '帳號：<@' . $existingUser->discord_id . '> (' . $existingUser->discord_id . ')\n' .
                        '電子郵件：' . $existingUser->email .
                        '\nIP 紀錄：' . implode(', ', $ips),
                    'color' => '#03cafc',
                    'footer' => [
                        'icon_url' => config('shdactyl.webhook.icon_url'),
                        'text' => 'SHDactyl',
                    ],
                    'timestamp' => Carbon::now(),
                    'author' => [
                        'name' => $existingUser->name,
                        'icon_url' => $user->avatar,
                    ],
                ]
            ]);
        } else {
            $duplicateIps = IpRecords::where('ip', Request::ip())->first();
            if ($duplicateIps) {
                DiscordAlert::to('exception')->message("", [
                    [
                        'title' => '[多帳阻擋]',
                        'description' => '帳號：<@' . $existingUser->discord_id . '> (' . $existingUser->discord_id . ')\n' .
                            '電子郵件：' . $existingUser->email .
                            '\nIP 紀錄：' . Request::ip(),
                        'color' => '#03cafc',
                        'footer' => [
                            'icon_url' => config('shdactyl.webhook.icon_url'),
                            'text' => 'SHDactyl',
                        ],
                        'timestamp' => Carbon::now(),
                        'author' => [
                            'name' => $existingUser->name,
                            'icon_url' => $existingUser->avatar,
                        ],
                    ]
                ]);
                throw new AltException();
            }
            $password = Str::random();
            $newUser = new User();
            $newUser->name = $user->name;
            $newUser->email = $user->email;
            $newUser->discord_id = $user->id;
            $newUser->password = bcrypt(request($password));
            $database_id = Str::random(16);
            $newUser->database_id = $database_id;
            if ($user->avatar != null) {
                $newUser->avatar = $user->avatar;
            } else {
                $newUser->avatar = env('NO_AVATAR_ALTERNATIVE');
            }

            $url = config('shdactyl.pterodactyl.url');
            $auth = config('shdactyl.pterodactyl.api_key');
            $res = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => $auth,
            ])->get($url . '/api/application/users?filter[username]=' . $user->id);
            $data = json_decode($res, true);

            if (count($data['data']) > 0) {
                $old = Storage::json('old_data.json');
                $newUser->panel_id = Arr::get($data, 'data.0.attributes.id');
                foreach ($old['top'] as $oldUser) {
                    if ($oldUser['id'] == Arr::get($data, 'data.0.attributes.username')) {
                        $newUser->coins = round(($oldUser['coins'] / 3), 2);
                        break;
                    }
                }
                $res = Http::withHeaders([
                    'Accept' => 'application/json',
                    'Authorization' => $auth,
                ])->patch($url . '/api/application/users/' . Arr::get($data, 'data.0.attributes.id'), [
                            'email' => $user->email,
                            'username' => $user->id,
                            'first_name' => $user->name,
                            'last_name' => $database_id,
                            'password' => $password,
                        ]);
            } else {
                $res = Http::withHeaders([
                    'Accept' => 'application/json',
                    'Authorization' => $auth,
                ])->post($url . '/api/application/users', [
                            'email' => $user->email,
                            'username' => $user->id,
                            'first_name' => $user->name,
                            'last_name' => $database_id,
                        ]);
                $newUser->panel_id = Arr::get(json_decode($res, true), 'attributes.id');
            }
            $newUser->save();
            auth()->login($newUser, true);
            $ipRecord = IpRecords::create([
                'user_id' => $newUser->id,
                'ip' => Request::ip(),
            ]);
            $ipRecords = IpRecords::where('user_id', $newUser->id)
                ->orderBy('id')
                ->take(3)
                ->get();
            $ips = [];
            foreach ($ipRecords as $ip) {
                $ips[] = $ip['ip'];
            }
            DiscordAlert::to('register')->message("", [
                [
                    'title' => '[用戶註冊]',
                    'description' => '帳號：<@' . $newUser->discord_id . '> (' . $newUser->discord_id . ')\n' .
                        '電子郵件：' . $newUser->email .
                        '\nIP 紀錄：' . implode(', ', $ips) . '\n面板 ID：' . $newUser->panel_id . '\n資料庫 ID：' . $newUser->database_id,
                    'color' => '#03cafc',
                    'footer' => [
                        'icon_url' => config('shdactyl.webhook.icon_url'),
                        'text' => 'SHDactyl',
                    ],
                    'timestamp' => Carbon::now(),
                    'author' => [
                        'name' => $newUser->name,
                        'icon_url' => $user->avatar,
                    ],
                ]
            ]);
            return redirect('/dashboard')->with('success', '新的密碼：' . $password);
        }

        return redirect('/dashboard');
    }
}
