<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use App\Exceptions\ProxyException;
use App\Exceptions\AltException;
use Illuminate\Http\Request;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (ProxyException $e, Request $request) {
            return response()->view('errors.proxy', [], 403);
        });
        $this->renderable(function (AltException $e, Request $request) {
            return response()->view('errors.alt', [], 403);
        });
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
