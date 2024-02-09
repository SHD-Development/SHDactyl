<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Models\User;

class UserApiController extends Controller
{
    public function userList()
    {
        $users = QueryBuilder::for(User::query())
            ->defaultSort('id')
            ->allowedFilters('id', 'name', 'email', 'created_at', 'updated_at', 'panel_id', 'discord_id', 'coins', 'cpu', 'ram', 'disk', 'databases', 'backups', 'ports', 'database_id')
            ->allowedFields('id', 'name', 'email', 'created_at', 'updated_at', 'panel_id', 'discord_id', 'coins', 'cpu', 'ram', 'disk', 'databases', 'backups', 'ports', 'database_id', 'avatar')
            ->allowedSorts('id', 'name', 'email', 'created_at', 'updated_at', 'panel_id', 'discord_id', 'coins', 'cpu', 'ram', 'disk', 'databases', 'backups', 'ports', 'database_id')
            ->get();
        return response($users);
    }

    public function userDetails($id)
    {
        $user = User::find($id);
        return response($user);
    }
}
