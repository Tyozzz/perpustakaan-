<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
{
    // Cek apakah user sudah ada
    $user = User::where('email', 'izaldev@gmail.com')->first();

    if (!$user) {
        $user = User::create([
            'name' => 'Izal',
            'email' => 'izaldev@gmail.com',
            'password' => Hash::make('passwordku'),
        ]);
    }

    // Ambil semua permission
    $permissions = Permission::all();

    // Ambil role (pastikan role-nya ada)
    $role = Role::find(1);

    if ($role) {
        $role->syncPermissions($permissions);
        $user->assignRole($role);
    } else {
        $this->command->warn('Role dengan ID 1 tidak ditemukan.');
    }
}
}
