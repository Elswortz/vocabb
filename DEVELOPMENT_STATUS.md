# VocAbb — состояние разработки

Документ описывает файлы, доступные в текущей рабочей области на 2026-10-29. Факты о коде основаны на просмотренных файлах; удалённая база данных и её конфигурация не проверялись.

## 1. Назначение и стек

VocAbb — full-stack приложение для изучения английской лексики: каталог слов, определения, переводы и пользовательские инструменты для сохранения и повторения слов.

- **Frontend:** React 19, TypeScript, Vite, Material UI, React Router, TanStack Query, Axios, React Hook Form и Zod.
- **Backend:** Node.js, TypeScript, Express 5, Zod.
- **Данные и аутентификация:** Supabase JS и PostgreSQL. Реальные таблицы, политики и функции удалённой базы этим аудитом не проверены.

## 2. Архитектура

### Frontend

- [frontend/src/main.tsx](./frontend/src/main.tsx) — React entry point и провайдеры авторизации, темы и React Query.
- [frontend/src/app/router/](./frontend/src/app/router/) и [frontend/src/app/layouts/](./frontend/src/app/layouts/) — маршрутизация и макеты приложения.
- [frontend/src/features/auth/](./frontend/src/features/auth/) — auth-контекст, login/register, восстановление сессии, защищённые и гостевые маршруты.
- [frontend/src/features/dictionary/](./frontend/src/features/dictionary/) — функции словаря, типы, query/mutation-хуки и компоненты каталога/создания слова.
- [frontend/src/pages/](./frontend/src/pages/) — страницы словаря и деталей слова; `HomePage` и `MyWordsPage` сейчас используют `PagePlaceholder`.
- [frontend/src/shared/api/](./frontend/src/shared/api/) — Axios-клиент, access-token storage и обработчик событий авторизации.

Frontend хранит access token в памяти модуля и передаёт его в запросах. Axios-клиент использует cookie credentials и при ответе 401 пытается обновить сессию. `AuthInitializer` при старте вызывает обновление сессии, а `ProtectedRoute` проверяет наличие авторизованного пользователя.

### Backend

- [backend/src/server.ts](./backend/src/server.ts) — Express-приложение, CORS, JSON и cookie middleware, health endpoint и подключение маршрутизаторов.
- [backend/src/routes/](./backend/src/routes/) — HTTP-маршруты; [backend/src/controllers/](./backend/src/controllers/) — обработчики запросов; [backend/src/services/](./backend/src/services/) — операции с Supabase.
- [backend/src/schemas/](./backend/src/schemas/) — Zod-схемы; [backend/src/middleware/](./backend/src/middleware/) — проверка access token, роли администратора, входных данных и ошибок.
- [backend/src/db/supabase.ts](./backend/src/db/supabase.ts) — обычный, пользовательский и административный Supabase-клиенты.
- [backend/src/types/](./backend/src/types/), [backend/src/utils/](./backend/src/utils/), [backend/src/config/](./backend/src/config/) и [backend/src/errors/](./backend/src/errors/) — типы, auth-вспомогательные функции, конфигурация и ошибки.

`authMiddleware` проверяет токен из заголовка Authorization через Supabase и помещает пользователя и клиент с пользовательским токеном в `res.locals`. `validate` записывает проверенные данные в `res.locals`. `requireAdmin` читает `profiles.role` для аутентифицированного пользователя и допускает только `admin`. Сервисы авторского CRUD слов, определений, примеров и переводов используют административный клиент; пользовательские операции используют клиент с пользовательским токеном.

## 3. Реализованные функции и проверки

### Подтверждено просмотром кода

