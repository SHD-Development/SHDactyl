# SHDactyl

A Laravel based client area for Pterodactyl.

# Requirements

Composer、PHP 8.1、Node.js、NPM、Nginx

# Installation

1. Download the source code.
2. Unarchive it.
3. Configure `.env` and `config/shdactyl.php`.
4. Run `composer install --no-dev --optimize-autoloader`.
5. Run `npm install`.
6. Run `npm run dev`.
7. Run `npm run build`.
8. Run `php artisan key:generate`.
9. Configure your webserver.
10. Change your Pterodactyl Panel's `app/Http/Controllers/Api/Application/Servers/ServerController.php`.

```
$servers = QueryBuilder::for(Server::query())
            ->allowedFilters(['id', 'uuid', 'uuidShort', 'name', AllowedFilter::exact('owner_id'), 'node_id', 'external_id'])
            ->allowedSorts(['id', 'uuid', 'uuidShort', 'name', 'owner_id', 'node_id', 'status'])
            ->paginate($perPage);
```
