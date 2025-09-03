<?php

use App\Http\Controllers\StudentController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return UserResource::make($request->user());
})->middleware('auth:sanctum');


Route::apiResource('students',StudentController::class)->middleware('auth:sanctum');