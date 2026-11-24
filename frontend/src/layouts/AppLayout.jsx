import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BarChart3, BriefcaseBusiness, ChevronRight, LayoutDashboard, Plus, Users } from 'lucide-react';

const navigation = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Employees', to: '/employees', icon: Users }
];

export default function AppLayout() {
  const location = useLocation();
  const pageTitle = location.pathname.startsWith('/employees') ? 'Employee directory' : 'Overview';

  return (
    <div className="min-h-screen bg-[#f5f8fa] lg:flex">
      <aside className="flex w-full flex-col bg-[#102a43] px-5 py-5 text-white lg:fixed lg:inset-y-0 lg:w-64">
        <div className="flex items-center gap-3 px-2">
          <div className="grid size-10 place-items-center rounded-xl bg-[#f0b429] text-[#102a43]"><BriefcaseBusiness size={21} strokeWidth={2.5} /></div>
          <div><p className="heading text-lg font-bold tracking-tight">Teamflow</p><p className="text-[10px] uppercase tracking-[.18em] text-[#9fb3c8]">People operations</p></div>
        </div>
        <nav className="mt-10 flex gap-2 lg:block lg:space-y-2">
          {navigation.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => `flex flex-1 items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-[#1e4568] text-white shadow-inner' : 'text-[#b8c9d9] hover:bg-[#173b5b] hover:text-white'}`}><Icon size={18} />{label}</NavLink>)}
        </nav>
        <div className="mt-auto hidden rounded-2xl border border-[#285174] bg-[#173b5b] p-4 lg:block"><p className="text-xs font-semibold text-[#f0b429]">Keep things moving</p><p className="mt-2 text-xs leading-5 text-[#b8c9d9]">A clear view of your team helps every decision land better.</p></div>
      </aside>
      <main className="min-w-0 flex-1 lg:ml-64">
        <header className="flex items-center justify-between border-b border-[#d9e2ec] bg-white px-5 py-4 sm:px-8"><div><p className="text-xs font-semibold uppercase tracking-[.16em] text-[#829ab1]">Workspace / {pageTitle}</p><p className="heading mt-1 text-lg font-semibold text-[#17324d]">Good morning, Admin</p></div><NavLink to="/employees/new" className="flex items-center gap-2 rounded-xl bg-[#f0b429] px-4 py-2.5 text-sm font-bold text-[#102a43] shadow-sm transition hover:bg-[#f7c651]"><Plus size={17} /> <span className="hidden sm:inline">Add employee</span></NavLink></header>
        <div className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 lg:px-10"><Outlet /></div>
      </main>
    </div>
  );
}

export function Breadcrumb({ current }) { return <div className="mb-2 flex items-center gap-1 text-xs text-[#829ab1]"><span>Teamflow</span><ChevronRight size={13} /><span>{current}</span></div>; }
