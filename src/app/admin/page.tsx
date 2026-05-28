import { TrendingUp, Users, Scissors, DollarSign, FileText } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-400">Resumen de hoy</div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Ventas hoy", val: "$1.250.000", sub: "12% vs ayer", icon: DollarSign, color: "#10B981" },
          { title: "Servicios hoy", val: "32", sub: "8% vs ayer", icon: Scissors, color: "#D4AF37" },
          { title: "Clientes hoy", val: "28", sub: "5% vs ayer", icon: Users, color: "#0EA5E9" },
          { title: "Ticket prom.", val: "$44.643", sub: "10% vs ayer", icon: TrendingUp, color: "#A855F7" }
        ].map((kpi, i) => (
          <div key={i} className="glass-panel p-5 relative overflow-hidden">
            <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider">{kpi.title}</h3>
            <p className="text-2xl font-bold mt-2 mb-1">{kpi.val}</p>
            <p className="text-xs" style={{ color: kpi.color }}>&#8593; {kpi.sub}</p>
            <kpi.icon size={48} className="absolute right-[-10px] bottom-[-10px] opacity-10" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agenda Rapida */}
        <div className="glass-panel p-6 lg:col-span-1">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">AGENDA RÁPIDA</h3>
            <button className="text-xs text-[#D4AF37] hover:underline">Ver agenda completa</button>
          </div>
          <div className="space-y-4">
            {[
              { time: "12:00 AM", name: "Santiago Muñoz", svc: "Corte", status: "Pendiente" },
              { time: "01:00 PM", name: "David Zapata", svc: "Corte + Barba", status: "Pendiente" },
              { time: "02:00 PM", name: "Andrés Felipe", svc: "Corte", status: "Pendiente" }
            ].map((app, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0">
                <div className="flex gap-4">
                  <span className="text-sm font-bold w-16">{app.time}</span>
                  <div>
                    <p className="text-sm font-bold">{app.name}</p>
                    <p className="text-xs text-gray-400">{app.svc}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded bg-[#D4AF37]/20 text-[#D4AF37] font-semibold">{app.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Accesos Rapidos */}
        <div className="glass-panel p-6 lg:col-span-1">
          <h3 className="font-bold mb-6">ACCESOS RÁPIDOS</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
              <Users size={24} className="text-[#0EA5E9] mb-2" />
              <span className="text-xs font-semibold">Registrar Cliente</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
              <DollarSign size={24} className="text-[#10B981] mb-2" />
              <span className="text-xs font-semibold">Nueva Venta</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
              <Scissors size={24} className="text-[#D4AF37] mb-2" />
              <span className="text-xs font-semibold">Buscar Cliente</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
              <FileText size={24} className="text-[#A855F7] mb-2" />
              <span className="text-xs font-semibold">Reportes del Día</span>
            </button>
          </div>
        </div>

        {/* Panel Super Admin Snippet */}
        <div className="glass-panel p-6 lg:col-span-1 border border-[#D4AF37]/30">
          <h3 className="font-bold text-[#D4AF37] mb-6">PANEL SUPER ADMINISTRADOR</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
             <div>
                <p className="text-xs text-gray-400">Usuarios</p>
                <p className="text-xl font-bold">24</p>
             </div>
             <div>
                <p className="text-xs text-gray-400">Barberos</p>
                <p className="text-xl font-bold">12</p>
             </div>
             <div>
                <p className="text-xs text-gray-400">Sucursales</p>
                <p className="text-xl font-bold">2</p>
             </div>
             <div>
                <p className="text-xs text-gray-400">Servicios</p>
                <p className="text-xl font-bold">15</p>
             </div>
          </div>
          <button className="w-full text-xs bg-[#D4AF37]/10 text-[#D4AF37] py-2 rounded font-semibold border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 transition">
            Configuración Global
          </button>
        </div>
      </div>
    </div>
  );
}
