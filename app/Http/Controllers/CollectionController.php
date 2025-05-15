<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Collection;
use App\Models\Book;

class CollectionController extends Controller implements HasMiddleware
{
    /**
     * Middleware untuk kontrol hak akses berdasarkan permission.
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:collections index', only: ['index']),
            new Middleware('permission:collections create', only: ['create', 'store']),
            new Middleware('permission:collections edit', only: ['edit', 'update']),
            new Middleware('permission:collections delete', only: ['destroy']),
        ];
    }

    /**
     * Menampilkan daftar koleksi (collections) dengan opsi pencarian.
     */
   public function index(Request $request)
{
    $collections = Collection::with(['user:id,name', 'book:id,title'])
        ->when($request->search, function ($query) use ($request) {
            $query->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%');
            })->orWhereHas('book', function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%');
            });
        })
        ->latest()
        ->paginate(6)
        ->withQueryString();

    return Inertia::render('Collections/Index', [
        'collections' => $collections,
        'filters' => $request->only(['search']),
    ]);
}

    /**
     * Menampilkan halaman form create.
     */
    public function create()
    {
        return Inertia::render('Collections/Create', [
            'users' => User::select('id', 'name')->get(),
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    /**
     * Menyimpan koleksi baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'book_id' => 'required|integer|exists:books,id',
        ]);

        Collection::create([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
        ]);

        return to_route('collections.index')->with('success', 'Collection created successfully.');
    }

    /**
     * Menampilkan form edit untuk koleksi tertentu.
     */
    public function edit(Collection $collection)
    {
        return Inertia::render('Collections/Edit', [
            'collection' => $collection,
            'users' => User::select('id', 'name')->get(),
            'books' => Book::select('id', 'title')->get(),
        ]);
    }

    /**
     * Mengupdate data koleksi di database.
     */
    public function update(Request $request, Collection $collection)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'book_id' => 'required|integer|exists:books,id',
        ]);

        $collection->update([
            'user_id' => $request->user_id,
            'book_id' => $request->book_id,
        ]);

        return to_route('collections.index')->with('success', 'Collection updated successfully.');
    }

    /**
     * Menghapus koleksi dari database.
     */
    public function destroy(Collection $collection)
    {
        $collection->delete();

        return to_route('collections.index')->with('success', 'Collection deleted successfully.');
    }
}
