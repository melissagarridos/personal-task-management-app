import './index.css'
export function renderDashboard() {
    const app  = document.getElementById("app");
    const user = JSON.parse(localStorage.getItem("user"));

    app.innerHTML = `
    <div class="min-h-screen bg-gray-950 text-gray-100">

      <!-- NAVBAR -->
      <nav class="sticky top-0 z-50 flex items-center justify-between px-4 md:px-10 py-4 md:py-5
                  border-b border-white/5 bg-gray-950/80 backdrop-blur-md">
        <span class="text-lg font-extrabold tracking-tight text-white">
          task<span class="text-violet-400">board</span>
        </span>
        <div class="flex items-center gap-3 md:gap-4">
          <span class="hidden sm:inline font-mono text-xs text-violet-400 bg-violet-400/10
                       border border-violet-400/20 px-3 py-1 rounded-full tracking-wider">
            ${user?.username || "user"} · ${user?.role || "user"}
          </span>
          <button id="logout-btn"
                  class="text-xs font-semibold text-gray-400 border border-white/10
                         px-4 py-1.5 rounded-lg cursor-pointer transition-all duration-200
                         hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5">
            Log out
          </button>
        </div>
      </nav>

      <!-- MAIN -->
      <main class="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">

        <!-- STATS -->
        <div class="grid grid-cols-3 gap-3 md:gap-4 mb-8 md:mb-12">
          <div class="relative overflow-hidden bg-white/[0.03] border border-white/[0.07]
                      rounded-2xl p-4 md:p-6 transition-all duration-200 hover:border-violet-400/30
                      before:absolute before:inset-x-0 before:top-0 before:h-px
                      before:bg-gradient-to-r before:from-transparent before:via-violet-400/40 before:to-transparent">
            <p class="font-mono text-[0.6rem] md:text-[0.65rem] text-gray-500 uppercase tracking-widest mb-2 md:mb-3">Total projects</p>
            <p id="stat-total" class="text-3xl md:text-4xl font-extrabold tracking-tighter text-gray-100">—</p>
          </div>
          <div class="relative overflow-hidden bg-white/[0.03] border border-white/[0.07]
                      rounded-2xl p-4 md:p-6 transition-all duration-200 hover:border-emerald-400/30
                      before:absolute before:inset-x-0 before:top-0 before:h-px
                      before:bg-gradient-to-r before:from-transparent before:via-emerald-400/40 before:to-transparent">
            <p class="font-mono text-[0.6rem] md:text-[0.65rem] text-gray-500 uppercase tracking-widest mb-2 md:mb-3">Completed</p>
            <p id="stat-done" class="text-3xl md:text-4xl font-extrabold tracking-tighter text-emerald-400">—</p>
          </div>
          <div class="relative overflow-hidden bg-white/[0.03] border border-white/[0.07]
                      rounded-2xl p-4 md:p-6 transition-all duration-200 hover:border-amber-400/30
                      before:absolute before:inset-x-0 before:top-0 before:h-px
                      before:bg-gradient-to-r before:from-transparent before:via-amber-400/40 before:to-transparent">
            <p class="font-mono text-[0.6rem] md:text-[0.65rem] text-gray-500 uppercase tracking-widest mb-2 md:mb-3">Pending</p>
            <p id="stat-pending" class="text-3xl md:text-4xl font-extrabold tracking-tighter text-amber-400">—</p>
          </div>
        </div>

        <!-- SECTION TITLE -->
        <h2 class="text-base font-bold tracking-tight text-gray-100 mb-5 md:mb-6">Projects</h2>

        <!-- ADD FORM -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
          <input
            id="new-todo-input"
            type="text"
            placeholder="New project..."
            autocomplete="off"
            class="flex-1 bg-white/[0.04] border border-white/10 text-gray-100 text-sm
                   placeholder-gray-600 px-5 py-3 rounded-xl outline-none transition-all duration-200
                   focus:border-violet-400/50 focus:bg-white/[0.06]"
          />
          <button id="add-todo-btn"
                  class="bg-gradient-to-br from-violet-700 to-violet-400 text-white text-sm font-bold
                         px-6 py-3 rounded-xl cursor-pointer whitespace-nowrap transition-all duration-200
                         hover:opacity-85 hover:-translate-y-px active:translate-y-0 border-0">
            + Add
          </button>
        </div>

        <!-- LIST — este div nunca se reemplaza, solo su innerHTML -->
        <div id="todo-list" class="flex flex-col gap-3">
          <p class="text-center py-10 text-gray-600 font-mono text-xs tracking-widest">
            loading projects...
          </p>
        </div>

      </main>
    </div>
    `;

    // ─── State ───────────────────────────────────────────────
    const API     = "http://localhost:3000/todos";
    let   todos   = [];

    // ─── Referencia estable al contenedor (nunca cambia) ─────
    const todoList = document.getElementById("todo-list");

    // ─── Stats ───────────────────────────────────────────────
    function updateStats() {
        const total   = todos.length;
        const done    = todos.filter(t => t.completed).length;
        document.getElementById("stat-total").textContent   = total;
        document.getElementById("stat-done").textContent    = done;
        document.getElementById("stat-pending").textContent = total - done;
    }

    // ─── Render list (solo actualiza el innerHTML interno) ───
    function renderList() {
        if (todos.length === 0) {
            todoList.innerHTML = `
              <p class="text-center py-16 text-gray-600 font-mono text-xs tracking-widest">
                no projects yet · add one above
              </p>`;
            return;
        }

        todoList.innerHTML = todos.map(todo => `
          <div class="flex items-center gap-3 md:gap-4 bg-white/[0.03] border border-white/[0.07]
                      rounded-2xl px-4 md:px-5 py-3 md:py-4 transition-all duration-200
                      hover:bg-white/[0.05] hover:border-white/10 todo-item"
               data-id="${todo.id}">

            <div data-action="toggle" data-id="${todo.id}"
                 class="w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center
                        cursor-pointer transition-all duration-200 select-none
                        ${todo.completed
                          ? 'bg-emerald-400 border-emerald-400 text-gray-950 text-xs font-black'
                          : 'border-white/15 hover:border-emerald-400/50'}">
              ${todo.completed ? '✓' : ''}
            </div>

            <span data-id="${todo.id}"
                  class="flex-1 text-sm transition-colors duration-200 todo-text
                         ${todo.completed ? 'line-through text-gray-600' : 'text-gray-100'}">
              ${todo.title}
            </span>
            <input data-id="${todo.id}" value="${todo.title}"
                   class="flex-1 hidden bg-violet-400/10 border border-violet-400/40 text-gray-100
                          text-sm px-3 py-1 rounded-lg outline-none todo-edit-input" />

            <span class="hidden sm:inline font-mono text-[0.6rem] tracking-widest px-2.5 py-0.5 rounded-full
                         flex-shrink-0 border
                         ${todo.completed
                           ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                           : 'bg-amber-400/10 text-amber-400 border-amber-400/20'}">
              ${todo.completed ? 'DONE' : 'PENDING'}
            </span>

            <div class="flex gap-2 flex-shrink-0">
              <button data-action="edit" data-id="${todo.id}" title="Edit"
                      class="btn-edit w-8 h-8 rounded-lg border border-white/8 text-gray-500 text-sm
                             flex items-center justify-center cursor-pointer transition-all duration-200
                             hover:bg-violet-400/15 hover:border-violet-400/30 hover:text-violet-400">✎</button>
              <button data-action="save" data-id="${todo.id}" title="Save"
                      class="btn-save hidden w-8 h-8 rounded-lg border border-white/8 text-gray-500 text-sm
                             flex items-center justify-center cursor-pointer transition-all duration-200
                             hover:bg-emerald-400/15 hover:border-emerald-400/30 hover:text-emerald-400">✓</button>
              <button data-action="delete" data-id="${todo.id}" title="Delete"
                      class="w-8 h-8 rounded-lg border border-white/8 text-gray-500 text-sm
                             flex items-center justify-center cursor-pointer transition-all duration-200
                             hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400">✕</button>
            </div>
          </div>
        `).join('');
    }

    // ─── API Calls ────────────────────────────────────────────

    async function fetchTodos() {
        const res = await fetch(API);
        todos = await res.json();
        updateStats();
        renderList();
    }

    async function addTodo(title) {
      // Let json-server generate the id (it returns a string id)
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false })
      });
        const newTodo = await res.json();
        todos.push(newTodo);
        updateStats();
        renderList();
    }

    async function toggleTodo(id) {
      // IDs are strings coming from json-server; compare as strings
      const todo = todos.find(t => t.id == id);
      if (!todo) return;
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed })
      });
      if (!res.ok) return;
      todos = todos.map(t => t.id == id ? { ...t, completed: !t.completed } : t);
      updateStats();
      renderList();
    }

    async function updateTodo(id, newTitle) {
      const res = await fetch(`${API}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle })
      });
      if (!res.ok) return;
      todos = todos.map(t => t.id == id ? { ...t, title: newTitle } : t);
      renderList();
    }

    async function deleteTodo(id) {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      todos = todos.filter(t => t.id != id);
      updateStats();
      renderList();
    }

    // ─── Event delegation sobre el contenedor estable ────────
    // Se adjunta UNA sola vez; funciona aunque innerHTML cambie
    todoList.addEventListener("click", async (e) => {
      const action = e.target.dataset.action;
      const id     = e.target.dataset.id;
      if (!action || id == null) return;

      if (action === "toggle") {
        await toggleTodo(id);
      }

        if (action === "edit") {
            const item = todoList.querySelector(`.todo-item[data-id="${id}"]`);
            item.querySelector(`.todo-text[data-id="${id}"]`).classList.add("hidden");
            item.querySelector(`.todo-edit-input[data-id="${id}"]`).classList.remove("hidden");
            item.querySelector(`.btn-edit[data-id="${id}"]`).classList.add("hidden");
            item.querySelector(`.btn-save[data-id="${id}"]`).classList.remove("hidden");
            item.querySelector(`.todo-edit-input[data-id="${id}"]`).focus();
        }

        if (action === "save") {
            const input    = todoList.querySelector(`.todo-edit-input[data-id="${id}"]`);
            const newTitle = input.value.trim();
            if (newTitle) await updateTodo(id, newTitle);
        }

        if (action === "delete") {
            await deleteTodo(id);
        }
    });

    // ─── Top-level listeners ──────────────────────────────────
    document.getElementById("add-todo-btn").addEventListener("click", async () => {
        const input = document.getElementById("new-todo-input");
        const title = input.value.trim();
        if (!title) return;
        input.value = "";
        await addTodo(title);
    });

    document.getElementById("new-todo-input").addEventListener("keydown", async (e) => {
        if (e.key === "Enter") document.getElementById("add-todo-btn").click();
    });

    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.history.pushState({}, "", "/");
        import("./router.js").then(m => m.renderPage("/"));
    });

    // ─── Init ─────────────────────────────────────────────────
    fetchTodos();
}