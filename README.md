# Frontend Interview Trainer

Стартовый проект на Next.js 16 с App Router, TypeScript и PostgreSQL. Cache Components выключены в `next.config.ts`.

## Запуск

Понадобятся Node.js 20.9+ и npm. Для локального PostgreSQL можно использовать Docker Compose.

```sh
npm ci
cp .env.example .env.local
docker compose up -d --wait
npm run db:check
npm run db:setup
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000). Если PostgreSQL уже запущен, укажите его адрес в `DATABASE_URL` и пропустите команду Docker. Команда `db:setup` создаёт таблицу и добавляет три стартовых вопроса. При повторном запуске существующие вопросы сохраняются.

## Production

PostgreSQL должен быть доступен во время сборки и запуска. При сборке Next.js читает список slug из базы и генерирует HTML карточек.

```sh
npm run build
npm run start
```

## Проверка ISR

1. После сборки откройте `/problems/react-use-ref` через production-сервер.
2. Измените условие вопроса напрямую в PostgreSQL. Например, для базы из Docker Compose выполните:

   ```sh
   docker compose exec postgres psql -U trainer -d interview_trainer -c \
     "UPDATE problems SET question = 'Когда useRef сохраняет значение между рендерами?' WHERE slug = 'react-use-ref';"
   ```

3. Пока кеш свежий, карточка показывает прежнее условие. Через 300 секунд после генерации первый запрос может вернуть прежний HTML и запустить регенерацию в фоне. Повторите запрос после её завершения, чтобы увидеть новое условие.

## Редактирование вопросов

Задайте в `.env.local` значение `ADMIN_PASSWORD`. Для генерации пароля используйте `openssl rand -hex 32`. Откройте `/admin/problems/react-use-ref/edit` и войдите. Для входа используйте HTTPS или локальный адрес `http://127.0.0.1`. Сессия администратора действует восемь часов.

После сохранения форма открывает публичную карточку. Server Action сбрасывает кеш карточки, а при изменении заголовка также вызывает ревалидацию каталога.
