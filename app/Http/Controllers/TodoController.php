<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        return Inertia::render('Today');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
        ]);

        $request->user()->todos()->create($request->only('title'));

        return redirect()->back();
    }

    public function archiveIndex()
    {
        return Inertia::render('Archive');
    }
}
