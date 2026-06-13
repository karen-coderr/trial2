/**
 * CareFlow Navigation Sidebar Layout Shell
 * Pure ES6 Module Component
 */export class SidebarLayout {
  constructor(containerId = 'sidebar-container', currentRole = 'Receptionist') {
    this.container = document.getElementById(containerId);
    this.role = currentRole;
    this.navigationItems = [
      { label: 'Smart Queue', icon: '📋', view: 'dashboard', active: true },
      { label: 'Registration', icon: '➕', view: 'registration', active: false },
      { label: 'Appointments', icon: '📅', view: 'appointments', active: false },
      { label: 'Advance Queue', icon: '⏳', view: 'queue', active: false },
      { label: 'System Settings', icon: '⚙️', view: 'settings', active: false }
    ];
    this.onViewChangeCallback = null;
  }

  onViewChange(callback) {
    this.onViewChangeCallback = callback;
  }

  navigateTo(targetView) {
    this.navigationItems = this.navigationItems.map(item => ({
      ...item,
      active: item.view === targetView
    }));
    this.render();
    if (this.onViewChangeCallback) this.onViewChangeCallback(targetView);
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <aside class="w-64 bg-white border-r border-gray-100 flex flex-col justify-between p-6 min-h-screen shadow-sm shrink-0">
        <div>
          <div class="flex items-center gap-3 mb-10 select-none">
            <div class="w-12 h-12 shrink-0">
              <img src="https://res.cloudinary.com/dumlpxmyv/image/upload/v1781260473/Rectangle_107_eky5sx.png" class="w-full h-full object-contain" onerror="this.outerHTML='<div class=\\'w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md\\'>CF</div>'">
            </div>
            <div>
              <h2 class="text-xl font-black text-blue-600 tracking-tight leading-none">CareFlow</h2>
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-1">Clinic OS</span>
            </div>
          </div>

          <div class="mb-8 bg-slate-50 border border-slate-100 rounded-xl p-3.5">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Active Session</span>
            <p class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              ${this.role}
            </p>
          </div>

          <nav class="flex flex-col gap-1.5" id="sidebar-nav-list">
            ${this.navigationItems.map(item => `
              <button
                data-view="${item.view}"
                class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 group active:scale-[0.98] ${
                  item.active
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }"
              >
                <span class="text-base transition-transform group-hover:scale-110 duration-150">${item.icon}</span>
                <span class="tracking-tight">${item.label}</span>
              </button>
            `).join('')}
          </nav>
        </div>

        <div class="pt-4 border-t border-gray-50 flex flex-col gap-1 select-none">
          <div class="text-[10px] text-slate-400 font-bold uppercase tracking-wider">System Node</div>
          <div class="text-xs text-slate-600 font-mono">v1.1.2-prod-core</div>
        </div>
      </aside>
    `;

    this.container.querySelectorAll('[data-view]').forEach(button => {
      button.addEventListener('click', (e) => this.navigateTo(e.currentTarget.getAttribute('data-view')));
    });
  }
}