- Backend предоставляет регистрацию, вход, `/auth/me`, обновление и выход из сессии. Refresh token устанавливается в HttpOnly cookie; access token возвращается клиенту.
- Ответы backend на регистрацию, вход, `/auth/me` и обновление сессии включают роль пользователя из `profiles.role`; frontend хранит роль рядом с `id` и `email` в auth-контексте. Роль читается сервером из базы, а не берётся из присланных клиентом данных.
- `GET /api/profile` и `PATCH /api/profile` защищены авторизацией. Профиль выбирается с полями `id`, `username`, `display_name`, `avatar_url`, `role`; backend-тип `UserRole` содержит `user` и `admin`.
- Каталог слов поддерживает публичные `GET /api/words` и `GET /api/words/:id`, поиск и пагинацию. `POST`, `PATCH` и `DELETE /api/words` требуют авторизации и `requireAdmin`; тело создания проверяется Zod-схемой.
- Frontend реализует загрузку списка и деталей слов, поиск с debounce, пагинацию и произношение через Web Speech API.
- Для пользователя с ролью `admin` из auth-контекста каталог показывает форму создания слова; форма загружает языки из `/languages`, валидирует поля и использует `createDictionaryWord`/`useCreateDictionaryWord`. Успешное создание инвалидирует кеш списка слов. Серверный `requireAdmin` остаётся обязательной проверкой доступа.
- Backend содержит маршруты и сервисы для языков, пользовательского словаря, коллекций, повторений, статистики, определений, примеров и переводов. Пользовательские маршруты используют аутентифицированный контекст; создание словарных данных ограничено `requireAdmin`.
- Проверки, выполненные 2026-10-29:
  - Frontend: `npm.cmd run build` — завершилась успешно; Vite сообщил о chunk размером более 500 kB после minification.
  - Frontend: `npm.cmd run lint` и Prettier `--check` для затронутых файлов — завершились успешно.
  - Backend: `npm.cmd run build` — завершилась успешно.

### Не запускалось / не подтверждено

- В `package.json` frontend и backend нет test-скрипта; поиск файлов `*.test.*` и `*.spec.*` в рабочей области результатов не дал. Автоматические тесты не запускались.

## 4. Незавершённые задачи и проблемы

- Реальный сценарий auth и создания слова с профилями `admin` и `user` не проверен через запущенные frontend/backend и Supabase; подтверждены только код и локальные статические проверки. Проверка роли в браузере управляет видимостью UI, авторитетная проверка API выполняется backend-ом.
- Главная страница и `MyWordsPage` остаются заглушками. Наличие backend API для пользовательских слов, повторения, коллекций и статистики само по себе не подтверждает готовый пользовательский интерфейс для этих функций.
- При ошибке восстановления сессии `AuthInitializer` очищает auth-состояние без отображения причины; Axios также очищает token и сообщает auth-событие при неудачном refresh. Это может затруднять диагностику сбоев сессии.
- В `server.ts` CORS origin задан как `http://localhost:5173`; конфигурация для другого frontend origin в просмотренном коде не обнаружена.

## 5. Архитектурные решения и ограничения

- API использует `/api` префикс; валидация запросов выполняется на границе маршрутов через Zod.
- Доступ к пользовательским данным выполняется от имени пользователя через Supabase-клиент с его access token. Авторский CRUD словарных сущностей выполняется административным клиентом после серверной проверки роли.
- Frontend хранит access token только в памяти; восстановление сессии зависит от refresh cookie и доступности backend/Supabase.
- В рабочей области не найдено SQL-файлов миграций. Backend вызывает RPC `add_user_word`, `review_word`, `get_user_stats`, `get_user_activity` и `get_user_streak`, а также читает таблицы вроде `profiles`, `words`, `user_words` и `collections`. Их фактическое существование, сигнатуры, RLS-политики, constraints и триггеры по доступным файлам проверить нельзя.
- Роль профиля описана backend-типом и используется в проверке администратора; соответствующее ограничение/значения в базе данных по локальным миграциям подтвердить нельзя.
- В корневом [README.md](./README.md) есть только краткое название проекта; отдельного описания схемы API или БД в просмотренных корневых документах нет.

## 6. Текущий этап и следующий шаг

**Этап:** backend возвращает роль из профиля вместе с auth-ответами; frontend сохраняет её в auth-контексте и показывает администраторский UI создания слов только роли `admin`. Запись по-прежнему защищена backend middleware `requireAdmin`.

**Следующий шаг:** проверить login, регистрацию с включённым подтверждением email, восстановление сессии и создание слова с учётными записями `admin` и `user`; для этого нужны рабочий backend и настроенная Supabase-база. Убедиться, что profile row создаётся для нового пользователя, поскольку backend теперь получает роль из `profiles`.