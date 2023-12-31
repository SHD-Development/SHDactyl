<?php

return [
    'pterodactyl' => [
        'url' => env('PTERODACTYL_URL'),
        'api_key' => 'Bearer ' . env('PTERODACTYL_API_KEY'),
    ],
    'resources' => [
        'cpu' => 100,
        'ram' => 2048,
        'disk' => 4096,
        'databases' => 0,
        'backups' => 0,
    ],
    'channels' => [
        'logs' => [
            'login' => '1185937923183476917',
            'register' => ''
        ],
    ],
];
