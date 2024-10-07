<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
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

    public function update(Request $request, $id)
    {
        Log::info('Updating todo', ['id' => $id]);
        Log::info($request->all());

        $todo = $request->user()->todos()->findOrFail($id);

        $validated = $request->validate([
            'title' => ['sometimes', 'required', 'min:3', 'max:255'],
            'completed' => ['sometimes', 'required', 'boolean'],
            'due_date' => ['sometimes', 'required', 'date'],
            'order' => ['sometimes', 'required', 'integer'],
        ]);

        if (isset($validated['completed'])) {
            if ($validated['completed']) {
                // Set order to be the last item of the day
                $lastOrder = $request->user()->todos()
                    ->whereDate('due_date', $todo->due_date)
                    ->max('order');
                $validated['order'] = $lastOrder + 1;
            } else {
                // Set order to be the last non-completed item of the day
                $lastNonCompletedOrder = $request->user()->todos()
                    ->whereDate('due_date', $todo->due_date)
                    ->where('completed', false)
                    ->max('order');
                $validated['order'] = $lastNonCompletedOrder ? $lastNonCompletedOrder + 1 : 1;
            }
        }

        $todo->update($validated);

        return redirect()->back();
    }

    public function archiveIndex()
    {
        return Inertia::render('Archive');
    }
}
