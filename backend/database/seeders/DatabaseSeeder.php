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
        User::firstOrCreate(
            ['email' => 'admin@hermosa-tourism.ph'],
            [
                'name' => 'Zamboanga Tourism Admin',
                'password' => bcrypt('Hermosa2026!'),
            ]
        );

        $this->call([
            ZamboangaPoiSeeder::class,
            ZambasultaRegionalSeeder::class,
            PackageAndGuideSeeder::class,
        ]);
    }
}
