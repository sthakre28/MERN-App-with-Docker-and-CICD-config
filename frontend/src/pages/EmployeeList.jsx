import { useEffect, useState } from 'react';
import { Filter, Search, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmployeeTable from '../components/EmployeeTable.jsx';
import { employeeService } from '../services/api.js';
import { Breadcrumb } from '../layouts/AppLayout.jsx';

const departments = ['Engineering', 'Human Resources', 'Finance', 'Marketing', 'Operations'];

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({ search: '', department: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => { setLoading(true); employeeService.list(filters).then(setEmployees).catch(() => setError('Could not load employees. Is the API running?')).finally(() => setLoading(false)); }, [filters]);
  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));
  const handleDelete = async (employee) => { if (!window.confirm(`Delete ${employee.firstName} ${employee.lastName}? This cannot be undone.`)) return; try { await employeeService.remove(employee._id); setEmployees((current) => current.filter((item) => item._id !== employee._id)); } catch { setError('Unable to delete this employee.'); } };
  return <div className="fade-up"><Breadcrumb current="Employees" /><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><h1 className="heading text-3xl font-bold tracking-tight text-[#17324d]">Employee directory</h1><p className="mt-2 text-sm text-[#627d98]">Manage your team, roles, and employment details.</p></div><Link to="/employees/new" className="flex items-center gap-2 rounded-xl bg-[#102a43] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#173b5b]"><UserPlus size={17} /> Add employee</Link></div>{error && <p className="mb-4 rounded-xl bg-[#fff7f5] px-4 py-3 text-sm text-[#b53b2b]">{error}</p>}<section className="overflow-hidden rounded-2xl border border-[#d9e2ec] bg-white shadow-[0_8px_24px_rgba(16,42,67,.04)]"><div className="flex flex-wrap gap-3 border-b border-[#edf2f7] p-4"><div className="relative min-w-[220px] flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9fb3c8]" /><input aria-label="Search employees" value={filters.search} onChange={(event) => updateFilter('search', event.target.value)} placeholder="Search by name or ID" className="w-full rounded-xl border border-[#d9e2ec] py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#1e6fa8] focus:ring-2 focus:ring-[#d9eaf7]" /></div><div className="flex items-center gap-2 text-[#829ab1]"><Filter size={16} /><select aria-label="Filter by department" value={filters.department} onChange={(event) => updateFilter('department', event.target.value)} className="rounded-xl border border-[#d9e2ec] bg-white px-3 py-2.5 text-sm text-[#486581] outline-none"><option value="">All departments</option>{departments.map((department) => <option key={department}>{department}</option>)}</select><select aria-label="Filter by status" value={filters.status} onChange={(event) => updateFilter('status', event.target.value)} className="rounded-xl border border-[#d9e2ec] bg-white px-3 py-2.5 text-sm text-[#486581] outline-none"><option value="">All status</option><option>Active</option><option>Inactive</option></select></div></div>{loading ? <div className="px-6 py-16 text-center text-sm text-[#627d98]">Loading employees...</div> : <EmployeeTable employees={employees} onDelete={handleDelete} />}</section></div>;
}
