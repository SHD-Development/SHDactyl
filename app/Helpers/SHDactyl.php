<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Http;

class SHDactyl
{
    public static function getUserTotalResource($userId)
    {
        $url = config('shdactyl.pterodactyl.url');
        $auth = config('shdactyl.pterodactyl.api_key');
        $res = Http::withHeaders([
            'Accept' => 'application/json',
            'Authorization' => $auth,
        ])->get($url . '/api/application/servers?filter[owner_id]=' . $userId);
        $data = json_decode($res, true);
        $totalRam = 0;
        foreach ($data['data'] as $server) {
            if ($server['attributes']['user'] == $userId) {
                $totalRam += $server['attributes']['limits']['memory'];
            }
        }
        $totalCPU = 0;
        foreach ($data['data'] as $server) {
            if ($server['attributes']['user'] == $userId) {
                $totalCPU += $server['attributes']['limits']['cpu'];
            }
        }
        $totalDisk = 0;
        foreach ($data['data'] as $server) {
            if ($server['attributes']['user'] == $userId) {
                $totalDisk += $server['attributes']['limits']['disk'];
            }
        }
        $totalDatabases = 0;
        foreach ($data['data'] as $server) {
            if ($server['attributes']['user'] == $userId) {
                $totalDatabases += $server['attributes']['feature_limits']['databases'];
            }
        }
        $totalAllocations = 0;
        foreach ($data['data'] as $server) {
            if ($server['attributes']['user'] == $userId) {
                $totalAllocations += $server['attributes']['feature_limits']['allocations'];
            }
        }
        $totalBackups = 0;
        foreach ($data['data'] as $server) {
            if ($server['attributes']['user'] == $userId) {
                $totalBackups += $server['attributes']['feature_limits']['backups'];
            }
        }
        $totalServers = count($data['data']);

        $total = [
            'ram' => $totalRam,
            'cpu' => $totalCPU,
            'disk' => $totalDisk,
            'databases' => $totalDatabases,
            'ports' => $totalAllocations,
            'backups' => $totalBackups,
            'servers' => $totalServers,
        ];
        return $total;
    }
}