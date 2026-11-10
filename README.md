# Frontend Interview Trainer

Стартовый проект на Next.js 16 с App Router, TypeScript и PostgreSQL. Cache Components выключены в `next.config.ts`.

## Запуск

Понадобятся Node.js 20.9+ и npm. Для локального PostgreSQL можно использовать Docker Compose.

```sh
npm ci
cp .env.example .env.local
docker compose up -d --wait
npm run db:check
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000). Если PostgreSQL уже запущен, укажите его адрес в `DATABASE_URL` и пропустите команду Docker. Пул подключений для серверного кода доступен через `getDb()` из `lib/db.ts`.

## Production

```sh
npm run build
npm run start
```
