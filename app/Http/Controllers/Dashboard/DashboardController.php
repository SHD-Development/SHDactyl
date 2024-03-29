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
use Illuminate\Support\Facades\Config;
use App\Helpers\SHDactyl;

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

        $total = SHDactyl::getUserTotalResource($user->panel_id);

        Alert::info('Beta', '目前處於 Open Beta 階段，若遇到任何問題請回報，感謝您。');
        return Inertia::render('Dashboard', [
            'data' => $data,
            'total' => $total,
        ]);
    }
    public function serverCreationPage()
    {
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $nodes = config('shdactyl.nodes');
        $eggs = Config::get('shdactyl.eggs');
        $fee = Config::get('shdactyl.fee');
        return Inertia::render('Server/Create', [
            'nodes' => $nodes,
            'eggs' => $eggs,
            'fee' => $fee,
        ]);
    }
    public function resourceStorePage()
    {
        $store = config('shdactyl.store');
        return Inertia::render('Resource/Store', [
            'store' => $store,
        ]);
    }
    public function buyResource(Request $request, $resource)
    {
        $user = Auth::user();
        if ($resource === 'cpu') {
            $data = $request->validate([
                'quantity' => 'required|numeric|integer|min:' . config('shdactyl.limits.store.cpu.min') . '|max:' . config('shdactyl.limits.store.cpu.max'),
            ]);
            $cpuPrice = config('shdactyl.store.cpu.price') * $data['quantity'];

            if (config('shdactyl.store.cpu.sale') === true) {
                $cpuPrice *= config('shdactyl.store.cpu.sale_percent');
            }
            if ($user->coins < $cpuPrice) {
                return redirect('/dashboard/resource/store')->with('error', '你沒有足夠的代幣來購買這個資源');
            }
            $user->decrement('coins', $cpuPrice);
            $user->increment('cpu', $data['quantity']);
            DiscordAlert::to('resource')->message("", [
                [
                    'title' => '[購買資源]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '購買資源：處理器\n購買數量：' . $data['quantity'] . '%\n花費代幣：$ ' . number_format($cpuPrice, 2) . ' SDC\n用戶現有：' . $user->cpu . '% 處理器',
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
            return redirect('/dashboard/resource/store')->with('success', '你花費了 $ ' . number_format($cpuPrice, 2) . ' SDC 成功購買了 ' . $data['quantity'] . '% 處理器，現在你有 ' . $user->cpu . '% 處理器');
        }
        if ($resource === 'ram') {
            $data = $request->validate([
                'quantity' => 'required|numeric|integer|min:' . config('shdactyl.limits.store.ram.min') . '|max:' . config('shdactyl.limits.store.ram.max'),
            ]);
            $ramPrice = config('shdactyl.store.ram.price') * $data['quantity'];

            if (config('shdactyl.store.ram.sale') === true) {
                $ramPrice *= config('shdactyl.store.ram.sale_percent');
            }
            if ($user->coins < $ramPrice) {
                return redirect('/dashboard/resource/store')->with('error', '你沒有足夠的代幣來購買這個資源');
            }
            $user->decrement('coins', $ramPrice);
            $user->increment('ram', $data['quantity']);
            DiscordAlert::to('resource')->message("", [
                [
                    'title' => '[購買資源]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '購買資源：記憶體\n購買數量：' . $data['quantity'] . ' MiB\n花費代幣：$ ' . number_format($ramPrice, 2) . ' SDC\n用戶現有：' . $user->ram . ' MiB 記憶體',
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
            return redirect('/dashboard/resource/store')->with('success', '你花費了 $ ' . number_format($ramPrice, 2) . ' SDC 成功購買了 ' . $data['quantity'] . ' MiB 記憶體，現在你有 ' . $user->ram . ' MiB 記憶體');
        }
        if ($resource === 'disk') {
            $data = $request->validate([
                'quantity' => 'required|numeric|integer|min:' . config('shdactyl.limits.store.disk.min') . '|max:' . config('shdactyl.limits.store.disk.max'),
            ]);
            $diskPrice = config('shdactyl.store.disk.price') * $data['quantity'];

            if (config('shdactyl.store.disk.sale') === true) {
                $diskPrice *= config('shdactyl.store.disk.sale_percent');
            }
            if ($user->coins < $diskPrice) {
                return redirect('/dashboard/resource/store')->with('error', '你沒有足夠的代幣來購買這個資源');
            }
            $user->decrement('coins', $diskPrice);
            $user->increment('disk', $data['quantity']);
            DiscordAlert::to('resource')->message("", [
                [
                    'title' => '[購買資源]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '購買資源：儲存空間\n購買數量：' . $data['quantity'] . ' MiB\n花費代幣：$ ' . number_format($diskPrice, 2) . ' SDC\n用戶現有：' . $user->disk . ' MiB 儲存空間',
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
            return redirect('/dashboard/resource/store')->with('success', '你花費了 $ ' . number_format($diskPrice, 2) . ' SDC 成功購買了 ' . $data['quantity'] . ' MiB 儲存空間，現在你有 ' . $user->disk . ' MiB 儲存空間');
        }
        if ($resource === 'databases') {
            $data = $request->validate([
                'quantity' => 'required|numeric|integer|min:' . config('shdactyl.limits.store.databases.min') . '|max:' . config('shdactyl.limits.store.databases.max'),
            ]);
            $databasesPrice = config('shdactyl.store.databases.price') * $data['quantity'];

            if (config('shdactyl.store.databases.sale') === true) {
                $databasesPrice *= config('shdactyl.store.databases.sale_percent');
            }
            if ($user->coins < $databasesPrice) {
                return redirect('/dashboard/resource/store')->with('error', '你沒有足夠的代幣來購買這個資源');
            }
            $user->decrement('coins', $databasesPrice);
            $user->increment('databases', $data['quantity']);
            DiscordAlert::to('resource')->message("", [
                [
                    'title' => '[購買資源]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '購買資源：資料庫\n購買數量：' . $data['quantity'] . ' 個\n花費代幣：$ ' . number_format($databasesPrice, 2) . ' SDC\n用戶現有：' . $user->databases . ' 個 資料庫',
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
            return redirect('/dashboard/resource/store')->with('success', '你花費了 $ ' . number_format($databasesPrice, 2) . ' SDC 成功購買了 ' . $data['quantity'] . ' 個 資料庫，現在你有 ' . $user->databases . ' 個 資料庫');
        }
        if ($resource === 'backups') {
            $data = $request->validate([
                'quantity' => 'required|numeric|integer|min:' . config('shdactyl.limits.store.backups.min') . '|max:' . config('shdactyl.limits.store.backups.max'),
            ]);
            $backupsPrice = config('shdactyl.store.backups.price') * $data['quantity'];

            if (config('shdactyl.store.backups.sale') === true) {
                $backupsPrice *= config('shdactyl.store.backups.sale_percent');
            }
            if ($user->coins < $backupsPrice) {
                return redirect('/dashboard/resource/store')->with('error', '你沒有足夠的代幣來購買這個資源');
            }
            $user->decrement('coins', $backupsPrice);
            $user->increment('backups', $data['quantity']);
            DiscordAlert::to('resource')->message("", [
                [
                    'title' => '[購買資源]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '購買資源：備份欄位\n購買數量：' . $data['quantity'] . ' 個\n花費代幣：$ ' . number_format($backupsPrice, 2) . ' SDC\n用戶現有：' . $user->backups . ' 個 備份欄位',
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
            return redirect('/dashboard/resource/store')->with('success', '你花費了 $ ' . number_format($backupsPrice, 2) . ' SDC 成功購買了 ' . $data['quantity'] . ' 個 備份欄位，現在你有 ' . $user->backups . ' 個 備份欄位');
        }
        if ($resource === 'ports') {
            $data = $request->validate([
                'quantity' => 'required|numeric|integer|min:' . config('shdactyl.limits.store.ports.min') . '|max:' . config('shdactyl.limits.store.ports.max'),
            ]);
            $portsPrice = config('shdactyl.store.ports.price') * $data['quantity'];

            if (config('shdactyl.store.ports.sale') === true) {
                $portsPrice *= config('shdactyl.store.ports.sale_percent');
            }
            if ($user->coins < $portsPrice) {
                return redirect('/dashboard/resource/store')->with('error', '你沒有足夠的代幣來購買這個資源');
            }
            $user->decrement('coins', $portsPrice);
            $user->increment('ports', $data['quantity']);
            DiscordAlert::to('resource')->message("", [
                [
                    'title' => '[購買資源]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '購買資源：額外端口\n購買數量：' . $data['quantity'] . ' 個\n花費代幣：$ ' . number_format($portsPrice, 2) . ' SDC\n用戶現有：' . $user->ports . ' 個 額外端口',
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
            return redirect('/dashboard/resource/store')->with('success', '你花費了 $ ' . number_format($portsPrice, 2) . ' SDC 成功購買了 ' . $data['quantity'] . ' 個 額外端口，現在你有 ' . $user->ports . ' 個 額外端口');
        }
        if ($resource === 'servers') {
            $data = $request->validate([
                'quantity' => 'required|numeric|integer|min:' . config('shdactyl.limits.store.servers.min') . '|max:' . config('shdactyl.limits.store.servers.max'),
            ]);
            $serversPrice = config('shdactyl.store.servers.price') * $data['quantity'];

            if (config('shdactyl.store.servers.sale') === true) {
                $serversPrice *= config('shdactyl.store.servers.sale_percent');
            }
            if ($user->coins < $serversPrice) {
                return redirect('/dashboard/resource/store')->with('error', '你沒有足夠的代幣來購買這個資源');
            }
            $user->decrement('coins', $serversPrice);
            $user->increment('servers', $data['quantity']);
            DiscordAlert::to('resource')->message("", [
                [
                    'title' => '[購買資源]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '購買資源：伺服器欄位\n購買數量：' . $data['quantity'] . ' 臺\n花費代幣：$ ' . number_format($serversPrice, 2) . ' SDC\n用戶現有：' . $user->servers . ' 臺 伺服器欄位',
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
            return redirect('/dashboard/resource/store')->with('success', '你花費了 $ ' . number_format($serversPrice, 2) . ' SDC 成功購買了 ' . $data['quantity'] . ' 臺 伺服器欄位，現在你有 ' . $user->servers . ' 臺 伺服器欄位');
        }
        return redirect('/dashboard/resource/store')->with('error', '發生錯誤');

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
            'name' => 'required|min:' . config('shdactyl.limits.create_server.name.min') . '|max:' . config('shdactyl.limits.create_server.name.max'),
            'node' => 'required|numeric|integer',
            'egg' => 'required|numeric|integer',
            'cpu' => 'required|numeric|integer|min:' . config('shdactyl.limits.create_server.cpu.min') . '|max:' . config('shdactyl.limits.create_server.cpu.max'),
            'ram' => 'required|numeric|integer|min:' . config('shdactyl.limits.create_server.ram.min') . '|max:' . config('shdactyl.limits.create_server.ram.max'),
            'disk' => 'required|numeric|integer|min:' . config('shdactyl.limits.create_server.disk.min') . '|max:' . config('shdactyl.limits.create_server.disk.max'),
            'databases' => 'required|numeric|integer|min:' . config('shdactyl.limits.create_server.databases.min') . '|max:' . config('shdactyl.limits.create_server.databases.max'),
            'backups' => 'required|numeric|integer|min:' . config('shdactyl.limits.create_server.backups.min') . '|max:' . config('shdactyl.limits.create_server.backups.max'),
            'ports' => 'required|numeric|integer|min:' . config('shdactyl.limits.create_server.ports.min') . '|max:' . config('shdactyl.limits.create_server.ports.max'),
        ]);
        $total = SHDactyl::getUserTotalResource($user->panel_id);
        if ($total['cpu'] + $data['cpu'] > $user->cpu) {
            return redirect('/dashboard/server/create')->with('error', '你沒有那麼多 CPU 資源來創建這個伺服器');
        }
        if ($total['ram'] + $data['ram'] > $user->ram) {
            return redirect('/dashboard/server/create')->with('error', '你沒有那麼多 RAM 資源來創建這個伺服器');
        }
        if ($total['disk'] + $data['disk'] > $user->disk) {
            return redirect('/dashboard/server/create')->with('error', '你沒有那麼多 Disk 資源來創建這個伺服器');
        }
        if ($total['databases'] + $data['databases'] > $user->databases) {
            return redirect('/dashboard/server/create')->with('error', '你沒有那麼多 Databases 資源來創建這個伺服器');
        }
        if ($total['backups'] + $data['backups'] > $user->backups) {
            return redirect('/dashboard/server/create')->with('error', '你沒有那麼多 Backups 資源來創建這個伺服器');
        }
        if ($total['ports'] + $data['ports'] > $user->ports) {
            return redirect('/dashboard/server/create')->with('error', '你沒有那麼多 Ports 資源來創建這個伺服器');
        }
        if ($total['servers'] + 1 > $user->servers) {
            return redirect('/dashboard/server/create')->with('error', '你沒有那麼多 Servers 資源來創建這個伺服器');
        }
        $price = config('shdactyl.fee.create') * config('shdactyl.fee.node.' . $data['node']) * ((config('shdactyl.fee.resource.cpu') * $data['cpu']) + (config('shdactyl.fee.resource.ram') * $data['ram']) + (config('shdactyl.fee.resource.disk') * $data['disk']) + (config('shdactyl.fee.resource.databases') * $data['databases']) + (config('shdactyl.fee.resource.backups') * $data['backups']) + (config('shdactyl.fee.resource.ports') * $data['ports']));
        if ($user->coins < $price) {
            return redirect('/dashboard/server/create')->with('error', '你沒有足夠的代幣來創建伺服器');
        }
        $user->decrement('coins', $price);
        $category = $this->getCategoryById($data['egg']);
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->post($url . '/api/application/servers', [
                    'name' => $data['name'],
                    'user' => $user->panel_id,
                    'egg' => $data['egg'],
                    'docker_image' => config('shdactyl.eggs.' . $category . '.' . $data['egg'] . '.docker_image'),
                    'startup' => config('shdactyl.eggs.' . $category . '.' . $data['egg'] . '.startup'),
                    'environment' => config('shdactyl.eggs.' . $category . '.' . $data['egg'] . '.environment'),
                    'limits' => [
                        'memory' => $data['ram'],
                        'swap' => config('shdactyl.build.swap'),
                        'disk' => $data['disk'],
                        'io' => config('shdactyl.build.io'),
                        'cpu' => $data['cpu'],
                    ],
                    'feature_limits' => [
                        'databases' => $data['databases'],
                        'allocations' => $data['ports'],
                        'backups' => $data['backups'],
                    ],
                    'deploy' => [
                        'locations' => [$data['node']],
                        'dedicated_ip' => false,
                        'port_range' => [],
                        'start_on_completion' => true,
                        'skip_scripts' => false,
                        'custom_container' => null,
                    ],
                ]);
        if ($res->created() === true) {

            $serverData = json_decode($res, true);
            DiscordAlert::to('server')->message("", [
                [
                    'title' => '[創建伺服器]',
                    'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                        '伺服器識別碼：' . $serverData['attributes']['identifier'] . '\n伺服器名稱：' . $serverData['attributes']['name'] . '\n節點識別碼：' . $serverData['attributes']['node'] . '\n處理器：' . $serverData['attributes']['limits']['cpu'] . '%\n記憶體：' . $serverData['attributes']['limits']['memory'] . ' MiB\n儲存空間：' . $serverData['attributes']['limits']['disk'] . ' MiB\n資料庫：' . $serverData['attributes']['feature_limits']['databases'] . ' 個\n額外端口：' . $serverData['attributes']['feature_limits']['allocations'] . ' 個\n備份欄位：' . $serverData['attributes']['feature_limits']['backups'] . ' 個',
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
            return redirect('/dashboard/server/create')->with('success', '成功花費 $ ' . number_format($price, 2) . ' SDC 創建伺服器！');
        } else {
            $user->increment('coins', $price);
            $user->save();
            return redirect('/dashboard/server/create')->with('error', '創建伺服器時發生錯誤 ' . $res);
        }
    }
    public function serverManagementPage()
    {
        $user = Auth::user();
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->get($url . '/api/application/servers?filter[owner_id]=' . $user->panel_id);
        $data = json_decode($res, true);
        $fee = Config::get('shdactyl.fee');
        return Inertia::render('Server/Manage', [
            'data' => $data['data'],
            'fee' => $fee,
        ]);
    }
    public function unsuspendServer(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|numeric|integer',
        ]);
        $user = Auth::user();
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->get($url . '/api/application/servers/' . $data['id']);
        $resData = json_decode($res, true);
        if ($resData['attributes']['suspended'] === false) {
            return redirect('/dashboard/server/manage')->with('error', '該伺服器不需要續約');
        }
        if ($resData['attributes']['user'] === $user->panel_id) {
            $price = config('shdactyl.fee.unsuspend') * config('shdactyl.fee.node.' . $resData['attributes']['node']);
            if ($user->coins < $price) {
                return redirect('/dashboard/server/manage')->with('error', '你沒有足夠的代幣來續約伺服器');
            }
            $user->decrement('coins', $price);
            $user->save();
            $res = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => $auth,
            ])->post($url . '/api/application/servers/' . $data['id'] . '/unsuspend');
            if ($res->successful() === true) {

                $serverData = $resData;
                DiscordAlert::to('server')->message("", [
                    [
                        'title' => '[續約伺服器]',
                        'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                            '伺服器識別碼：' . $serverData['attributes']['identifier'] . '\n伺服器名稱：' . $serverData['attributes']['name'] . '\n節點識別碼：' . $serverData['attributes']['node'],
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
                return redirect('/dashboard/server/manage')->with('success', '成功花費 $ ' . number_format($price, 2) . ' SDC 續約伺服器');
            } else {
                $user->increment('coins', $price);
                $user->save();
                return redirect('/dashboard/server/manage')->with('error', '續約伺服器時發生錯誤 ' . $res);
            }
        } else {
            return redirect('/dashboard/server/manage')->with('error', '你沒有權限進行此操作');
        }
    }
    public function deleteServer(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|numeric|integer',
        ]);
        $user = Auth::user();
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->get($url . '/api/application/servers/' . $data['id']);
        $resData = json_decode($res, true);
        if ($resData['attributes']['user'] === $user->panel_id) {
            $res = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => $auth,
            ])->delete($url . '/api/application/servers/' . $data['id']);
            if ($res->successful() === true) {
                $serverData = $resData;
                DiscordAlert::to('server')->message("", [
                    [
                        'title' => '[刪除伺服器]',
                        'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                            '伺服器識別碼：' . $serverData['attributes']['identifier'] . '\n伺服器名稱：' . $serverData['attributes']['name'] . '\n節點識別碼：' . $serverData['attributes']['node'],
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
                return redirect('/dashboard/server/manage')->with('success', '成功刪除伺服器');
            } else {
                return redirect('/dashboard/server/manage')->with('error', '刪除伺服器時發生錯誤 ' . $res);
            }
        } else {
            return redirect('/dashboard/server/manage')->with('error', '你沒有權限進行此操作');
        }
    }
    public function modifyServer(Request $request)
    {
        $user = Auth::user();
        $data = $request->validate([
            'id' => 'required|numeric|integer',
            'cpu' => 'required|numeric|integer|min:' . config('shdactyl.limits.modify_server.cpu.min') . '|max:' . config('shdactyl.limits.modify_server.cpu.max'),
            'ram' => 'required|numeric|integer|min:' . config('shdactyl.limits.modify_server.ram.min') . '|max:' . config('shdactyl.limits.modify_server.ram.max'),
            'disk' => 'required|numeric|integer|min:' . config('shdactyl.limits.modify_server.disk.min') . '|max:' . config('shdactyl.limits.modify_server.disk.max'),
            'databases' => 'required|numeric|integer|min:' . config('shdactyl.limits.modify_server.databases.min') . '|max:' . config('shdactyl.limits.modify_server.databases.max'),
            'backups' => 'required|numeric|integer|min:' . config('shdactyl.limits.modify_server.backups.min') . '|max:' . config('shdactyl.limits.modify_server.backups.max'),
            'ports' => 'required|numeric|integer|min:' . config('shdactyl.limits.modify_server.ports.min') . '|max:' . config('shdactyl.limits.modify_server.ports.max'),
        ]);
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->get($url . '/api/application/servers/' . $data['id']);
        $resData = json_decode($res, true);
        $total = SHDactyl::getUserTotalResource($user->panel_id);
        if ($total['cpu'] - $resData['attributes']['limits']['cpu'] + $data['cpu'] > $user->cpu) {
            return redirect('/dashboard/server/manage')->with('error', '你沒有那麼多 CPU 資源來編輯這個伺服器');
        }
        if ($total['ram'] - $resData['attributes']['limits']['memory'] + $data['ram'] > $user->ram) {
            return redirect('/dashboard/server/manage')->with('error', '你沒有那麼多 RAM 資源來編輯這個伺服器');
        }
        if ($total['disk'] - $resData['attributes']['limits']['disk'] + $data['disk'] > $user->disk) {
            return redirect('/dashboard/server/manage')->with('error', '你沒有那麼多 Disk 資源來編輯這個伺服器');
        }
        if ($total['databases'] - $resData['attributes']['feature_limits']['databases'] + $data['databases'] > $user->databases) {
            return redirect('/dashboard/server/manage')->with('error', '你沒有那麼多 Databases 資源來編輯這個伺服器');
        }
        if ($total['backups'] - $resData['attributes']['feature_limits']['backups'] + $data['backups'] > $user->backups) {
            return redirect('/dashboard/server/manage')->with('error', '你沒有那麼多 Backups 資源來編輯這個伺服器');
        }
        if ($total['ports'] - $resData['attributes']['feature_limits']['allocations'] + $data['ports'] > $user->ports) {
            return redirect('/dashboard/server/manage')->with('error', '你沒有那麼多 Ports 資源來編輯這個伺服器');
        }
        $new_price = config('shdactyl.fee.create') * config('shdactyl.fee.node.' . $resData['attributes']['node']) * ((config('shdactyl.fee.resource.cpu') * $data['cpu']) + (config('shdactyl.fee.resource.ram') * $data['ram']) + (config('shdactyl.fee.resource.disk') * $data['disk']) + (config('shdactyl.fee.resource.databases') * $data['databases']) + (config('shdactyl.fee.resource.backups') * $data['backups']) + (config('shdactyl.fee.resource.ports') * $data['ports']));
        $old_price = config('shdactyl.fee.create') * config('shdactyl.fee.node.' . $resData['attributes']['node']) * ((config('shdactyl.fee.resource.cpu') * $resData['attributes']['limits']['cpu']) + (config('shdactyl.fee.resource.ram') * $resData['attributes']['limits']['memory']) + (config('shdactyl.fee.resource.disk') * $resData['attributes']['limits']['disk']) + (config('shdactyl.fee.resource.databases') * $resData['attributes']['feature_limits']['databases']) + (config('shdactyl.fee.resource.backups') * $resData['attributes']['feature_limits']['backups']) + (config('shdactyl.fee.resource.ports') * $resData['attributes']['feature_limits']['allocations']));
        if ($new_price < $old_price) {
            $price = 0;
        } else {
            $price = $new_price - $old_price;
        }
        if ($user->coins < $price) {
            return redirect('/dashboard/server/manage')->with('error', '你沒有足夠的代幣來編輯伺服器');
        }
        $user->decrement('coins', $price);
        $user->save();
        $response = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->get($url . '/api/application/servers/' . $data['id']);
        $responseData = json_decode($response, true);
        if ($responseData['attributes']['user'] === $user->panel_id) {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'Authorization' => $auth,
            ])->patch($url . '/api/application/servers/' . $data['id'] . '/build', [
                        'allocation' => $resData['attributes']['allocation'],
                        'memory' => $data['ram'],
                        'swap' => config('shdactyl.build.swap'),
                        'io' => config('shdactyl.build.io'),
                        'cpu' => $data['cpu'],
                        'disk' => $data['disk'],
                        'feature_limits' => [
                            'databases' => $data['databases'],
                            'allocations' => $data['ports'],
                            'backups' => $data['backups'],
                        ],
                    ]);
            if ($response->successful() === true) {
                $serverData = $responseData;
                DiscordAlert::to('server')->message("", [
                    [
                        'title' => '[編輯伺服器]',
                        'description' => '帳號：<@' . $user->discord_id . '> (' . $user->discord_id . ')\n' .
                            '伺服器識別碼：' . $serverData['attributes']['identifier'] . '\n伺服器名稱：' . $serverData['attributes']['name'] . '\n節點識別碼：' . $serverData['attributes']['node'] . '\n花費：$ ' . number_format($price, 2) . ' SDC\n處理器：' . $serverData['attributes']['limits']['cpu'] . '%\n記憶體：' . $serverData['attributes']['limits']['memory'] . ' MiB\n儲存空間：' . $serverData['attributes']['limits']['disk'] . ' MiB\n資料庫：' . $serverData['attributes']['feature_limits']['databases'] . ' 個\n額外端口：' . $serverData['attributes']['feature_limits']['allocations'] . ' 個\n備份欄位：' . $serverData['attributes']['feature_limits']['backups'] . ' 個',
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
                return redirect('/dashboard/server/manage')->with('success', '成功花費 $ ' . number_format($price, 2) . ' SDC 編輯伺服器');
            } else {
                $user->increment('coins', $price);
                $user->save();
                return redirect('/dashboard/server/manage')->with('error', '編輯伺服器時發生錯誤 ' . $response);
            }
        } else {
            return redirect('/dashboard/server/manage')->with('error', '你沒有權限進行此操作');
        }
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

                    $user->increment('coins', $realCoupon->coins);
                    $user->save();
                    $realCoupon->used_times++;
                    $realCoupon->save();
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
    public function getCategoryById($id)
    {

        foreach (config('shdactyl.eggs') as $key => $value) {
            foreach ($value as $itemId => $item) {
                if ($itemId == $id) {
                    return $key;
                }
            }
        }
        return null;
    }

}
