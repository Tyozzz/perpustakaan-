<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use App\Models\User;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class BorrowingController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:borrowings index', only: ['index']),
            new Middleware('permission:borrowings create', only: ['create', 'store']),
            new Middleware('permission:borrowings edit', only: ['edit', 'update']),
            new Middleware('permission:borrowings delete', only: ['destroy']),
        ];
    }

    public function index(Request $request)
    {
        $borrowings = Borrowing::with(['user:id,name', 'book:id,title'])
            ->when($request->search, function ($query) use ($request) {
                $query->whereHas('user', fn($q) =>
                    $q->where('name', 'like', '%' . $request->search . '%')
                );
            })
            ->latest()
            ->paginate(6)
            ->withQueryString();

        return inertia('Borrowings/Index', [
            'borrowings' => $borrowings,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return inertia('Borrowings/Create', [
            'users' => User::select('id', 'name')->get(),
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'date_loan' => 'required|date',
            'date_return' => 'required|date|after_or_equal:date_loan',
            'state' => 'required|string|max:255',
        ]);

        Borrowing::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'date_loan' => $request->date_loan,
            'date_return' => $request->date_return,
            'state' => $request->state,
        ]);

        return to_route('borrowings.index');
    }

    public function edit(Borrowing $borrowing)
    {
        return inertia('Borrowings/Edit', [
            'borrowing' => $borrowing->load('user:id,name', 'book:id,title'),
            'users' => User::select('id', 'name')->get(),
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    public function update(Request $request, Borrowing $borrowing)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'book_id' => 'required|exists:books,id',
            'date_loan' => 'required|date',
            'date_return' => 'required|date|after_or_equal:date_loan',
            'state' => 'required|string|max:255',
        ]);

        $borrowing->update([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
            'date_loan' => $request->date_loan,
            'date_return' => $request->date_return,
            'state' => $request->state,
        ]);

        return to_route('borrowings.index');
    }

    public function destroy(Borrowing $borrowing)
    {
        $borrowing->delete();

        return back();
    }
}
