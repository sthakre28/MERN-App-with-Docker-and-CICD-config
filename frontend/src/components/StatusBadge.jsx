export default function StatusBadge({ status }) {
  const active = status === 'Active';
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${active ? 'bg-[#e3f7ed] text-[#18794e]' : 'bg-[#f0f4f8] text-[#627d98]'}`}><span className={`size-1.5 rounded-full ${active ? 'bg-[#2bb673]' : 'bg-[#9fb3c8]'}`} />{status}</span>;
}
