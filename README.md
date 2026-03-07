# Todo API

REST API для списка задач (todo list). Бэкенд на Node.js, Express и MongoDB (Mongoose).

## Стек

- Node.js
- Express.js
- MongoDB
- Mongoose

## Установка и запуск

1. Клонировать репозиторий:
   ```bash
   git clone https://github.com/pashasam90/todo-api.git
   cd todo-api
   ```

2. Установить зависимости:
   ```bash
   npm install
   ```

3. В корне проекта создать файл `.env` и указать строку подключения к MongoDB:
   ```
   MONGO_URI=mongodb://localhost:27017/имя_базы
   ```
   (подставь свой URL и имя базы)

4. Запустить сервер:
   ```bash
   node app.js
   ```
   Сервер будет доступен по адресу `http://localhost:3000`.

## API

| Метод   | URL           | Описание              |
|--------|----------------|------------------------|
| GET    | `/todos`       | Получить все задачи    |
| GET    | `/todos/:id`   | Получить одну задачу   |
| POST   | `/todos`       | Создать задачу         |
| PUT    | `/todos/:id`   | Обновить задачу        |
| DELETE | `/todos/:id`   | Удалить задачу         |

### Примеры

**Создать задачу (POST /todos)**  
Тело запроса (JSON):
```json
{
  "title": "Купить молоко",
  "completed": false
}
```
Поле `title` обязательно.

**Обновить задачу (PUT /todos/:id)**  
Можно передать только нужные поля, например:
```json
{
  "title": "Новый заголовок",
  "completed": true
}
```

Ответы при ошибках: `400` — неверные данные, `404` — задача не найдена, `500` — ошибка сервера.
