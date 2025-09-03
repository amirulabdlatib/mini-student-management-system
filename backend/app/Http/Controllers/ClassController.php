<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClassResource;
use App\Models\Classes;
use Illuminate\Http\Request;

class ClassController extends Controller
{
    public function index()
    {
        return ClassResource::collection(Classes::all());
    }
}
