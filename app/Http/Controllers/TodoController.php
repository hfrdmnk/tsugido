<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Today', [
            'todos' => $request->user()->todos()->whereDate('due_date', Carbon::today())->orderBy('order')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $today = Carbon::today();

        $validated = $request->validate([
            'title' => ['required', 'min:3', 'max:255'],
        ]);

        $lastOrder = $request->user()->todos()->whereDate('created_at', $today)->max('order');

        $newOrder = $lastOrder ? $lastOrder + 1 : 1;

        $request->user()->todos()->create([
            'title' => $validated['title'],
            'due_date' => $today,
            'order' => $newOrder,
        ]);

        return redirect()->back();
    }

    public function archiveIndex()
    {
        return Inertia::render('Archive');
    }
}
