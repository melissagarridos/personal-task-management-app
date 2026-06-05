import './index.css'
import { renderPage } from "./router";

export function renderLogin() {
    const app = document.getElementById("app")
    app.innerHTML = `
    <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div class="w-full max-w-sm">

        <!-- Brand -->
        <div class="text-center mb-10">
          <h1 class="text-3xl font-extrabold tracking-tight text-white">
            task<span class="text-violet-400">board</span>
          </h1>
          <p class="mt-2 text-xs font-mono text-gray-500 tracking-widest uppercase">
            sign in to continue
          </p>
        </div>

        <!-- Card -->
        <div class="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8
                    before:absolute before:inset-x-0 before:top-0 before:h-px
                    before:bg-gradient-to-r before:from-transparent before:via-violet-400/40 before:to-transparent
                    before:rounded-t-2xl overflow-hidden">

          <!-- Username -->
          <div class="mb-5">
            <label for="username"
                   class="block font-mono text-[0.65rem] text-gray-500 uppercase tracking-widest mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="your username"
              autocomplete="off"
              class="w-full bg-white/[0.04] border border-white/10 text-gray-100 text-sm
                     placeholder-gray-600 px-4 py-3 rounded-xl outline-none transition-all duration-200
                     focus:border-violet-400/50 focus:bg-white/[0.06]"
            />
          </div>

          <!-- Password -->
          <div class="mb-8">
            <label for="password"
                   class="block font-mono text-[0.65rem] text-gray-500 uppercase tracking-widest mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              class="w-full bg-white/[0.04] border border-white/10 text-gray-100 text-sm
                     placeholder-gray-600 px-4 py-3 rounded-xl outline-none transition-all duration-200
                     focus:border-violet-400/50 focus:bg-white/[0.06]"
            />
          </div>

          <!-- Error message -->
          <p id="login-error"
             class="hidden text-center text-xs text-red-400 font-mono mb-4 tracking-wide">
            incorrect username or password
          </p>

          <!-- Submit -->
          <button id="login-button"
                  class="w-full bg-gradient-to-br from-violet-700 to-violet-400 text-white
                         text-sm font-bold py-3 rounded-xl cursor-pointer transition-all duration-200
                         hover:opacity-85 hover:-translate-y-px active:translate-y-0 border-0">
            Sign in
          </button>
        </div>

      </div>
    </div>
    `

    const loginButton = document.getElementById('login-button');

    loginButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value
        const password = document.getElementById('password').value
        const errorEl  = document.getElementById('login-error')

        errorEl.classList.add('hidden')

        const response = await fetch('http://localhost:3000/users');
        const users    = await response.json();

        const match = users.find(u => u.username === username && u.password === password)

        if (match) {
            localStorage.setItem("user", JSON.stringify(match))
            renderPage("/dashboard")
        } else {
            errorEl.classList.remove('hidden')
        }
    })
}