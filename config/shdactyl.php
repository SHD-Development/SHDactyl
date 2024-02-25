<?php

return [
    'pterodactyl' => [
        'url' => env('PTERODACTYL_URL'),
        'api_key' => 'Bearer ' . env('PTERODACTYL_API_KEY'),
    ],
    'webhook' => [
        'icon_url' => 'https://cdn.discordapp.com/attachments/1120284155578691676/1185889959710838875/shd-cloud-logo.png'
    ],
    'resources' => [
        'coins' => 1330.00,
        'cpu' => 100,
        'ram' => 2048,
        'disk' => 4096,
        'databases' => 0,
        'backups' => 0,
        'ports' => 0,
        'servers' => 2,
    ],
    'announcement' => 'hi',
    'nodes' => [
        'Node-TW01' => 1,
        'Node-TW02' => 3,
        'Node-TW03' => 5
    ],
    'log_viewer' => [
        'can_view' => [
            'owenliu0924useful@gmail.com',
        ]
    ],
    'fee' => [
        'create' => 10,
        'unsuspend' => 10,
        'node' => [
            1 => 1,
            3 => 1,
            5 => 1,
        ],
        'resource' => [
            'cpu' => 0.5,
            'ram' => 0.5,
            'disk' => 0.5,
            'databases' => 0.5,
            'backups' => 0.5,
            'ports' => 0.5,
        ]

    ],
    'build' => [
        'swap' => 0,
        'io' => 500,
    ],
    'limits' => [
        'create_server' => [
            'name' => [
                'min' => 1,
                'max' => 30,
            ],
            'cpu' => [
                'min' => 5,
                'max' => 400,
            ],
            'ram' => [
                'min' => 32,
                'max' => 8192,
            ],
            'disk' => [
                'min' => 64,
                'max' => 20480,
            ],
            'databases' => [
                'min' => 0,
                'max' => 20,
            ],
            'backups' => [
                'min' => 0,
                'max' => 30,
            ],
            'ports' => [
                'min' => 0,
                'max' => 15,
            ],

        ],
        'modify_server' => [
            'name' => [
                'min' => 1,
                'max' => 30,
            ],
            'cpu' => [
                'min' => 5,
                'max' => 400,
            ],
            'ram' => [
                'min' => 32,
                'max' => 8192,
            ],
            'disk' => [
                'min' => 64,
                'max' => 20480,
            ],
            'databases' => [
                'min' => 0,
                'max' => 20,
            ],
            'backups' => [
                'min' => 0,
                'max' => 30,
            ],
            'ports' => [
                'min' => 0,
                'max' => 15,
            ],
        ],
        'store' => [
            'cpu' => [
                'min' => 1,
                'max' => 100,
            ],
            'ram' => [
                'min' => 1,
                'max' => 4096,
            ],
            'disk' => [
                'min' => 1,
                'max' => 8192,
            ],
            'databases' => [
                'min' => 1,
                'max' => 10,
            ],
            'backups' => [
                'min' => 1,
                'max' => 20,
            ],
            'ports' => [
                'min' => 1,
                'max' => 3,
            ],
            'servers' => [
                'min' => 1,
                'max' => 3,
            ],
        ],
    ],


    'store' => [
        'cpu' => [
            'price' => 10.00,
            'sale' => false,
            'sale_percent' => 0.85,
        ],
        'ram' => [
            'price' => 7.50,
            'sale' => false,
            'sale_percent' => 0.95,
        ],
        'disk' => [
            'price' => 5.00,
            'sale' => true,
            'sale_percent' => 0.95,
        ],
        'databases' => [
            'price' => 250.00,
            'sale' => false,
            'sale_percent' => 0.95,
        ],
        'backups' => [
            'price' => 100.00,
            'sale' => true,
            'sale_percent' => 0.80,
        ],
        'ports' => [
            'price' => 500.00,
            'sale' => false,
            'sale_percent' => 0.95,
        ],
        'servers' => [
            'price' => 750.00,
            'sale' => false,
            'sale_percent' => 0.95,
        ],
    ],
    'eggs' => [
        'Minecraft JAVA' =>
            [
                1 =>
                    [
                        'name' => 'Vanilla 原版',
                        'docker_image' => 'ghcr.io/pterodactyl/yolks:java_17',
                        'startup' => 'java -Xms128M -XX:MaxRAMPercentage=95.0 -jar {{SERVER_JARFILE}}',
                        'environment' =>
                            [
                                'SERVER_JARFILE' => 'server.jar',
                                'VANILLA_VERSION' => 'latest',
                            ],
                    ],
                2 =>
                    [
                        'name' => 'Paper 插件',
                        'docker_image' => 'ghcr.io/pterodactyl/yolks:java_17',
                        'startup' => 'java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true -jar
        {{SERVER_JARFILE}}',
                        'environment' =>
                            [
                                'SERVER_JARFILE' => 'server.jar',
                                'BUILD_NUMBER' => 'latest',
                            ],
                    ],
                4 =>
                    [
                        'name' => 'Bungeecord Proxy',
                        'docker_image' => 'ghcr.io/pterodactyl/yolks:java_17',
                        'startup' => 'java -Xms128M -XX:MaxRAMPercentage=95.0 -jar {{SERVER_JARFILE}}',
                        'environment' =>
                            [
                                'BUNGEE_VERSION' => 'latest',
                                'SERVER_JARFILE' => 'bungeecord.jar',
                            ],
                    ],
                5 =>
                    [
                        'name' => 'Forge 模組',
                        'docker_image' => 'ghcr.io/pterodactyl/yolks:java_17',
                        'startup' => 'java -Xms128M -XX:MaxRAMPercentage=95.0 -Dterminal.jline=false -Dterminal.ansi=true $( [[ ! -f
        unix_args.txt ]] && printf %s "-jar {{SERVER_JARFILE}}" || printf %s "@unix_args.txt" )',
                        'environment' =>
                            [
                                'SERVER_JARFILE' => 'server.jar',
                                'MC_VERSION' => 'latest',
                                'BUILD_TYPE' => 'recommended',
                            ],
                    ],
                15 =>
                    [
                        'name' => 'Purpur 插件',
                        'docker_image' => 'ghcr.io/pterodactyl/yolks:java_8',
                        'startup' => 'java --add-modules=jdk.incubator.vector -Xms128M -Xmx{{SERVER_MEMORY}}M -Dterminal.jline=false
        -Dterminal.ansi=true -jar {{SERVER_JARFILE}}',
                        'environment' =>
                            [
                                'MINECRAFT_VERSION' => 'latest',
                                'SERVER_JARFILE' => 'server.jar',
                                'BUILD_NUMBER' => 'latest',
                            ],
                    ],
            ],
        'Minecraft Bedrock' =>
            [
                16 =>
                    [
                        'name' => 'Vanilla 原版',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:debian',
                        'startup' => './bedrock_server',
                        'environment' =>
                            [
                                'BEDROCK_VERSION' => 'latest',
                                'LD_LIBRARY_PATH' => '.',
                                'SERVERNAME' => 'Bedrock Dedicated Server',
                                'GAMEMODE' => 'survival',
                                'DIFFICULTY' => 'easy',
                                'CHEATS' => 'false',
                            ],
                    ],
                17 =>
                    [
                        'name' => 'PocketMine MP',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:debian',
                        'startup' => './bin/php7/bin/php ./PocketMine-MP.phar --no-wizard --disable-ansi',
                        'environment' =>
                            [
                                'VERSION' => 'PM5',
                            ],
                    ],
                18 =>
                    [
                        'name' => 'LiteLoader BDS（無法確保可用性）',
                        'docker_image' => 'ccr.ccs.tencentyun.com/pterodactyl/yolks-parkervcp:wine_latest',
                        'startup' => 'if [ ! -f "bedrock_server_mod.exe" ]; then wine PeEditor.exe; fi; cat <&0 | wine bedrock_server_mod.exe 2>
          &1 | tee /dev/tty >/dev/null;',
                        'environment' =>
                            [
                                'BDS_VERSION' => '1.19.81.01',
                                'WINEDEBUG' => '-all',
                                'SERVERNAME' => 'Bedrock Dedicated Server',
                                'GAMEMODE' => 'survival',
                                'DIFFICULTY' => 'easy',
                                'LITELOADER_VERSION' => '2.13.1',
                                'CHEATS' => 'false',
                            ],
                    ],
            ],
        '程式語言' =>
            [
                19 =>
                    [
                        'name' => 'Node.js',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:nodejs_19',
                        'startup' => 'if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]];
          then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm
          uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi;
          /usr/local/bin/node /home/container/{{JS_FILE}}',
                        'environment' =>
                            [
                                'USER_UPLOAD' => '0',
                                'AUTO_UPDATE' => '0',
                                'JS_FILE' => 'index.js',
                            ],
                    ],
                20 =>
                    [
                        'name' => 'nodemon',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:nodejs_16',
                        'startup' => 'npm install nodemon; if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z
          ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then
          /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm
          install --production; fi; /home/container/node_modules/nodemon/bin/nodemon.js /home/container/{{BOT_JS_FILE}}',
                        'environment' =>
                            [
                                'USER_UPLOAD' => '0',
                                'AUTO_UPDATE' => '0',
                                'BOT_JS_FILE' => 'index.js',
                            ],
                    ],
                21 =>
                    [
                        'name' => 'Python',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:python_3.11',
                        'startup' => 'if [[ -d .git ]] && [[ "{{AUTO_UPDATE}}" == "1" ]]; then git pull; fi; if [[ ! -z "{{PY_PACKAGES}}" ]];
          then pip install -U --prefix .local {{PY_PACKAGES}}; fi; if [[ -f /home/container/${REQUIREMENTS_FILE} ]]; then pip
          install -U --prefix .local -r ${REQUIREMENTS_FILE}; fi; /usr/local/bin/python /home/container/{{PY_FILE}}',
                        'environment' =>
                            [
                                'USER_UPLOAD' => '0',
                                'AUTO_UPDATE' => '0',
                                'PY_FILE' => 'app.py',
                                'REQUIREMENTS_FILE' => 'requirements.txt',
                            ],
                    ],
                22 =>
                    [
                        'name' => 'Java',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:java_8',
                        'startup' => 'java -Dterminal.jline=false -Dterminal.ansi=true -jar {{JARFILE}}',
                        'environment' =>
                            [
                                'JARFILE' => 'sneakyhub.jar',
                            ],
                    ],
                23 =>
                    [
                        'name' => 'Golang',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:debian',
                        'startup' => './${EXECUTABLE}',
                        'environment' =>
                            [
                                'GO_PACKAGE' => '',
                                'EXECUTABLE' => '',
                            ],
                    ],
                24 =>
                    [
                        'name' => 'Deno',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:debian',
                        'startup' => './deno run {{JS_FILE}}',
                        'environment' =>
                            [
                                'USER_UPLOAD' => '0',
                                'JS_FILE' => 'bot.js',
                            ],
                    ],
            ],
        '資料庫' =>
            [
                25 =>
                    [
                        'name' => 'MongoDB 6 (NoSQL)',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:mongodb_6',
                        'startup' => 'mongod --fork --dbpath /home/container/mongodb/ --port ${SERVER_PORT} --bind_ip 0.0.0.0 --logpath
          /home/container/logs/mongo.log -f /home/container/mongod.conf; until nc -z -v -w5 127.0.0.1 ${SERVER_PORT}; do echo
          \'Waiting for mongodb connection...\'; sleep 5; done; mongosh --username ${MONGO_USER} --password ${MONGO_USER_PASS}
          --host 127.0.0.1:${SERVER_PORT} && mongosh --eval "db.getSiblingDB(\'admin\').shutdownServer()"
          127.0.0.1:${SERVER_PORT}',
                        'environment' =>
                            [
                                'MONGO_USER' => 'admin',
                                'MONGO_USER_PASS' => '',
                            ],
                    ],
                26 =>
                    [
                        'name' => 'MariaDB (MySQL)',
                        'docker_image' => 'quay.io/parkervcp/pterodactyl-images:db_mariadb',
                        'startup' => '{ /usr/sbin/mysqld & } && sleep 5 && mysql -u root',
                        'environment' =>
                            [
                            ],
                    ],
                27 =>
                    [
                        'name' => 'PostgreSQL',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:postgres_14',
                        'startup' => 'postgres -D /home/container/postgres_db/',
                        'environment' =>
                            [
                                'PGUSER' => 'pterodactyl',
                                'PGPASSWORD' => 'Pl3453Ch4n63M3!',
                            ],
                    ],
                28 =>
                    [
                        'name' => 'Redis 5',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:redis_5',
                        'startup' => 'redis-server --bind 0.0.0.0 --port {{SERVER_PORT}} --requirepass {{SERVER_PASSWORD}} --maxmemory
          {{SERVER_MEMORY}}mb --daemonize yes && redis-cli -p {{SERVER_PORT}} -a {{SERVER_PASSWORD}} && redis-cli -p
          {{SERVER_PORT}} -a {{SERVER_PASSWORD}} shutdown save',
                        'environment' =>
                            [
                                'SERVER_PASSWORD' => 'P@55w0rd',
                            ],
                    ],
                29 =>
                    [
                        'name' => 'Redis 6',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:redis_6',
                        'startup' => '/usr/local/bin/redis-server /home/container/redis.conf --save 60 1 --dir /home/container/ --bind 0.0.0.0
          --port {{SERVER_PORT}} --requirepass {{SERVER_PASSWORD}} --maxmemory {{SERVER_MEMORY}}mb --daemonize yes && redis-cli
          -p {{SERVER_PORT}}; redis-cli -p {{SERVER_PORT}} -a {{SERVER_PASSWORD}} shutdown save',
                        'environment' =>
                            [
                                'SERVER_PASSWORD' => 'P@55w0rd',
                            ],
                    ],
                30 =>
                    [
                        'name' => 'Redis 7',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:redis_7',
                        'startup' => '/usr/local/bin/redis-server /home/container/redis.conf --save 60 1 --dir /home/container/ --bind 0.0.0.0
          --port {{SERVER_PORT}} --requirepass {{SERVER_PASSWORD}} --maxmemory {{SERVER_MEMORY}}mb --daemonize yes && redis-cli
          -p {{SERVER_PORT}}; redis-cli -p {{SERVER_PORT}} -a {{SERVER_PASSWORD}} shutdown save',
                        'environment' =>
                            [
                                'SERVER_PASSWORD' => 'P@55w0rd',
                            ],
                    ],
            ],
        '其他' =>
            [
                14 =>
                    [
                        'name' => 'Rust 遊戲',
                        'docker_image' => 'ghcr.io/pterodactyl/games:rust',
                        'startup' => './RustDedicated -batchmode +server.port {{SERVER_PORT}} +server.queryport {{QUERY_PORT}}
          +server.identity "rust" +rcon.port {{RCON_PORT}} +rcon.web true +server.hostname \\"{{HOSTNAME}}\\" +server.level
          \\"{{LEVEL}}\\" +server.description \\"{{DESCRIPTION}}\\" +server.url \\"{{SERVER_URL}}\\" +server.headerimage
          \\"{{SERVER_IMG}}\\" +server.logoimage \\"{{SERVER_LOGO}}\\" +server.maxplayers {{MAX_PLAYERS}} +rcon.password
          \\"{{RCON_PASS}}\\" +server.saveinterval {{SAVEINTERVAL}} +app.port {{APP_PORT}} $( [ -z ${MAP_URL} ] && printf %s
          "+server.worldsize \\"{{WORLD_SIZE}}\\" +server.seed \\"{{WORLD_SEED}}\\"" || printf %s "+server.levelurl {{MAP_URL}}"
          ) {{ADDITIONAL_ARGS}}',
                        'environment' =>
                            [
                                'HOSTNAME' => 'A Rust Server',
                                'LEVEL' => 'Procedural Map',
                                'DESCRIPTION' => 'Powered by SHD Cloud',
                                'WORLD_SIZE' => '3000',
                                'MAX_PLAYERS' => '40',
                                'RCON_PORT' => '28016',
                                'RCON_PASS' => '',
                                'SAVEINTERVAL' => '60',
                                'APP_PORT' => '28082',
                                'FRAMEWORK' => 'vanilla',
                                'QUERY_PORT' => '27017',
                            ],
                    ],
                32 =>
                    [
                        'name' => 'Nginx',
                        'docker_image' => ' ghcr.io/sigma-production/nginx-ptero:8.0',
                        'startup' => '{{STARTUP_CMD}}; if [[ ! -z ${COMPOSER_MODULES} ]]; then composer require ${COMPOSER_MODULES}
          --working-dir=/home/container/webroot; fi;',
                        'environment' =>
                            [
                                'WORDPRESS' => '0',
                                'AUTO_UPDATE' => '0',
                                'USER_UPLOAD' => '0',
                            ],
                    ],
                33 =>
                    [
                        'name' => 'Code Server (VS Code)',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:nodejs_18',
                        'startup' => 'sh .local/lib/code-server-{{VERSION}}/bin/code-server',
                        'environment' =>
                            [
                                'PASSWORD' => 'changeme',
                            ],
                    ],
                34 =>
                    [
                        'name' => 'JMusicBot 音樂機器人',
                        'docker_image' => 'ghcr.io/pterodactyl/yolks:java_16',
                        'startup' => 'java -Dnogui=true -jar JMusicBot.jar',
                        'environment' =>
                            [
                                'BOT_TOKEN' => '',
                                'BOT_OWNER' => 'Change This To Your Discord User ID',
                                'BOT_ALT_PREFIX' => 'NONE',
                                'BOT_STATUS' => 'ONLINE',
                                'BOT_SONG_STATUS' => 'false',
                                'BOT_NPIMAGES' => 'false',
                                'BOT_STAY_IN_CHANNEL' => 'false',
                                'BOT_ALONE_TIME' => '0',
                                'BOT_MAXTIME' => '0',
                            ],
                    ],
                35 =>
                    [
                        'name' => 'Lavalink',
                        'docker_image' => 'ghcr.io/parkervcp/yolks:java_17',
                        'startup' => 'java -jar Lavalink.jar',
                        'environment' =>
                            [
                                'VERSION' => 'latest',
                                'GITHUB_PACKAGE' => 'lavalink-devs/Lavalink',
                                'MATCH' => 'Lavalink.jar',
                            ],
                    ],
            ],
    ]
];
