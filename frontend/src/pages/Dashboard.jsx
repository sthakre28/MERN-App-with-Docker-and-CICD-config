import { useEffect, useState } from 'react';
import { Activity, Building2, UserCheck, UserRound, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dashboardService } from '../services/api.js';
import StatCard from '../components/StatCard.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { Breadcrumb } from '../layouts/AppLayout.jsx';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { dashboardService.stats().then(setStats).catch(() => setError('Could not load dashboard data. Is the API running?')); }, []);
  if (error) return <ErrorState message={error} />;
  if (!stats) return <LoadingState />;
  return <div className="fade-up"><Breadcrumb current="Dashboard" /><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h1 className="heading text-3xl font-bold tracking-tight text-[#17324d]">Your team at a glance</h1><p className="mt-2 text-sm text-[#627d98]">A clear snapshot of your people and organization.</p></div><div className="flex items-center gap-2 text-xs font-semibold text-[#18794e]"><span className="size-2 rounded-full bg-[#2bb673]" /> Live workspace</div></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Total employees" value={stats.totalEmployees} icon={Users} note="Across all departments" /><StatCard label="Active employees" value={stats.activeEmployees} icon={UserCheck} accent="green" note="Currently on the team" /><StatCard label="Inactive employees" value={stats.inactiveEmployees} icon={UserRound} accent="coral" note="Not currently active" /><StatCard label="Departments" value={stats.totalDepartments} icon={Building2} accent="amber" note="Teams in your workspace" /></div><section className="mt-7 rounded-2xl border border-[#d9e2ec] bg-white shadow-[0_8px_24px_rgba(16,42,67,.04)]"><div className="flex items-center justify-between border-b border-[#edf2f7] px-6 py-5"><div><h2 className="heading font-bold text-[#17324d]">Recently added</h2><p className="mt-1 text-xs text-[#829ab1]">The latest people to join your directory</p></div><Link to="/employees" className="text-sm font-bold text-[#1e6fa8] hover:text-[#102a43]">View directory</Link></div>{stats.recentEmployees.length ? <div className="divide-y divide-[#edf2f7]">{stats.recentEmployees.map((employee) => <div key={employee._id} className="flex items-center justify-between gap-4 px-6 py-4"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-xl bg-[#e6eef5] text-xs font-bold text-[#1e4b6e]">{employee.firstName[0]}{employee.lastName[0]}</div><div><p className="text-sm font-bold text-[#17324d]">{employee.firstName} {employee.lastName}</p><p className="text-xs text-[#829ab1]">{employee.designation} · {employee.department}</p></div></div><StatusBadge status={employee.status} /></div>)}</div> : <p className="px-6 py-10 text-center text-sm text-[#829ab1]">No employees have been added yet.</p>}</section></div>;
}

function LoadingState() { return <div className="grid min-h-[50vh] place-items-center text-sm text-[#627d98]"><Activity className="animate-pulse" /> Loading workspace...</div>; }
function ErrorState({ message }) { return <div className="rounded-2xl border border-[#f2b8ae] bg-[#fff7f5] p-6 text-sm text-[#b53b2b]">{message}</div>; }
