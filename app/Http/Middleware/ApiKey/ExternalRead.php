<?php

namespace App\Http\Middleware\ApiKey;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\ApiKey;

class ExternalRead
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKeyValue = $request->header('Authorization');

        if (!$apiKeyValue) {
            return response()->json(['error' => 'API Key missing.'], 401);
        }

        $apiKey = ApiKey::where('api_key', $apiKeyValue)->first();

        if (!$apiKey || ($apiKey->expires_at && now()->gte($apiKey->expires_at))) {
            return response()->json(['error' => 'Invalid API Key or expired.'], 401);
        }

        $requiredPermissions = ['ex-read'];
        $userPermissions = json_decode($apiKey->permissions, true);

        if (count(array_intersect($requiredPermissions, $userPermissions)) !== count($requiredPermissions)) {
            return response()->json(['error' => 'Insufficient permissions.'], 403);
        }
        return $next($request);
    }
}
