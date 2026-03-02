import {ReactNode} from "react";

type StatCardProps = {
    title: string;
    value: string | number;
    icon: ReactNode;
    color: string;
};

export default function StatCard({ title, value, icon, color }: StatCardProps) {
    return (
        <div className="bg-zinc-900/50 border border-white/5 p-6 hover:border-white/10 transition-colors group">
            <div className="flex items-center justify-between mb-4">
                <span className={`p-2 bg-zinc-950 rounded-sm border border-white/5 ${color} group-hover:scale-110 transition-transform`}>
                    {icon}
                </span>
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-tighter">Live</span>
            </div>
            <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">{title}</p>
            <p className="text-2xl font-black italic uppercase text-white tracking-tighter">{value}</p>
        </div>
    );
}