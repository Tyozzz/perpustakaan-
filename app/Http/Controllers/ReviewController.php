<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
// use Spatie\Permission\Models\Permission;

class ReviewController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:reviews index', only: ['index']),
            new Middleware('permission:reviews create', only: ['create', 'store']),
            new Middleware('permission:reviews edit', only: ['edit', 'update']),
            new Middleware('permission:reviews delete', only: ['destroy']),
        ];
    }

    /**
     * Display a listing of the resource.
     */
   public function index(Request $request)
{
    $reviews = Review::select('id', 'book', 'review', 'rating', 'created_at')
        ->when($request->search, function ($query) use ($request) {
            $query->where('book', 'like', '%' . $request->search . '%')
                  ->orWhere('review', 'like', '%' . $request->search . '%');
        })
        ->latest()
        ->paginate(6)
        ->withQueryString();

    return inertia('Reviews/Index', [
        'reviews' => $reviews,
        'filters' => $request->only(['search']),
    ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // render view
        return inertia('Reviews/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
   public function store(Request $request)
{
    $request->validate([
        'book' => 'required|string|max:255',
        'review' => 'required|string',
        'rating' => 'required|integer|min:1|max:5',
    ]);

    Review::create([
        'user_id' => auth()->id(), // otomatis user yang login
        'book' => $request->book,
        'review' => $request->review,
        'rating' => $request->rating,
    ]);

    return to_route('reviews.index')->with('success', 'Review created successfully.');
}


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        // render view
        return inertia('Reviews/Edit', ['review' => $review]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
{
    $request->validate([
        'book' => 'required|string|max:255',
        'review' => 'required|string',
        'rating' => 'required|integer|min:1|max:5',
    ]);

    $review->update([
        'book' => $request->book,
        'review' => $request->review,
        'rating' => $request->rating,
    ]);

    return to_route('reviews.index')->with('success', 'Review updated successfully.');
}

    /**
     * Remove the specified resource from storage.
     */
      public function destroy(Review $review)
    {
        $review->delete();

        return back();
    }
}