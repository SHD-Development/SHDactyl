@extends('errors.minimal')

@section('title', __('Proxy Detected'))
@section('code', '403')
@section('message', __('Please disable your proxy to access this page.'))