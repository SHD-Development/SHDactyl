<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('panel_id')->nullable();
            $table->string('discord_id');
            $table->string('avatar');
            $table->decimal('coins', 10, 2)->default(config('shdactyl.resources.coins'));
            $table->integer('cpu')->default(config('shdactyl.resources.cpu'));
            $table->integer('ram')->default(config('shdactyl.resources.ram'));
            $table->integer('disk')->default(config('shdactyl.resources.disk'));
            $table->integer('databases')->default(config('shdactyl.resources.databases'));
            $table->integer('backups')->default(config('shdactyl.resources.backups'));
            $table->integer('ports')->default(config('shdactyl.resources.ports'));
            $table->integer('servers')->default(config('shdactyl.resources.servers'));
            $table->string('database_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('panel_id');
            $table->dropColumn('discord_id');
            $table->dropColumn('avatar');
            $table->dropColumn('coins');
            $table->dropColumn('cpu');
            $table->dropColumn('ram');
            $table->dropColumn('disk');
            $table->dropColumn('databases');
            $table->dropColumn('backups');
            $table->dropColumn('ports');
            $table->dropColumn('database_id');
        });
    }
};
