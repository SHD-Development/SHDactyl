<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;
use Spatie\QueryBuilder\AllowedFilter;
use App\Models\User;
use App\Models\IpRecords;
use App\Models\ActionLog;
use App\Models\Bypass;

class UserApiController extends Controller
{
    public function userList()
    {
        $users = QueryBuilder::for(User::query())
            ->defaultSort('id')
            ->allowedFilters('id', 'name', 'email', 'created_at', 'updated_at', 'panel_id', 'discord_id', 'coins', 'cpu', 'ram', 'disk', 'databases', 'backups', 'ports', 'servers', 'database_id')
            ->allowedFields('id', 'name', 'email', 'created_at', 'updated_at', 'panel_id', 'discord_id', 'coins', 'cpu', 'ram', 'disk', 'databases', 'backups', 'ports', 'servers', 'database_id', 'avatar')
            ->allowedSorts('id', 'name', 'email', 'created_at', 'updated_at', 'panel_id', 'discord_id', 'coins', 'cpu', 'ram', 'disk', 'databases', 'backups', 'ports', 'servers', 'database_id')
            ->get();
        return response($users);
    }

    public function userDetails($id)
    {
        $user = User::find($id);
        return response($user);
    }
    public function modifyUser(Request $request, $id)
    {
        $request->validate([
            'name' => 'min:3|max:50',
            'email' => 'email',
            'password' => 'min:8',
            'panel_id' => 'numeric|integer',
            'discord_id' => 'numeric|integer',
            'coins' => 'numeric|integer',
            'cpu' => 'numeric|integer',
            'ram' => 'numeric|integer',
            'disk' => 'numeric|integer',
            'databases' => 'numeric|integer',
            'backups' => 'numeric|integer',
            'ports' => 'numeric|integer',
            'servers' => 'numeric|integer',
            'bypass' => 'boolean',
        ]);
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        if ($request->name) {
            $user->name = $request->name;
        }
        if ($request->email) {
            $user->email = $request->email;
        }
        if ($request->password) {
            $user->password = bcrypt($request->password);
        }
        if ($request->panel_id) {
            $user->panel_id = $request->panel_id;
        }
        if ($request->discord_id) {
            $user->discord_id = $request->discord_id;
        }
        if ($request->coins) {
            $user->coins = $request->coins;
        }
        if ($request->cpu) {
            $user->cpu = $request->cpu;
        }
        if ($request->ram) {
            $user->ram = $request->ram;
        }
        if ($request->disk) {
            $user->disk = $request->disk;
        }
        if ($request->databases) {
            $user->databases = $request->databases;
        }
        if ($request->backups) {
            $user->backups = $request->backups;
        }
        if ($request->ports) {
            $user->ports = $request->ports;
        }
        if ($request->servers) {
            $user->servers = $request->servers;
        }
        if ($request->bypass) {
            $user->bypass = $request->bypass;
        }
        $user->save();

        return response($user);
    }
    public function deleteUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        ActionLog::where('user_id', $id)->delete();
        IpRecords::where('user_id', $id)->delete();
        $user->delete();
        return response()->json(['message' => 'User deleted.']);
    }
    public function clearIpRecords($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }
        IpRecords::where('user_id', $id)->delete();
        return response()->json(['message' => 'IP records cleared.']);
    }
    public function toggleBypass($id)
    {
        $bypass = Bypass::where('discord_id', $id)->first();
        if (!$bypass) {
            $bypass = new Bypass();
            $bypass->discord_id = $id;
            $bypass->bypass = true;
            $bypass->save();
            return response($bypass);
        }
        if ($bypass->bypass === true) {
            $bypass->bypass = false;
        } else {
            $bypass->bypass = true;
        }
        $bypass->save();
        return response($bypass);
    }
}
