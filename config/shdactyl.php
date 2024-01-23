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
    'nodes' => [
        'Node-TW01' => 1,
        'Node-TW02' => 3,
        'Node-TW03' => 5
    ],
    'eggs' => [
        'id' => [
            'name' => 'egg name',
            'docker_image' => 'quay.io/xxxxxx',
            'startup' => 'java',
            'environment' => [
                'ENV_VERSION' => 'latest',
                'SERVER_FILE' => 'server.jar'
            ]
        ],
        'id2' => [
            'name' => 'egg2 name',
            'docker_image' => 'quay.io/xxxxxx',
            'startup' => 'java2',
            'environment' => [
                'ENV2_VERSION' => 'latest',
                'SERVER2_FILE' => 'server.jar'
            ]
        ]
    ]
];
