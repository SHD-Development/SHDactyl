<?php

namespace App\Http\Middleware\Api\Application;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ApiKey;
use Carbon\Carbon;

class ApiAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = ApiKey::where('key', $request->bearerToken())->first();
        if (!$apiKey) {
            return response(['message' => 'Invalid API key'], 401);
        }

        if (Carbon::now() > $apiKey->expiration_date) {
            return response(['message' => 'API key expired'], 401);
        }
        return $next($request);
    }
}
