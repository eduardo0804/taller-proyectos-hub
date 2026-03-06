"use client";

import { useState } from 'react';
import { Users, Star, ShieldCheck, Code2, Layout, Database } from "lucide-react";

interface Member {
  id: string;
  fullName: string;
  email: string | null;
  role: string;
  isGlobalLeader: boolean;
}

export default function TeamFilters({ members }: { members: Member[] }) {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Liderazgo', 'Desarrollo', 'Infraestructura', 'QA'];

  const filteredMembers = members.filter(m => {
    if (filter === 'Todos') return true;
    const role = m.role.toLowerCase();
    if (filter === 'Liderazgo') return m.isGlobalLeader || role.includes('líder');
    if (filter === 'Desarrollo') return role.includes('fullstack') || role.includes('back') || role.includes('front') || role.includes('team dev');
    if (filter === 'Infraestructura') return role.includes('devsecops') || role.includes('nube') || role.includes('arquitecto');
    if (filter === 'QA') return role.includes('qa');
    return true;
  });

  const getRoleIcon = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("líder") || r.includes("arquitecto")) return <ShieldCheck className="w-4 h-4 text-primary" />;
    if (r.includes("devsecops") || r.includes("back") || r.includes("nube")) return <Database className="w-4 h-4 text-blue-500" />;
    if (r.includes("front") || r.includes("ux")) return <Layout className="w-4 h-4 text-purple-500" />;
    return <Code2 className="w-4 h-4 text-gray-500" />;
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
              filter === cat 
                ? 'bg-primary text-white shadow-lg' 
                : 'bg-white text-secondary border border-gray-100 hover:border-primary/30'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {filteredMembers.map((member) => (
          <div key={member.id} className={`relative p-6 rounded-2xl border transition-all hover:shadow-xl group bg-white ${member.isGlobalLeader ? 'border-primary/20 bg-primary/[0.02]' : 'border-gray-100'}`}>
            {member.isGlobalLeader && (
              <div className="absolute -top-3 -right-2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg flex items-center">
                <Star className="w-3 h-3 mr-1 fill-white" /> GLOBAL LEADER
              </div>
            )}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-secondary/5 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-primary/10 transition-colors">
                <Users className="w-6 h-6 text-secondary/40 group-hover:text-primary transition-colors" />
              </div>
              <div className="flex-grow min-w-0">
                <h3 className="font-bold text-secondary text-lg truncate group-hover:text-primary transition-colors">{member.fullName}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500 font-medium italic">
                  {getRoleIcon(member.role)}
                  <span className="ml-2">{member.role}</span>
                </div>
                {member.email && <p className="mt-3 text-xs text-gray-400 truncate border-t border-gray-50 pt-3">{member.email.toLowerCase()}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}