"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { 
  LayoutDashboard, CreditCard, Calendar, Users, Scissors, 
  Tags, ShoppingBag, BarChart3, Star, FileText, Settings, 
  LogOut, MapPin, Bell, Moon
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeRoute, setActiveRoute] = useState("dashboard");

  const navItems = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "pos", name: "Caja / POS", icon: CreditCard },
    { id: "agenda", name: "Agenda", icon: Calendar },
    { id: "clientes", name: "Clientes", icon: Users },
    { id: "barberos", name: "Barberos", icon: Scissors },
    { id: "servicios", name: "Servicios", icon: Tags },
    { id: "productos", name: "Productos", icon: ShoppingBag },
    { id: "ventas", name: "Ventas", icon: BarChart3 },
    { id: "fidelizacion", name: "Fidelización", icon: Star },
    { id: "reportes", name: "Reportes", icon: FileText },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-main)", color: "var(--text-primary)" }}>
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 border-r flex flex-col transition-all" style={{ background: "rgba(12,12,17,0.95)", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="p-4 flex items-center justify-center border-b border-white/5 mb-4">
          <Image src="/logo.png" alt="Vintage Barber" width={140} height={50} className="object-contain" />
        </div>
        
        <div className="px-4 pb-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Principal</div>
        
        <nav className="flex-1 overflow-y-auto px-2 space-y-1">
          {navItems.map(item => (
            <Link 
              key={item.id} 
              href={`/admin/${item.id === 'dashboard' ? '' : item.id}`}
              onClick={() => setActiveRoute(item.id)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{
                color: activeRoute === item.id ? "#fff" : "var(--text-secondary)",
                background: activeRoute === item.id ? "rgba(255,255,255,0.08)" : "transparent",
                borderLeft: activeRoute === item.id ? "3px solid var(--color-gold)" : "3px solid transparent",
                fontWeight: activeRoute === item.id ? "600" : "500"
              }}
            >
              <item.icon size={18} style={{ color: activeRoute === item.id ? "var(--color-gold)" : "inherit" }} />
              {item.name}
            </Link>
          ))}

          <div className="pt-6 pb-2 px-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Configuración</div>
          
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={18} /> Ajustes
          </Link>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-white/5 mt-auto bg-black/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-bold text-xs">SA</div>
            <div>
              <p className="text-xs font-bold text-white">Super Administrador</p>
              <p className="text-[10px] text-[#10B981] flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#10B981] inline-block"></span> Online</p>
            </div>
          </div>
          <button className="text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-14 shrink-0 flex items-center justify-between px-6 border-b" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(7,7,9,0.8)" }}>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} />
            <span>Sucursal Centro</span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <button className="relative hover:text-white transition">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="hover:text-white transition">
              <Moon size={20} />
            </button>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
