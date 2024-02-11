@extends('errors.minimal')

@section('title', __('Multiple Accounts Detected'))
@section('code', '403')
@section('message', __('Creating multiple accounts is prohibited by our terms of service.'))