"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Phone, CheckCircle, Calendar, Clock, Shield, Star, Edit3, ChevronRight } from "lucide-react";

const services = [
  { id: 1, name: "CORTE DE CABELLO", desc: "Corte clásico o moderno. Incluye lavado y peinado", price: 30000, duration: 45, icon: "✂️" },
  { id: 2, name: "BARBA", desc: "Perfilado y arreglo de barba. Incluye toallas calientes", price: 20000, duration: 30, icon: "🪒" },
  { id: 3, name: "CORTE + BARBA", desc: "Corte de cabello + perfilado de barba profesional", price: 45000, duration: 60, icon: "💈" },
  { id: 4, name: "CORTE NIÑO", desc: "Corte para niños (hasta 12 años). Incluye lavado", price: 25000, duration: 30, icon: "👦" },
];

const barbers = [
  { id: 1, name: "Carlos V.", specialty: "Cortes clásicos", rating: 4.9 },
  { id: 2, name: "Miguel R.", specialty: "Barbas & diseños", rating: 4.8 },
  { id: 3, name: "Luis P.", specialty: "Cortes modernos", rating: 4.7 },
];

const STEP_LABELS = ["TUS DATOS", "SERVICIO", "BARBERO", "FECHA Y HORA", "CONFIRMACIÓN"];

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

  const selectedService = services.find((s) => s.id === formData.serviceId);
  const selectedBarber = barbers.find((b) => b.id === formData.barberId);

  // Generate next 7 days
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      iso: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("es-CO", { weekday: "short", day: "numeric", month: "short" }),
    };
  });

  const times = ["09:00", "09:45", "10:30", "11:15", "12:00", "14:00", "14:45", "15:30", "16:15", "17:00"];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-main)", color: "var(--text-primary)" }}>
      {/* ─── HEADER ─── */}
      <header
        className="flex items-center justify-between px-6 md:px-10 sticky top-0 z-50"
        style={{
          background: "rgba(7,7,9,0.9)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(16px)",
          height: "64px",
        }}
      >
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Vintage Barber" width={110} height={36} className="object-contain" />
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-semibold tracking-widest">
          {["INICIO", "SERVICIOS", "BARBEROS"].map((item) => (
            <Link
              key={item}
              href="#"
              className="transition-colors duration-200"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {item}
            </Link>
          ))}
          <Link href="#" style={{ color: "var(--color-gold)" }}>
            AGENDAR
          </Link>
        </nav>
        <a
          href="tel:+573001234567"
          className="flex items-center gap-2 text-sm font-medium transition-all hover:scale-105"
          style={{ color: "var(--color-success)" }}
        >
          <Phone size={15} />
          <span>+57 300 123 4567</span>
        </a>
      </header>

      {/* ─── HERO STRIP ─── */}
      <div
        className="text-center py-8 px-4"
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p className="text-xs tracking-[4px] uppercase mb-2" style={{ color: "var(--color-gold)" }}>
          Reserva Online
        </p>
        <h1
          className="text-2xl md:text-3xl font-black uppercase tracking-wide"
          style={{ fontFamily: "var(--font-montserrat, Montserrat), sans-serif" }}
        >
          Agenda tu cita en{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--color-gold), #fff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            minutos
          </span>
        </h1>
      </div>

      {/* ─── MAIN LAYOUT ─── */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT: Steps navigation ── */}
        <aside className="lg:col-span-3 space-y-3">
          {/* Step 1 panel */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(18,18,24,0.7)",
              border: step === 1 ? "1px solid rgba(212,175,55,0.4)" : "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h2 className="text-lg font-black flex items-center gap-2 mb-1 uppercase tracking-wide">
              <span style={{ color: "var(--color-gold)" }}>1.</span> Tus Datos
            </h2>
            <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
              Completa tus datos para apartar tu cita
            </p>

            <div style={{ marginBottom: "1rem" }}>
              <label
                className="block text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Nombre completo
              </label>
              <input
                type="text"
                placeholder="Ej: Juan Camilo Ramírez"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-sm transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(212,175,55,0.5)";
                  e.target.style.background = "rgba(255,255,255,0.07)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.background = "rgba(255,255,255,0.04)";
                }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label
                className="block text-xs font-bold mb-2 uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                Número de teléfono
              </label>
              <input
                type="tel"
                placeholder="Ej: 300 123 4567"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full rounded-lg px-3 py-2.5 text-sm transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  outline: "none",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(212,175,55,0.5)";
                  e.target.style.background = "rgba(255,255,255,0.07)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.background = "rgba(255,255,255,0.04)";
                }}
              />
              <p className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="inline-block w-3 h-3 rounded-full bg-green-500 shrink-0" />
                Te enviaremos la confirmación por WhatsApp
              </p>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                className="block text-xs font-bold mb-3 uppercase tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                ¿Eres nuevo cliente?
              </label>
              <div className="flex flex-col gap-2.5">
                {[
                  { value: "yes", label: "Sí, es mi primera vez" },
                  { value: "no", label: "No, ya he venido antes" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => setFormData({ ...formData, isNew: value })}
                  >
                    <div
                      className="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-all"
                      style={{
                        borderColor:
                          formData.isNew === value ? "var(--color-gold)" : "rgba(255,255,255,0.2)",
                        background: formData.isNew === value ? "rgba(212,175,55,0.1)" : "transparent",
                      }}
                    >
                      {formData.isNew === value && (
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: "var(--color-gold)" }}
                        />
                      )}
                    </div>
                    <span className="text-sm" style={{ color: formData.isNew === value ? "#fff" : "var(--text-secondary)" }}>
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300"
              style={{
                background: "var(--color-gold)",
                color: "#0a0a0c",
                boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--color-gold-hover)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(212,175,55,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--color-gold)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(212,175,55,0.3)";
              }}
              onClick={() => setStep(2)}
            >
              Continuar <ChevronRight size={16} />
            </button>
          </div>

          {/* Steps 2-5 list */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: "rgba(18,18,24,0.5)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {STEP_LABELS.slice(1).map((label, i) => {
              const s = i + 2;
              const done = step > s;
              const active = step === s;
              return (
                <div
                  key={s}
                  className="flex items-center gap-3 py-3 px-2 rounded-lg transition-all"
                  style={{
                    borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    opacity: active ? 1 : done ? 0.9 : 0.4,
                    cursor: done ? "pointer" : "default",
                  }}
                  onClick={() => done && setStep(s)}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      background: done
                        ? "rgba(16,185,129,0.15)"
                        : active
                        ? "rgba(212,175,55,0.15)"
                        : "rgba(255,255,255,0.05)",
                      border: done
                        ? "1px solid rgba(16,185,129,0.4)"
                        : active
                        ? "1px solid rgba(212,175,55,0.4)"
                        : "1px solid rgba(255,255,255,0.1)",
                      color: done ? "var(--color-success)" : active ? "var(--color-gold)" : "var(--text-muted)",
                    }}
                  >
                    {done ? "✓" : s}
                  </div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: active ? "#fff" : done ? "var(--color-success)" : "var(--text-muted)" }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── CENTER: Step content ── */}
        <section className="lg:col-span-6">
          <div
            className="rounded-2xl p-6 h-full"
            style={{
              background: "rgba(18,18,24,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* STEP 1 - Datos (shown in aside on desktop) */}
            {step === 1 && (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6"
                  style={{ background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)" }}
                >
                  💈
                </div>
                <h2 className="text-xl font-black uppercase tracking-wide mb-2">Bienvenido a Vintage Barber</h2>
                <p className="text-sm max-w-xs" style={{ color: "var(--text-muted)" }}>
                  Completa tus datos en el panel izquierdo para comenzar tu reserva premium.
                </p>
              </div>
            )}

            {/* STEP 2 - Servicio */}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-black uppercase tracking-wide mb-1">¿Qué servicio deseas?</h2>
                <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
                  Selecciona el servicio que deseas agendar
                </p>
                <div className="space-y-3">
                  {services.map((srv) => {
                    const selected = formData.serviceId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        onClick={() => setFormData({ ...formData, serviceId: srv.id })}
                        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 group"
                        style={{
                          border: selected
                            ? "1px solid rgba(212,175,55,0.5)"
                            : "1px solid rgba(255,255,255,0.06)",
                          background: selected ? "rgba(212,175,55,0.06)" : "rgba(0,0,0,0.25)",
                        }}
                        onMouseEnter={(e) => {
                          if (!selected)
                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.12)";
                        }}
                        onMouseLeave={(e) => {
                          if (!selected)
                            (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                        }}
                      >
                        {/* Icon */}
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0 transition-all"
                          style={{
                            background: selected ? "rgba(212,175,55,0.12)" : "rgba(255,255,255,0.04)",
                            border: selected
                              ? "1px solid rgba(212,175,55,0.3)"
                              : "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {srv.icon}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm">{srv.name}</h4>
                          <p className="text-xs mt-0.5 truncate" style={{ color: "var(--text-muted)" }}>
                            {srv.desc}
                          </p>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-sm font-bold" style={{ color: "var(--color-gold)" }}>
                              ${srv.price.toLocaleString("es-CO")}
                            </span>
                            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                              · {srv.duration} min
                            </span>
                          </div>
                        </div>

                        {/* Selector */}
                        <div
                          className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all"
                          style={{
                            borderColor: selected ? "var(--color-gold)" : "rgba(255,255,255,0.2)",
                            background: selected ? "rgba(212,175,55,0.2)" : "transparent",
                          }}
                        >
                          {selected && <CheckCircle size={14} style={{ color: "var(--color-gold)" }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  disabled={!formData.serviceId}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300"
                  style={{
                    background: formData.serviceId ? "var(--color-gold)" : "rgba(255,255,255,0.06)",
                    color: formData.serviceId ? "#0a0a0c" : "var(--text-muted)",
                    cursor: formData.serviceId ? "pointer" : "not-allowed",
                  }}
                  onClick={() => formData.serviceId && setStep(3)}
                >
                  Elegir Barbero <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 3 - Barbero */}
            {step === 3 && (
              <div>
                <h2 className="text-lg font-black uppercase tracking-wide mb-1">Elige tu Barbero</h2>
                <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
                  Selecciona el barbero de tu preferencia
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {barbers.map((barber) => {
                    const selected = formData.barberId === barber.id;
                    return (
                      <div
                        key={barber.id}
                        onClick={() => setFormData({ ...formData, barberId: barber.id })}
                        className="flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all"
                        style={{
                          border: selected
                            ? "1px solid rgba(212,175,55,0.5)"
                            : "1px solid rgba(255,255,255,0.06)",
                          background: selected ? "rgba(212,175,55,0.06)" : "rgba(0,0,0,0.25)",
                        }}
                      >
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black shrink-0"
                          style={{
                            background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))",
                            border: "1px solid rgba(212,175,55,0.2)",
                            color: "var(--color-gold)",
                          }}
                        >
                          {barber.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold">{barber.name}</h4>
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                            {barber.specialty}
                          </p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={11} fill="#D4AF37" style={{ color: "var(--color-gold)" }} />
                            <span className="text-xs font-semibold" style={{ color: "var(--color-gold)" }}>
                              {barber.rating}
                            </span>
                          </div>
                        </div>
                        <div
                          className="w-6 h-6 rounded-full border flex items-center justify-center"
                          style={{
                            borderColor: selected ? "var(--color-gold)" : "rgba(255,255,255,0.2)",
                            background: selected ? "rgba(212,175,55,0.2)" : "transparent",
                          }}
                        >
                          {selected && <CheckCircle size={14} style={{ color: "var(--color-gold)" }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  disabled={!formData.barberId}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all"
                  style={{
                    background: formData.barberId ? "var(--color-gold)" : "rgba(255,255,255,0.06)",
                    color: formData.barberId ? "#0a0a0c" : "var(--text-muted)",
                    cursor: formData.barberId ? "pointer" : "not-allowed",
                  }}
                  onClick={() => formData.barberId && setStep(4)}
                >
                  Elegir Fecha y Hora <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 4 - Fecha y Hora */}
            {step === 4 && (
              <div>
                <h2 className="text-lg font-black uppercase tracking-wide mb-1">Fecha y Hora</h2>
                <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
                  Selecciona cuándo quieres tu cita
                </p>

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-secondary)" }}>
                    Fecha
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.iso}
                        onClick={() => setFormData({ ...formData, date: d.iso })}
                        className="p-2 rounded-lg text-center transition-all text-xs"
                        style={{
                          border:
                            formData.date === d.iso
                              ? "1px solid rgba(212,175,55,0.5)"
                              : "1px solid rgba(255,255,255,0.06)",
                          background: formData.date === d.iso ? "rgba(212,175,55,0.08)" : "rgba(0,0,0,0.3)",
                          color: formData.date === d.iso ? "var(--color-gold)" : "var(--text-secondary)",
                        }}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-secondary)" }}>
                    Hora
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setFormData({ ...formData, time: t })}
                        className="p-2 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          border:
                            formData.time === t
                              ? "1px solid rgba(212,175,55,0.5)"
                              : "1px solid rgba(255,255,255,0.06)",
                          background: formData.time === t ? "rgba(212,175,55,0.08)" : "rgba(0,0,0,0.3)",
                          color: formData.time === t ? "var(--color-gold)" : "var(--text-secondary)",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={!formData.date || !formData.time}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all"
                  style={{
                    background: formData.date && formData.time ? "var(--color-gold)" : "rgba(255,255,255,0.06)",
                    color: formData.date && formData.time ? "#0a0a0c" : "var(--text-muted)",
                    cursor: formData.date && formData.time ? "pointer" : "not-allowed",
                  }}
                  onClick={() => formData.date && formData.time && setStep(5)}
                >
                  Ver Confirmación <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* STEP 5 - Confirmación */}
            {step === 5 && (
              <div className="text-center">
                <div
                  className="w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                  style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)" }}
                >
                  <CheckCircle size={32} style={{ color: "var(--color-success)" }} />
                </div>
                <h2 className="text-xl font-black uppercase tracking-wide mb-2">¡Todo listo!</h2>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                  Revisa los detalles de tu cita antes de confirmar
                </p>

                <div
                  className="text-left rounded-xl p-5 space-y-3 mb-6"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {[
                    { label: "Cliente", value: formData.nombre || "—" },
                    { label: "Teléfono", value: formData.telefono || "—" },
                    { label: "Servicio", value: selectedService?.name || "—" },
                    { label: "Barbero", value: selectedBarber?.name || "—" },
                    {
                      label: "Fecha",
                      value: formData.date
                        ? new Date(formData.date).toLocaleDateString("es-CO", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "—",
                    },
                    { label: "Hora", value: formData.time || "—" },
                    {
                      label: "Total",
                      value: selectedService ? `$${selectedService.price.toLocaleString("es-CO")}` : "—",
                      gold: true,
                    },
                  ].map(({ label, value, gold }) => (
                    <div key={label} className="flex justify-between items-center text-sm">
                      <span style={{ color: "var(--text-muted)" }}>{label}</span>
                      <span className="font-semibold" style={{ color: gold ? "var(--color-gold)" : "#fff" }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full py-3.5 rounded-xl text-sm font-black uppercase tracking-widest transition-all"
                  style={{ background: "var(--color-gold)", color: "#0a0a0c" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--color-gold-hover)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "var(--color-gold)")}
                >
                  ✓ Confirmar Cita
                </button>
                <button
                  className="mt-3 w-full py-2.5 rounded-xl text-xs font-semibold transition-all"
                  style={{
                    background: "transparent",
                    color: "var(--text-muted)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onClick={() => setStep(1)}
                >
                  Editar reserva
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ── RIGHT: Summary sidebar ── */}
        <aside className="lg:col-span-3">
          <div
            className="rounded-2xl p-5 sticky top-24"
            style={{
              background: "rgba(18,18,24,0.7)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
            }}
          >
            <h3 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 mb-5 pb-4"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Calendar size={16} style={{ color: "var(--color-gold)" }} />
              Tu Reserva
            </h3>

            <div className="space-y-4">
              {/* Selected Service */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                    Servicio
                  </p>
                  {formData.serviceId && (
                    <button
                      className="text-xs flex items-center gap-1 transition-all"
                      style={{ color: "var(--color-gold)" }}
                      onClick={() => setStep(2)}
                    >
                      <Edit3 size={10} /> Cambiar
                    </button>
                  )}
                </div>
                {selectedService ? (
                  <div
                    className="flex gap-3 items-center p-3 rounded-xl"
                    style={{ background: "rgba(212,175,55,0.05)", border: "1px solid rgba(212,175,55,0.15)" }}
                  >
                    <span className="text-xl">{selectedService.icon}</span>
                    <div>
                      <p className="font-bold text-xs">{selectedService.name}</p>
                      <p className="text-xs font-bold" style={{ color: "var(--color-gold)" }}>
                        ${selectedService.price.toLocaleString("es-CO")}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>
                    Sin seleccionar
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2.5 text-xs pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                {[
                  { label: "Duración", value: selectedService ? `${selectedService.duration} min` : "—" },
                  { label: "Barbero", value: selectedBarber?.name || "Por asignar" },
                  {
                    label: "Fecha",
                    value: formData.date
                      ? new Date(formData.date).toLocaleDateString("es-CO", { day: "numeric", month: "short" })
                      : "—",
                  },
                  { label: "Hora", value: formData.time || "—" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span style={{ color: "var(--text-muted)" }}>{label}</span>
                    <span className="font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div
                className="flex justify-between items-center pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-sm font-black uppercase tracking-wide">Total</span>
                <span className="text-xl font-black" style={{ color: "var(--color-gold)" }}>
                  ${selectedService ? selectedService.price.toLocaleString("es-CO") : "0"}
                </span>
              </div>

              {/* Time box */}
              {selectedService && (
                <div
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <Clock size={18} style={{ color: "var(--color-gold)" }} className="shrink-0" />
                  <div>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Tiempo estimado
                    </p>
                    <p className="text-sm font-bold">{selectedService.duration} minutos</p>
                  </div>
                </div>
              )}

              {/* WhatsApp note */}
              <div className="flex items-start gap-2 text-xs pt-1" style={{ color: "var(--text-muted)" }}>
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-[10px]"
                  style={{ background: "#25D366", minWidth: "16px" }}
                >
                  W
                </span>
                <p>Confirmación y recordatorios por WhatsApp</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* ─── FOOTER HIGHLIGHTS ─── */}
      <div
        className="mt-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(5,5,7,0.8)" }}
      >
        <div className="max-w-7xl mx-auto w-full px-8 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Calendar size={28} style={{ color: "var(--color-gold)" }} />, title: "FÁCIL Y RÁPIDO", desc: "Agenda en menos de 2 minutos" },
            { icon: <Clock size={28} style={{ color: "var(--color-gold)" }} />, title: "RECORDATORIOS", desc: "Te avisamos por WhatsApp" },
            { icon: <Shield size={28} style={{ color: "var(--color-gold)" }} />, title: "SIN COMPROMISO", desc: "Reprograma o cancela fácil" },
            { icon: <Star size={28} fill="#D4AF37" style={{ color: "var(--color-gold)" }} />, title: "PREMIUM", desc: "Barberos profesionales certificados" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
              >
                {icon}
              </div>
              <div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-0.5">{title}</h4>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
