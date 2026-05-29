"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Phone, CheckCircle, Calendar, Clock, Shield, Star,
  Edit3, ChevronRight, Scissors, User, MapPin, Instagram, Facebook,
} from "lucide-react";
import "./booking.css";

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */
const services = [
  {
    id: 1,
    name: "CORTE DE CABELLO",
    desc: "Corte clásico o moderno\nIncluye lavado y peinado",
    price: 30000,
    duration: 45,
    img: "/service_corte.png",
  },
  {
    id: 2,
    name: "BARBA",
    desc: "Perfilado y arreglo de barba\nIncluye toallas calientes",
    price: 20000,
    duration: 30,
    img: "/service_barba.png",
  },
  {
    id: 3,
    name: "CORTE + BARBA",
    desc: "Corte de cabello + perfilado de barba\nIncluye lavado y toallas calientes",
    price: 45000,
    duration: 60,
    img: "/service_combo.png",
  },
  {
    id: 4,
    name: "CORTE NIÑO",
    desc: "Corte para niños (hasta 12 años)\nIncluye lavado",
    price: 25000,
    duration: 30,
    img: "/service_nino.png",
  },
];

const barbers = [
  { id: 1, name: "Andrés Díaz", specialty: "Cortes clásicos y modernos", rating: 4.9, initial: "A" },
  { id: 2, name: "Carlos Mejía", specialty: "Barbas & diseños", rating: 4.8, initial: "C" },
  { id: 3, name: "Luis Perdomo", specialty: "Cortes premium y fade", rating: 4.7, initial: "L" },
];

const TIMES = ["09:00", "09:45", "10:30", "11:15", "12:00", "14:00", "14:45", "15:30", "16:15", "17:00"];

