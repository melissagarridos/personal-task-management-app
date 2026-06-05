var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=`modulepreload`,r=function(e){return`/`+e},i={},a=function(e,t,a){let o=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),s=document.querySelector(`meta[property=csp-nonce]`),c=s?.nonce||s?.getAttribute(`nonce`);function l(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}o=l(t.map(t=>{if(t=r(t,a),t in i)return;i[t]=!0;let o=t.endsWith(`.css`),s=o?`[rel="stylesheet"]`:``;if(a)for(let n=e.length-1;n>=0;n--){let r=e[n];if(r.href===t&&(!o||r.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${s}`))return;let l=document.createElement(`link`);if(l.rel=o?`stylesheet`:n,o||(l.as=`script`),l.crossOrigin=``,l.href=t,c&&l.setAttribute(`nonce`,c),document.head.appendChild(l),o)return new Promise((e,n)=>{l.addEventListener(`load`,e),l.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function s(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return o.then(t=>{for(let e of t||[])e.status===`rejected`&&s(e.reason);return e().catch(s)})};function o(){let e=document.getElementById(`app`),t=JSON.parse(localStorage.getItem(`user`));e.innerHTML=`
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
            ${t?.username||`user`} · ${t?.role||`user`}
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
    `;let n=`http://localhost:3000/todos`,r=[],i=document.getElementById(`todo-list`);function o(){let e=r.length,t=r.filter(e=>e.completed).length;document.getElementById(`stat-total`).textContent=e,document.getElementById(`stat-done`).textContent=t,document.getElementById(`stat-pending`).textContent=e-t}function s(){if(r.length===0){i.innerHTML=`
              <p class="text-center py-16 text-gray-600 font-mono text-xs tracking-widest">
                no projects yet · add one above
              </p>`;return}i.innerHTML=r.map(e=>`
          <div class="flex items-center gap-3 md:gap-4 bg-white/[0.03] border border-white/[0.07]
                      rounded-2xl px-4 md:px-5 py-3 md:py-4 transition-all duration-200
                      hover:bg-white/[0.05] hover:border-white/10 todo-item"
               data-id="${e.id}">

            <div data-action="toggle" data-id="${e.id}"
                 class="w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center
                        cursor-pointer transition-all duration-200 select-none
                        ${e.completed?`bg-emerald-400 border-emerald-400 text-gray-950 text-xs font-black`:`border-white/15 hover:border-emerald-400/50`}">
              ${e.completed?`✓`:``}
            </div>

            <span data-id="${e.id}"
                  class="flex-1 text-sm transition-colors duration-200 todo-text
                         ${e.completed?`line-through text-gray-600`:`text-gray-100`}">
              ${e.title}
            </span>
            <input data-id="${e.id}" value="${e.title}"
                   class="flex-1 hidden bg-violet-400/10 border border-violet-400/40 text-gray-100
                          text-sm px-3 py-1 rounded-lg outline-none todo-edit-input" />

            <span class="hidden sm:inline font-mono text-[0.6rem] tracking-widest px-2.5 py-0.5 rounded-full
                         flex-shrink-0 border
                         ${e.completed?`bg-emerald-400/10 text-emerald-400 border-emerald-400/20`:`bg-amber-400/10 text-amber-400 border-amber-400/20`}">
              ${e.completed?`DONE`:`PENDING`}
            </span>

            <div class="flex gap-2 flex-shrink-0">
              <button data-action="edit" data-id="${e.id}" title="Edit"
                      class="btn-edit w-8 h-8 rounded-lg border border-white/8 text-gray-500 text-sm
                             flex items-center justify-center cursor-pointer transition-all duration-200
                             hover:bg-violet-400/15 hover:border-violet-400/30 hover:text-violet-400">✎</button>
              <button data-action="save" data-id="${e.id}" title="Save"
                      class="btn-save hidden w-8 h-8 rounded-lg border border-white/8 text-gray-500 text-sm
                             flex items-center justify-center cursor-pointer transition-all duration-200
                             hover:bg-emerald-400/15 hover:border-emerald-400/30 hover:text-emerald-400">✓</button>
              <button data-action="delete" data-id="${e.id}" title="Delete"
                      class="w-8 h-8 rounded-lg border border-white/8 text-gray-500 text-sm
                             flex items-center justify-center cursor-pointer transition-all duration-200
                             hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400">✕</button>
            </div>
          </div>
        `).join(``)}async function l(){r=await(await fetch(n)).json(),o(),s()}async function u(e){let t=r.length>0?Math.max(...r.map(e=>e.id))+1:1,i=await(await fetch(n,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({id:t,title:e,completed:!1})})).json();r.push(i),o(),s()}async function d(e){let t=r.find(t=>t.id===e);t&&(await fetch(`${n}/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({completed:!t.completed})})).ok&&(r=r.map(t=>t.id===e?{...t,completed:!t.completed}:t),o(),s())}async function f(e,t){(await fetch(`${n}/${e}`,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify({title:t})})).ok&&(r=r.map(n=>n.id===e?{...n,title:t}:n),s())}async function p(e){await fetch(`${n}/${e}`,{method:`DELETE`}),r=r.filter(t=>t.id!==e),o(),s()}i.addEventListener(`click`,async e=>{let t=e.target.dataset.action,n=Number(e.target.dataset.id);if(!(!t||!n)){if(t===`toggle`&&await d(n),t===`edit`){let e=i.querySelector(`.todo-item[data-id="${n}"]`);e.querySelector(`.todo-text[data-id="${n}"]`).classList.add(`hidden`),e.querySelector(`.todo-edit-input[data-id="${n}"]`).classList.remove(`hidden`),e.querySelector(`.btn-edit[data-id="${n}"]`).classList.add(`hidden`),e.querySelector(`.btn-save[data-id="${n}"]`).classList.remove(`hidden`),e.querySelector(`.todo-edit-input[data-id="${n}"]`).focus()}if(t===`save`){let e=i.querySelector(`.todo-edit-input[data-id="${n}"]`).value.trim();e&&await f(n,e)}t===`delete`&&await p(n)}}),document.getElementById(`add-todo-btn`).addEventListener(`click`,async()=>{let e=document.getElementById(`new-todo-input`),t=e.value.trim();t&&(e.value=``,await u(t))}),document.getElementById(`new-todo-input`).addEventListener(`keydown`,async e=>{e.key===`Enter`&&document.getElementById(`add-todo-btn`).click()}),document.getElementById(`logout-btn`).addEventListener(`click`,()=>{localStorage.removeItem(`user`),window.history.pushState({},``,`/`),a(()=>Promise.resolve().then(()=>c).then(e=>e.renderPage(`/`)),void 0)}),l()}function s(){let e=document.getElementById(`app`);e.innerHTML=`
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
    `,document.getElementById(`login-button`).addEventListener(`click`,async e=>{e.preventDefault();let t=document.getElementById(`username`).value,n=document.getElementById(`password`).value,r=document.getElementById(`login-error`);r.classList.add(`hidden`);let i=(await(await fetch(`http://localhost:3000/users`)).json()).find(e=>e.username===t&&e.password===n);i?(localStorage.setItem(`user`,JSON.stringify(i)),d(`/dashboard`)):r.classList.remove(`hidden`)})}var c=t({renderPage:()=>d}),l={"/":s,"/dashboard":o},u=window.location.pathname;function d(e){localStorage.getItem(`user`)===null?(window.history.pushState({},``,`/`),l[`/`]()):(window.history.pushState({},``,e),l[e]())}d(u);