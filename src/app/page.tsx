"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Phone, CheckCircle, Calendar, Clock, Shield, Star, Edit3 } from "lucide-react";

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    isNew: "yes",
    serviceId: null as number | null,
    barberId: null as number | null,
    date: null as string | null,
    time: null as string | null,
  });

  const services = [
    { id: 1, name: "CORTE DE CABELLO", desc: "Corte clásico o moderno. Incluye lavado y peinado", price: 30000, duration: 45, img: "/placeholder.jpg" },
    { id: 2, name: "BARBA", desc: "Perfilado y arreglo de barba. Incluye toallas calientes", price: 20000, duration: 30, img: "/placeholder.jpg" },
    { id: 3, name: "CORTE + BARBA", desc: "Corte de cabello + perfilado de barba", price: 45000, duration: 60, img: "/placeholder.jpg" },
    { id: 4, name: "CORTE NIÑO", desc: "Corte para niños (hasta 12 años). Incluye lavado", price: 25000, duration: 30, img: "/placeholder.jpg" }
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)", color: "var(--text-primary)" }}>
      {/* Header */}
      <header className="flex items-center justify-between py-4 px-8 border-b" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(7,7,9,0.8)" }}>
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Vintage Barber" width={120} height={40} className="object-contain" />
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-wider text-gray-400">
          <Link href="#" className="hover:text-white transition">INICIO</Link>
          <Link href="#" className="hover:text-white transition">SERVICIOS</Link>
          <Link href="#" className="hover:text-white transition">BARBEROS</Link>
          <Link href="#" className="text-[#D4AF37]">AGENDAR CITA</Link>
        </nav>
        <div className="flex items-center gap-2 text-sm">
          <Phone size={16} className="text-[#10B981]" />
          <span>+57 300 123 4567</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Steps */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="glass-panel p-6 mb-6">
            <h2 className="text-xl font-bold flex items-center gap-3 mb-2">
              <span className="text-[#D4AF37]">1.</span> TUS DATOS
            </h2>
            <p className="text-sm text-gray-400 mb-6">Completa tus datos para apartar tu cita</p>

            <div className="space-y-4">
              <div className="form-group">
                <label>Nombre completo</label>
                <input 
                  type="text" 
                  placeholder="Ej: Juan Camilo Ramírez" 
                  value={formData.nombre}
                  onChange={e => setFormData({...formData, nombre: e.target.value})}
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </div>
              <div className="form-group">
                <label>Número de teléfono</label>
                <input 
                  type="tel" 
                  placeholder="Ej: 300 123 4567" 
                  value={formData.telefono}
                  onChange={e => setFormData({...formData, telefono: e.target.value})}
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <small className="text-gray-500 mt-1 flex items-center gap-1"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width={12} /> Te enviaremos la confirmación por WhatsApp</small>
              </div>

              <div className="mt-4">
                <label className="mb-2 block">¿Eres nuevo cliente?</label>
                <div className="flex flex-col gap-2">
                  <label className="checkbox-label cursor-pointer flex items-center gap-2">
                    <input type="radio" name="isNew" checked={formData.isNew === 'yes'} onChange={() => setFormData({...formData, isNew: 'yes'})} />
                    <span className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center">
                      {formData.isNew === 'yes' && <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>}
                    </span>
                    Sí, es mi primera vez
                  </label>
                  <label className="checkbox-label cursor-pointer flex items-center gap-2">
                    <input type="radio" name="isNew" checked={formData.isNew === 'no'} onChange={() => setFormData({...formData, isNew: 'no'})} />
                    <span className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center">
                      {formData.isNew === 'no' && <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>}
                    </span>
                    No, ya he venido antes
                  </label>
                </div>
              </div>

              <button className="btn btn-primary w-full mt-6 py-3" onClick={() => setStep(2)}>
                CONTINUAR
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {[2, 3, 4, 5].map(s => (
              <div key={s} className="flex items-center gap-3 px-4 py-3 opacity-50 cursor-not-allowed">
                <span className="text-[#D4AF37] font-bold">{s}.</span>
                <span className="uppercase text-sm tracking-wide">
                  {s === 2 ? "SELECCIONA SERVICIO" : s === 3 ? "ELIGE BARBERO" : s === 4 ? "FECHA Y HORA" : "CONFIRMACIÓN"}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Center Content */}
        <section className="lg:col-span-6">
          <div className="glass-panel p-6 h-full">
            <h2 className="text-xl font-bold mb-1 text-center">¿QUÉ SERVICIO DESEAS?</h2>
            <p className="text-sm text-gray-400 text-center mb-8">Selecciona el servicio que deseas agendar</p>

            <div className="space-y-4">
              {services.map(srv => (
                <div 
                  key={srv.id}
                  onClick={() => setFormData({...formData, serviceId: srv.id})}
                  className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300"
                  style={{ 
                    border: formData.serviceId === srv.id ? "1px solid #D4AF37" : "1px solid rgba(255,255,255,0.05)",
                    background: formData.serviceId === srv.id ? "rgba(212,175,55,0.05)" : "rgba(0,0,0,0.3)"
                  }}
                >
                  <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-gray-500">Img</div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{srv.name}</h4>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">{srv.desc}</p>
                    <p className="text-[#D4AF37] font-bold mt-2">${srv.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 w-16">
                    {formData.serviceId === srv.id ? (
                       <CheckCircle className="text-[#D4AF37] mb-2" size={24} />
                    ) : (
                       <div className="w-6 h-6 rounded-full border border-gray-600 mb-2"></div>
                    )}
                    <span className="text-xs text-gray-400">{srv.duration} min</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center text-xs text-gray-500 flex items-center justify-center gap-2 border-t border-white/5 pt-4">
              <span className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px]">i</span>
              El tiempo estimado puede variar según el servicio y la disponibilidad.
            </div>
          </div>
        </section>

        {/* Right Sidebar - Summary */}
        <aside className="lg:col-span-3">
          <div className="glass-panel p-6 sticky top-24">
            <h3 className="font-bold flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
              <Calendar size={18} className="text-[#D4AF37]" /> TU RESERVA
            </h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold">Servicio seleccionado</span>
                  <button className="text-xs text-[#D4AF37] flex items-center gap-1 hover:underline"><Edit3 size={12}/> Cambiar</button>
                </div>
                {formData.serviceId ? (
                  <div className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-gray-800 rounded"></div>
                    <div>
                      <p className="font-bold text-sm">{services.find(s => s.id === formData.serviceId)?.name}</p>
                      <p className="text-[#D4AF37] font-bold text-sm">${services.find(s => s.id === formData.serviceId)?.price.toLocaleString()}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">Ningún servicio seleccionado</p>
                )}
              </div>

              <div className="space-y-2 text-sm border-t border-white/5 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duración estimada</span>
                  <span>{formData.serviceId ? services.find(s => s.id === formData.serviceId)?.duration + ' minutos' : '---'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Barbero</span>
                  <span>{formData.barberId ? 'Seleccionado' : 'Por asignar'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fecha</span>
                  <span>{formData.date || 'Por seleccionar'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hora</span>
                  <span>{formData.time || 'Por seleccionar'}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/5 pt-4">
                <span className="font-bold">Total</span>
                <span className="text-[#D4AF37] font-bold text-xl">
                  ${formData.serviceId ? services.find(s => s.id === formData.serviceId)?.price.toLocaleString() : '0'}
                </span>
              </div>

              <div className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                <Clock className="text-[#D4AF37] shrink-0" size={24} />
                <div>
                  <p className="text-xs text-gray-400">Tiempo estimado total</p>
                  <p className="font-bold">{formData.serviceId ? services.find(s => s.id === formData.serviceId)?.duration : 0} minutos</p>
                  <p className="text-[10px] text-gray-500">Desde la hora de tu cita</p>
                </div>
              </div>

              <div className="flex items-start gap-2 mt-4 text-xs text-gray-400">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width={16} className="mt-1" />
                <p>Te enviaremos la confirmación y recordatorios por WhatsApp</p>
              </div>
            </div>
          </div>
        </aside>

      </main>

      {/* Footer Highlights */}
      <div className="border-t border-white/5 bg-[#0a0a0c] mt-auto">
        <div className="max-w-7xl mx-auto w-full p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex items-center gap-4">
            <Calendar size={32} className="text-[#D4AF37]" />
            <div>
              <h4 className="font-bold text-sm mb-1">FÁCIL Y RÁPIDO</h4>
              <p className="text-xs text-gray-400">Agenda tu cita en menos de 2 minutos</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Clock size={32} className="text-[#D4AF37]" />
            <div>
              <h4 className="font-bold text-sm mb-1">RECORDATORIOS</h4>
              <p className="text-xs text-gray-400">Te recordamos tu cita por WhatsApp</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-[#D4AF37]" />
            <div>
              <h4 className="font-bold text-sm mb-1">SIN COMPROMISO</h4>
              <p className="text-xs text-gray-400">Puedes reprogramar o cancelar fácilmente</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Star size={32} className="text-[#D4AF37]" />
            <div>
              <h4 className="font-bold text-sm mb-1">MEJOR SERVICIO</h4>
              <p className="text-xs text-gray-400">Barberos profesionales y ambiente premium</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
