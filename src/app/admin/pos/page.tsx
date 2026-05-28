import { Search, User, CreditCard, Ticket } from "lucide-react";

export default function AdminPOS() {
  return (
    <div className="flex h-full gap-6">
      {/* Left Column: Client & Cart */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Caja / POS</h1>
        </div>

        {/* Client Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar cliente por cédula o teléfono..." 
            className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>

        {/* Client Found Card */}
        <div className="glass-panel p-5 grid grid-cols-2 gap-6">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center shrink-0 border-2 border-[#D4AF37]">
               <User size={24} className="text-[#D4AF37]"/>
            </div>
            <div>
              <h3 className="font-bold">Juan Camilo Restrepo</h3>
              <p className="text-xs text-gray-400 mt-1">Cédula: 1.234.567.890</p>
              <p className="text-xs text-gray-400">Teléfono: 321 456 7890</p>
              <span className="inline-block mt-2 text-[10px] bg-[#0EA5E9]/20 text-[#0EA5E9] px-2 py-0.5 rounded font-bold">Cliente Registrado</span>
            </div>
          </div>
          <div className="flex flex-col justify-center border-l border-white/10 pl-6">
            <p className="text-sm font-semibold mb-1">Puntos disponibles</p>
            <p className="text-3xl font-bold text-[#D4AF37]">143 <span className="text-sm font-normal">pts</span></p>
            <p className="text-xs text-[#10B981] mt-1">Equivalente a $14.300</p>
            <button className="text-xs text-gray-400 mt-2 flex items-center gap-1 hover:text-white transition"><Ticket size={12}/> Ver historial</button>
          </div>
        </div>

        {/* Cart */}
        <div className="glass-panel overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/40 border-b border-white/5 text-xs text-gray-400">
              <tr>
                <th className="p-4 font-semibold uppercase">Servicio / Producto</th>
                <th className="p-4 font-semibold uppercase">Precio</th>
                <th className="p-4 font-semibold uppercase">Cant.</th>
                <th className="p-4 font-semibold uppercase text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "Corte de Cabello", price: 30000 },
                { name: "Barba", price: 20000 },
                { name: "Lavado Capilar", price: 10000 }
              ].map((item, i) => (
                <tr key={i} className="hover:bg-white/5 transition">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                    <span className="font-semibold">{item.name}</span>
                  </td>
                  <td className="p-4">${item.price.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded w-fit border border-white/10">
                      <button className="text-gray-400 hover:text-white">-</button>
                      <span className="w-4 text-center text-xs">1</span>
                      <button className="text-gray-400 hover:text-white">+</button>
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold">${item.price.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t border-white/5">
            <button className="text-xs text-[#D4AF37] font-semibold border border-[#D4AF37]/30 px-3 py-1.5 rounded hover:bg-[#D4AF37]/10 transition">+ Agregar producto</button>
          </div>
        </div>

        {/* Barbero Asignado */}
        <div className="glass-panel p-5">
           <h4 className="text-sm font-semibold mb-4">Barbero asignado</h4>
           <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-gray-800 rounded-full"></div>
             <div>
               <h3 className="font-bold">Andrés Díaz</h3>
               <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded font-bold flex items-center gap-1 w-fit mt-1"><Star size={10}/> Barbero</span>
             </div>
           </div>
        </div>

      </div>

      {/* Right Column: Checkout Summary */}
      <div className="w-[340px] shrink-0 space-y-6">
         <div className="glass-panel p-6">
           <h3 className="font-bold mb-6 border-b border-white/10 pb-4">DETALLE DE PAGO</h3>
           
           <div className="space-y-3 text-sm mb-6 border-b border-white/10 pb-6">
             <div className="flex justify-between">
               <span className="text-gray-400">Subtotal</span>
               <span className="font-semibold">$ 60.000</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-400">Descuento</span>
               <span className="font-semibold">$ 0</span>
             </div>
             <div className="flex justify-between">
               <span className="text-[#10B981]">Redención puntos</span>
               <span className="font-semibold text-[#10B981]">- $ 10.000</span>
             </div>
           </div>

           <div className="flex justify-between items-center mb-8">
             <span className="font-bold">TOTAL A PAGAR</span>
             <span className="text-3xl font-bold text-[#D4AF37]">$ 50.000</span>
           </div>

           <h3 className="font-bold text-xs uppercase text-gray-400 tracking-wider mb-3">MÉTODO DE PAGO</h3>
           <div className="grid grid-cols-2 gap-3 mb-6">
             <button className="flex items-center gap-2 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] p-3 rounded-lg text-xs font-bold transition">
               <CreditCard size={14}/> Efectivo
             </button>
             <button className="flex items-center gap-2 border border-white/10 bg-black/40 hover:bg-white/5 text-gray-300 p-3 rounded-lg text-xs font-bold transition">
               Transferencia
             </button>
             <button className="flex items-center gap-2 border border-white/10 bg-black/40 hover:bg-white/5 text-gray-300 p-3 rounded-lg text-xs font-bold transition">
               Tarjeta
             </button>
             <button className="flex items-center gap-2 border border-white/10 bg-black/40 hover:bg-white/5 text-gray-300 p-3 rounded-lg text-xs font-bold transition">
               Mixto
             </button>
           </div>

           <div className="form-group">
             <label className="text-xs uppercase">Efectivo Recibido</label>
             <input type="text" value="$ 50.000" className="w-full bg-black/40 border border-white/10 rounded p-3 font-bold text-lg focus:outline-none mt-2" readOnly />
           </div>

           <div className="flex justify-between items-center my-4 text-sm">
             <span className="text-gray-400">CAMBIO</span>
             <span className="font-bold text-[#10B981]">$ 0</span>
           </div>

           <button className="w-full bg-[#D4AF37] hover:bg-[#F3CF65] text-black font-bold py-4 rounded-xl transition shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-4">
             COBRAR Y FINALIZAR
           </button>
         </div>
      </div>
    </div>
  );
}
