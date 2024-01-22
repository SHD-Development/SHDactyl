<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Nwidart\Modules\Facades\Module;

class AdminController extends Controller
{
    public function modulesPage()
    {
        $oauth = Module::isEnabled('OAuth');
        $pusher = false;
        return Inertia::render('Admin/Modules', [
            'oauth' => $oauth,
            'pusher' => $pusher,
        ]);
    }
}
