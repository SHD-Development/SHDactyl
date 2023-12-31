<?php

return [
    /*
     * The webhook URLs that we'll use to send a message to Discord.
     */
    'webhook_urls' => [
        'login' => env('WEBHOOK_LOGIN'),
        'register' => env('WEBHOOK_REGISTER'),
    ],

    /*
     * This job will send the message to Discord. You can extend this
     * job to set timeouts, retries, etc...
     */
    'job' => Spatie\DiscordAlerts\Jobs\SendToDiscordChannelJob::class,
];
