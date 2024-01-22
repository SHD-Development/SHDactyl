@extends('oauth::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>Module: {!! config('oauth.name') !!}</p>
@endsection