/* ─────────────────────────────────────────
   Step icons
───────────────────────────────────────── */
function ScissorsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>
      <line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/>
      <line x1="8.12" y1="8.12" x2="12" y2="12"/>
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function CalendarIcon2() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}
function CheckIcon2() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function WAIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */
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
  const [dates, setDates] = useState<{ iso: string; label: string; day: string }[]>([]);

  useEffect(() => {
    setDates(
      Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return {
          iso: d.toISOString().split("T")[0],
          label: d.toLocaleDateString("es-CO", { weekday: "short", month: "short", day: "numeric" }),
          day: d.toLocaleDateString("es-CO", { day: "numeric" }),
        };
      })
    );
  }, []);

  const sel = services.find((s) => s.id === formData.serviceId);
  const selBarber = barbers.find((b) => b.id === formData.barberId);

  const stepDefs = [
    { s: 2, label: "Selecciona Servicio", icon: <ScissorsIcon /> },
    { s: 3, label: "Elige Barbero", icon: <UserIcon /> },
    { s: 4, label: "Elige Fecha y Hora", icon: <CalendarIcon2 /> },
    { s: 5, label: "Confirmación", icon: <CheckIcon2 /> },
  ];

  return (
    <div className="booking-page">
      {/* ── HEADER ── */}
      <header className="booking-header">
        <Image src="/logo.png" alt="Vintage Barber Shop" width={100} height={34} style={{ objectFit: "contain" }} />
        <nav className="booking-header-nav">
          <Link href="#">Inicio</Link>
          <Link href="#">Servicios</Link>
          <Link href="#">Barberos</Link>
          <Link href="#" className="nav-active">Agendar Cita</Link>
        </nav>
        <a href="tel:+573001234567" className="booking-wa-link">
          <WAIcon size={18} />
          <span>+57 300 123 4567</span>
        </a>
      </header>

      {/* ── MAIN GRID ── */}
      <div className="booking-main">

        {/* ══ COL 1: Form + Steps ══ */}
        <div>
          <div className="bk-card" style={{ padding: "1.5rem" }}>
            {/* Step 1 header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.3rem" }}>
              <div className="bk-section-icon" style={{ width: 30, height: 30, borderRadius: 7 }}>
                <UserIcon />
              </div>
              <h2 style={{ fontSize: "1rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                <span style={{ color: "var(--color-gold)" }}>1.</span> Tus Datos
              </h2>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1.25rem", paddingLeft: "2.5rem" }}>
              Completa tus datos para apartar tu cita
            </p>

            {/* Name */}
            <div className="bk-form-group">
              <label className="bk-label">Nombre completo</label>
              <input
                className="bk-input"
                type="text"
                placeholder="Ej: Juan Camilo Ramírez"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              />
            </div>

            {/* Phone */}
            <div className="bk-form-group">
              <label className="bk-label">Número de teléfono</label>
              <div className="bk-input-wrap">
                <span className="bk-input-icon"><WAIcon size={14} /></span>
                <input
                  className="bk-input"
                  type="tel"
                  placeholder="Ej: 300 123 4567"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />
              </div>
              <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>
                Te enviaremos la confirmación por WhatsApp
              </p>
            </div>

            {/* Is new */}
            <div className="bk-form-group">
              <label className="bk-label">¿Eres nuevo cliente?</label>
              <div className="bk-radio-group">
                {[
                  { val: "yes", label: "Sí, es mi primera vez" },
                  { val: "no", label: "No, ya he venido antes" },
                ].map(({ val, label }) => (
                  <label
                    key={val}
                    className="bk-radio-label"
                    onClick={() => setFormData({ ...formData, isNew: val })}
                    style={{ color: formData.isNew === val ? "#fff" : undefined }}
                  >
                    <div className={`bk-radio-dot ${formData.isNew === val ? "is-checked" : ""}`}>
                      {formData.isNew === val && <div className="bk-radio-dot-inner" />}
                    </div>
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              className="bk-btn-primary"
              style={{ marginTop: "0.5rem" }}
              onClick={() => setStep(2)}
            >
              Continuar
            </button>

            {/* Steps 2–5 */}
            <div className="bk-steps">
              {stepDefs.map(({ s, label, icon }) => {
                const done = step > s;
                const active = step === s;
                return (
                  <div
                    key={s}
                    className={`bk-step-item ${active ? "is-active" : ""} ${done ? "is-done" : ""}`}
                    onClick={() => done && setStep(s)}
                  >
                    <div className="bk-step-icon">
                      {done ? <CheckIcon2 /> : icon}
                    </div>
                    <span className="bk-step-text">
                      {s}. {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ══ COL 2: Center content ══ */}
        <div>
          <div className="bk-card" style={{ padding: "1.5rem" }}>

            {/* STEP 1 — welcome */}
            {step === 1 && (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>💈</div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Bienvenido a Vintage Barber
                </h2>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "300px", margin: "0 auto" }}>
                  Completa tus datos en el panel izquierdo para comenzar tu reserva.
                </p>
              </div>
            )}

            {/* STEP 2 — Servicios */}
            {step === 2 && (
              <>
                <div className="bk-section-header">
                  <div className="bk-section-icon"><ScissorsIcon /></div>
                  <h2 className="bk-section-title">¿Qué servicio deseas?</h2>
                </div>
                <p className="bk-section-sub">Selecciona el servicio que deseas agendar</p>

                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className={`bk-service-card ${formData.serviceId === srv.id ? "is-selected" : ""}`}
                    onClick={() => setFormData({ ...formData, serviceId: srv.id })}
                  >
                    <img src={srv.img} alt={srv.name} className="bk-service-img" />
                    <div className="bk-service-info">
                      <p className="bk-service-name">{srv.name}</p>
                      {srv.desc.split("\n").map((line, i) => (
                        <p key={i} className="bk-service-desc" style={{ marginBottom: i === 0 ? 0 : undefined }}>{line}</p>
                      ))}
                      <p className="bk-service-price">${srv.price.toLocaleString("es-CO")}</p>
                    </div>
                    <div className="bk-service-right">
                      <div className="bk-duration-badge">
                        <strong>{srv.duration}</strong>
                        min
                      </div>
                      <div className={`bk-select-circle ${formData.serviceId === srv.id ? "is-selected" : ""}`}>
                        {formData.serviceId === srv.id && (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0a0a0c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="bk-info-note">
                  <div className="bk-info-circle">i</div>
                  <span>El tiempo estimado puede variar según el servicio y la disponibilidad.</span>
                </div>

                <button
                  className="bk-btn-primary"
                  style={{ marginTop: "1.25rem" }}
                  disabled={!formData.serviceId}
                  onClick={() => formData.serviceId && setStep(3)}
                >
                  Elegir Barbero →
                </button>
              </>
            )}

            {/* STEP 3 — Barberos */}
            {step === 3 && (
              <>
                <div className="bk-section-header">
                  <div className="bk-section-icon"><UserIcon /></div>
                  <h2 className="bk-section-title">Elige tu Barbero</h2>
                </div>
                <p className="bk-section-sub">Selecciona el barbero de tu preferencia</p>

                {barbers.map((b) => (
                  <div
                    key={b.id}
                    className={`bk-barber-card ${formData.barberId === b.id ? "is-selected" : ""}`}
                    onClick={() => setFormData({ ...formData, barberId: b.id })}
                  >
                    <div className="bk-barber-avatar">{b.initial}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 800, fontSize: "0.9rem", marginBottom: "0.2rem" }}>{b.name}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{b.specialty}</p>
                      <div className="bk-barber-stars">
                        <Star size={11} fill="#D4AF37" />
                        <span>{b.rating}</span>
                      </div>
                    </div>
                    <div className={`bk-select-circle ${formData.barberId === b.id ? "is-selected" : ""}`}>
                      {formData.barberId === b.id && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#0a0a0c" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  className="bk-btn-primary"
                  style={{ marginTop: "1rem" }}
                  disabled={!formData.barberId}
                  onClick={() => formData.barberId && setStep(4)}
                >
                  Elegir Fecha y Hora →
                </button>
                <button className="bk-btn-secondary" onClick={() => setStep(2)}>← Volver</button>
              </>
            )}

            {/* STEP 4 — Fecha y Hora */}
            {step === 4 && (
              <>
                <div className="bk-section-header">
                  <div className="bk-section-icon"><CalendarIcon2 /></div>
                  <h2 className="bk-section-title">Fecha y Hora</h2>
                </div>
                <p className="bk-section-sub">Selecciona cuándo quieres tu cita</p>

                <label className="bk-label" style={{ marginBottom: "0.6rem" }}>Fecha disponible</label>
                <div className="bk-date-grid">
                  {dates.map((d) => (
                    <button
                      key={d.iso}
                      className={`bk-slot-btn ${formData.date === d.iso ? "is-selected" : ""}`}
                      onClick={() => setFormData({ ...formData, date: d.iso })}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                <label className="bk-label" style={{ marginBottom: "0.6rem" }}>Horario disponible</label>
                <div className="bk-time-grid">
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      className={`bk-slot-btn ${formData.time === t ? "is-selected" : ""}`}
                      onClick={() => setFormData({ ...formData, time: t })}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button
                  className="bk-btn-primary"
                  disabled={!formData.date || !formData.time}
                  onClick={() => formData.date && formData.time && setStep(5)}
                >
                  Ver Confirmación →
                </button>
                <button className="bk-btn-secondary" onClick={() => setStep(3)}>← Volver</button>
              </>
            )}

            {/* STEP 5 — Confirmación */}
            {step === 5 && (
              <>
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                    <CheckCircle size={28} style={{ color: "var(--color-success)" }} />
                  </div>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 900, textTransform: "uppercase", marginBottom: "0.5rem" }}>¡Todo listo!</h2>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Revisa los detalles antes de confirmar tu cita</p>
                </div>

                <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.25rem" }}>
                  {[
                    { k: "Cliente", v: formData.nombre || "—" },
                    { k: "Teléfono", v: formData.telefono || "—" },
                    { k: "Servicio", v: sel?.name || "—" },
                    { k: "Barbero", v: selBarber?.name || "—" },
                    { k: "Fecha", v: formData.date ? new Date(formData.date + "T12:00:00").toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" }) : "—" },
                    { k: "Hora", v: formData.time || "—" },
                    { k: "Total", v: sel ? `$${sel.price.toLocaleString("es-CO")}` : "—", gold: true },
                  ].map(({ k, v, gold }) => (
                    <div key={k} className="bk-summary-row" style={{ borderBottom: k !== "Total" ? "1px solid rgba(255,255,255,0.04)" : "none", paddingBottom: "0.5rem", marginBottom: "0.35rem" }}>
                      <span className="bk-summary-key">{k}</span>
                      <span className="bk-summary-val" style={gold ? { color: "var(--color-gold)", fontSize: "1rem" } : undefined}>{v}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="bk-btn-primary"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--color-gold-hover)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = ""; }}
                >
                  ✓ Confirmar Cita
                </button>
                <button className="bk-btn-secondary" onClick={() => setStep(1)}>Editar reserva</button>
              </>
            )}
          </div>
        </div>

        {/* ══ COL 3: Summary ══ */}
        <div className="booking-summary-col">
          <div className="bk-card" style={{ padding: "1.25rem", position: "sticky", top: "86px" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1.1rem", paddingBottom: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="bk-section-icon" style={{ width: 28, height: 28, borderRadius: 7 }}><CalendarIcon2 /></div>
              <span style={{ fontSize: "0.85rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px" }}>Tu Reserva</span>
            </div>

            {/* Service selected */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
              <span className="bk-summary-label" style={{ margin: 0 }}>Servicio seleccionado</span>
              {sel && (
                <button
                  style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.7rem", color: "var(--color-gold)", background: "none", border: "none", cursor: "pointer" }}
                  onClick={() => setStep(2)}
                >
                  <Edit3 size={10} /> Cambiar
                </button>
              )}
            </div>

            {sel ? (
              <div className="bk-summary-service-box">
                <img src={sel.img} alt={sel.name} className="bk-summary-service-thumb" />
                <div>
                  <p style={{ fontWeight: 800, fontSize: "0.8rem", marginBottom: "0.2rem" }}>{sel.name}</p>
                  <p style={{ fontSize: "0.85rem", fontWeight: 800, color: "var(--color-gold)" }}>
                    ${sel.price.toLocaleString("es-CO")}
                  </p>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <div className="bk-duration-badge">
                    <strong>{sel.duration}</strong>
                    min
                  </div>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic", marginBottom: "1rem" }}>
                Ningún servicio seleccionado
              </p>
            )}

            {/* Details */}
            <div>
              {[
                { k: "Duración estimada", v: sel ? `${sel.duration} minutos` : "—" },
                { k: "Barbero", v: selBarber?.name || "Por asignar" },
                { k: "Fecha", v: formData.date ? new Date(formData.date + "T12:00:00").toLocaleDateString("es-CO", { day: "numeric", month: "short" }) : "Por seleccionar" },
                { k: "Hora", v: formData.time || "Por seleccionar" },
              ].map(({ k, v }) => (
                <div key={k} className="bk-summary-row">
                  <span className="bk-summary-key">{k}</span>
                  <span className="bk-summary-val">{v}</span>
                </div>
              ))}
            </div>

            <div className="bk-divider" />

            {/* Total */}
            <div className="bk-total-row">
              <span className="bk-total-label">Total</span>
              <span className="bk-total-value">
                ${sel ? sel.price.toLocaleString("es-CO") : "0"}
              </span>
            </div>

            {/* Clock box */}
            {sel && (
              <div className="bk-clock-box">
                <Clock size={22} style={{ color: "var(--color-gold)", flexShrink: 0 }} />
                <div className="bk-clock-box-text">
                  <p>Tiempo estimado total</p>
                  <p style={{ fontSize: "1rem", fontWeight: 800 }}>{sel.duration} minutos</p>
                  <p style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}>Desde la hora de tu cita</p>
                </div>
              </div>
            )}

            {/* WA note */}
            <div className="bk-wa-note">
              <div className="bk-wa-dot">W</div>
              <span>Te enviaremos la confirmación y recordatorios por WhatsApp</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ marginTop: "auto" }}>
        {/* Features */}
        <div className="bk-footer-top">
          {[
            { icon: <Calendar size={20} />, title: "Fácil y Rápido", sub: "Agenda tu cita en menos de 2 minutos" },
            { icon: <Clock size={20} />, title: "Recordatorios", sub: "Te recordamos tu cita por WhatsApp" },
            { icon: <Shield size={20} />, title: "Sin Compromiso", sub: "Puedes reprogramar o cancelar fácilmente" },
            { icon: <Star size={20} fill="#D4AF37" />, title: "Mejor Servicio", sub: "Barberos profesionales y ambiente premium" },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="bk-footer-feature">
              <div className="bk-footer-feat-icon">{icon}</div>
              <div>
                <p className="bk-footer-feat-title">{title}</p>
                <p className="bk-footer-feat-sub">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="bk-footer-bottom">
          <div className="bk-footer-brand">
            <Image src="/logo.png" alt="Vintage" width={42} height={42} style={{ objectFit: "contain" }} />
            <div className="bk-footer-brand-text">
              <strong>Vintage Barber Shop</strong>
              <span>Estilo que nunca pasa de moda</span>
            </div>
          </div>

          <div className="bk-social-links">
            {[
              { href: "#", label: "IG", title: "Instagram" },
              { href: "#", label: "FB", title: "Facebook" },
              { href: "#", label: "TK", title: "TikTok" },
            ].map(({ href, label, title }) => (
              <a key={title} href={href} className="bk-social-btn" title={title}>{label}</a>
            ))}
          </div>

          <div className="bk-footer-contact">
            <a href="tel:+573001234567">
              <WAIcon size={14} />
              +57 300 123 4567
            </a>
            <a href="#">
              <MapPin size={12} />
              Calle 123 #45-67, Tu Ciudad
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
