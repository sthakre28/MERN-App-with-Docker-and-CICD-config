const accents = { navy: 'bg-[#e6eef5] text-[#1e4b6e]', green: 'bg-[#e3f7ed] text-[#18794e]', amber: 'bg-[#fff3d6] text-[#a15c00]', coral: 'bg-[#ffe9e5] text-[#b53b2b]' };

export default function StatCard({ label, value, icon: Icon, accent = 'navy', note }) {
  return <article className="rounded-2xl border border-[#d9e2ec] bg-white p-5 shadow-[0_8px_24px_rgba(16,42,67,.04)]"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-[#627d98]">{label}</p><p className="heading mt-3 text-3xl font-bold text-[#17324d]">{value}</p></div><div className={`grid size-11 place-items-center rounded-xl ${accents[accent]}`}><Icon size={21} /></div></div>{note && <p className="mt-4 text-xs text-[#829ab1]">{note}</p>}</article>;
}
