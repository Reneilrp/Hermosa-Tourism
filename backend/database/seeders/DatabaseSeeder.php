<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Seed default Admin user for Tourism Officer
        User::factory()->create([
            'name' => 'Zamboanga Tourism Admin',
            'email' => 'admin@hermosa-tourism.ph',
            'password' => bcrypt('Hermosa2026!'),
        ]);

        $this->call([
            ZamboangaPoiSeeder::class,
        ]);
    }
}
