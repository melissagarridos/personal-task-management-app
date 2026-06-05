# Taskboard

## Description

Taskboard is a Single Page Application (SPA) for managing projects/tasks. Users can log in, view a real-time summary of their projects, and perform full CRUD operations — all without ever reloading the browser. Navigation and view rendering are handled entirely through JavaScript.

---

## Technologies

| Layer | Technology |
|---|---|
| Build tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Fake REST API | [JSON Server](https://github.com/typicode/json-server) |
| Language | Vanilla JavaScript (ES Modules) |
| Routing | Custom client-side router (`router.js`) |

---

## Installation

Make sure you have **Node.js 18+** installed, then run:

```bash
# Clone the repository
git clone <your-repo-url>
cd <project-folder>

# Install dependencies
npm install
```

---

## Running the Project

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

> Tailwind CSS is processed automatically by the Vite plugin — no separate build step needed.

---

## Running JSON Server

JSON Server acts as the backend REST API. Open a **second terminal** and run:

```bash
npx json-server --watch db.json --port 3000
```

The API will be available at `http://localhost:3000`

Available endpoints:

```
GET    /users
GET    /todos
POST   /todos
PATCH  /todos/:id
DELETE /todos/:id
```

---

## Test Users

These users are pre-loaded in `db.json`:

| Username | Password | Role |
|---|---|---|
| `dieguito` | `1234` | admin |
| `melissita` | `5678` | user |

---

## Project Structure

```
├── db.json              # JSON Server database (users + todos)
├── index.html           # App entry point
└── src/
    ├── index.css        # Tailwind CSS entry (@import "tailwindcss")
    ├── router.js        # Client-side SPA router
    ├── login.js         # Login view + authentication logic
    └── dashboard.js     # Dashboard view + full CRUD logic
```

---

## Role Permissions

The `role` field is stored in `localStorage` after login and is displayed in the navbar badge. Current behavior by role:

| Permission | admin | user |
|---|---|---|
| View projects | ✅ | ✅ |
| Add project | ✅ | ✅ |
| Edit project | ✅ | ✅ |
| Toggle completed | ✅ | ✅ |
| Delete project | ✅ | ✅ |

> Role-based access control (RBAC) can be extended in `dashboard.js` by checking `user.role` before rendering action buttons.

---

## Technical Decisions

**Vanilla JS over a framework** — The project intentionally avoids React/Vue to demonstrate core SPA concepts: manual DOM rendering, client-side routing via `history.pushState`, and state management through plain JavaScript variables.

**Custom client-side router** — `router.js` intercepts navigation calls and renders views dynamically by mapping URL paths to render functions, keeping the browser from ever performing a full page reload.

**JSON Server as backend** — Provides a zero-config REST API that persists data to `db.json`, making it ideal for prototyping without a real backend. All four HTTP methods (GET, POST, PATCH, DELETE) are used.

**Tailwind CSS v4 via Vite plugin** — Styles are purged at build time based on class usage across all `.js` and `.html` files, resulting in a minimal production CSS bundle. The `content` array in `tailwind.config.js` includes `./src/**/*.js` to ensure dynamically injected HTML classes are detected.

**`localStorage` for session** — After a successful login, the user object is persisted in `localStorage`. The router checks for this key on every navigation attempt and redirects to `/` if no session is found, acting as a basic auth guard.

**Event delegation** — Instead of attaching individual listeners to each todo item (which would be lost on every re-render), a single listener is attached to the parent `#todo-list` container and reads `data-action` / `data-id` attributes to determine what to do. This keeps the code clean and avoids memory leaks.