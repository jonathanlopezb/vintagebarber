/* app.js - Vintage Barber Tech Core Enterprise Business Logic & Simulations v2.0 */

// ==========================================
// 🛠️ UTILITIES & HELPERS
// ==========================================
function formatCOP(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(value);
}

// Simple Base64 mock hashing for credentials
const Hash = {
    encrypt: (str) => btoa(encodeURIComponent(str)),
    decrypt: (str) => decodeURIComponent(atob(str))
};

// ==========================================
// 💾 DATABASE SEED DATA (LOCAL STORAGE)
// ==========================================
const SEED_SERVICES = [
    { id: 'srv-1', nombre: 'Corte Caballero Premium', precio_actual: 35000, duracion_minutos: 30, puntos_otorga: 3, comision_porcentaje: 50, categoria: 'Cortes', activo: true },
    { id: 'srv-2', nombre: 'Perfilado Barba Imperial', precio_actual: 20000, duracion_minutos: 25, puntos_otorga: 2, comision_porcentaje: 50, categoria: 'Barba', activo: true },
    { id: 'srv-3', nombre: 'Combo Vintage (Corte + Barba)', precio_actual: 50000, duracion_minutos: 50, puntos_otorga: 5, comision_porcentaje: 50, categoria: 'Combos', activo: true },
    { id: 'srv-4', nombre: 'Perfilado Cejas Simétricas', precio_actual: 12000, duracion_minutos: 15, puntos_otorga: 1, comision_porcentaje: 50, categoria: 'Cortes', activo: true },
    { id: 'srv-5', nombre: 'Exfoliación Negra & Vapor', precio_actual: 25000, duracion_minutos: 30, puntos_otorga: 3, comision_porcentaje: 50, categoria: 'Tratamientos', activo: true }
];

const SEED_USERS = [
    { id: 'usr-1', nombre: 'Carlos Superadmin', documento: '1111', usuario: 'superadmin', clave_hash: Hash.encrypt('1111'), rol: 'superadmin', comision_base: 0, activo: true },
    { id: 'usr-2', nombre: 'Laura Cajera POS', documento: '2222', usuario: 'admin', clave_hash: Hash.encrypt('2222'), rol: 'admin', comision_base: 0, activo: true },
    { id: 'usr-3', nombre: 'Mateo Master Barber', documento: '3333', usuario: 'barber1', clave_hash: Hash.encrypt('3333'), rol: 'barber', comision_base: 50, activo: true },
    { id: 'usr-4', nombre: 'Sebas Junior Barber', documento: '4444', usuario: 'barber2', clave_hash: Hash.encrypt('4444'), rol: 'barber', comision_base: 45, activo: true }
];

const SEED_CUSTOMERS = [
    { id: 'cust-1', cedula: '101010', clave_hash: Hash.encrypt('101010'), nombre: 'Andrés Felipe Silva', telefono: '+573101234567', correo: 'andres@gmail.com', fecha_nacimiento: '1995-08-12', puntos_actuales: 18, nivel_fidelidad: 'Silver', activo: true },
    { id: 'cust-2', cedula: '202020', clave_hash: Hash.encrypt('202020'), nombre: 'Santiago Andrés Gómez', telefono: '+573209876543', correo: 'santiago@gmail.com', fecha_nacimiento: '1990-04-25', puntos_actuales: 45, nivel_fidelidad: 'Gold', activo: true },
    { id: 'cust-3', cedula: '303030', clave_hash: Hash.encrypt('303030'), nombre: 'Mateo Restrepo Rojas', telefono: '+573155551212', correo: 'mateo@gmail.com', fecha_nacimiento: '1988-11-05', puntos_actuales: 8, nivel_fidelidad: 'Bronze', activo: true }
];

const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const dayBefore = new Date(Date.now() - 172800000).toISOString().split('T')[0];

const SEED_APPOINTMENTS = [
    { id: 'app-1', customer_id: 'cust-1', barber_id: 'usr-3', service_id: 'srv-1', fecha: `${today}T09:00:00`, estado: 'Pendiente', canal_reserva: 'WhatsApp' },
    { id: 'app-2', customer_id: 'cust-2', barber_id: 'usr-3', service_id: 'srv-3', fecha: `${today}T10:30:00`, estado: 'Pendiente', canal_reserva: 'Portal Web' },
    { id: 'app-3', customer_id: 'cust-3', barber_id: 'usr-4', service_id: 'srv-2', fecha: `${yesterday}T14:00:00`, estado: 'Terminado', canal_reserva: 'Presencial' },
    { id: 'app-4', customer_id: 'cust-1', barber_id: 'usr-4', service_id: 'srv-4', fecha: `${today}T16:00:00`, estado: 'Pendiente', canal_reserva: 'WhatsApp' }
];

const SEED_SALES = [
    { id: 'sal-1', customer_id: 'cust-2', barber_id: 'usr-3', subtotal: 35000, descuento: 5000, total: 30000, metodo_pago: 'Efectivo', metodo_pago_extra: 'Ninguno', monto_extra: 0, estado: 'Completada', created_at: `${dayBefore}T15:30:00Z` },
    { id: 'sal-2', customer_id: 'cust-3', barber_id: 'usr-4', subtotal: 20000, descuento: 0, total: 20000, metodo_pago: 'Transferencia', metodo_pago_extra: 'Ninguno', monto_extra: 0, estado: 'Completada', created_at: `${yesterday}T11:15:00Z` },
    { id: 'sal-3', customer_id: 'cust-1', barber_id: 'usr-3', subtotal: 50000, descuento: 0, total: 50000, metodo_pago: 'Efectivo', metodo_pago_extra: 'Ninguno', monto_extra: 0, estado: 'Completada', created_at: `${today}T10:00:00Z` },
    { id: 'sal-4', customer_id: 'cust-2', barber_id: 'usr-4', subtotal: 57000, descuento: 10000, total: 47000, metodo_pago: 'Efectivo', metodo_pago_extra: 'Transferencia', monto_extra: 20000, estado: 'Completada', created_at: `${today}T12:30:00Z` }
];

const SEED_SALE_ITEMS = [
    { id: 'sitem-1', sale_id: 'sal-1', service_id: 'srv-1', precio_snapshot: 35000, comision_snapshot: 50, puntos_snapshot: 3 },
    { id: 'sitem-2', sale_id: 'sal-2', service_id: 'srv-2', precio_snapshot: 20000, comision_snapshot: 50, puntos_snapshot: 2 },
    { id: 'sitem-3', sale_id: 'sal-3', service_id: 'srv-3', precio_snapshot: 50000, comision_snapshot: 50, puntos_snapshot: 5 },
    { id: 'sitem-4', sale_id: 'sal-4', service_id: 'srv-1', precio_snapshot: 35000, comision_snapshot: 50, puntos_snapshot: 3 },
    { id: 'sitem-5', sale_id: 'sal-4', service_id: 'srv-2', precio_snapshot: 22000, comision_snapshot: 50, puntos_snapshot: 2 }
];

const SEED_LOYALTY_LEDGER = [
    { id: 'ledger-1', customer_id: 'cust-2', tipo: 'Acumular', puntos: 3, referencia: 'Compra venta #sal-1', created_at: `${dayBefore}T15:30:00Z` },
    { id: 'ledger-2', customer_id: 'cust-2', tipo: 'Redimir', puntos: -5, referencia: 'Descuento redimido #sal-1', created_at: `${dayBefore}T15:30:00Z` },
    { id: 'ledger-3', customer_id: 'cust-3', tipo: 'Acumular', puntos: 2, referencia: 'Compra venta #sal-2', created_at: `${yesterday}T11:15:00Z` },
    { id: 'ledger-4', customer_id: 'cust-1', tipo: 'Acumular', puntos: 5, referencia: 'Compra venta #sal-3', created_at: `${today}T10:00:00Z` }
];

const SEED_CASH_CLOSURES = [
    { id: 'close-1', fecha: yesterday, total_efectivo: 30000, total_transferencia: 20000, total_tarjeta: 0, total_comisiones: 25000, utilidad_neta: 25000, cerrado_por: 'Laura Cajera POS', created_at: `${yesterday}T20:00:00Z` }
];

class DatabaseManager {
    constructor() {
        this.init();
    }
    init() {
        if (!localStorage.getItem('vt_services')) localStorage.setItem('vt_services', JSON.stringify(SEED_SERVICES));
        if (!localStorage.getItem('vt_users')) localStorage.setItem('vt_users', JSON.stringify(SEED_USERS));
        if (!localStorage.getItem('vt_customers')) localStorage.setItem('vt_customers', JSON.stringify(SEED_CUSTOMERS));
        if (!localStorage.getItem('vt_appointments')) localStorage.setItem('vt_appointments', JSON.stringify(SEED_APPOINTMENTS));
        if (!localStorage.getItem('vt_sales')) localStorage.setItem('vt_sales', JSON.stringify(SEED_SALES));
        if (!localStorage.getItem('vt_sale_items')) localStorage.setItem('vt_sale_items', JSON.stringify(SEED_SALE_ITEMS));
        if (!localStorage.getItem('vt_loyalty_ledger')) localStorage.setItem('vt_loyalty_ledger', JSON.stringify(SEED_LOYALTY_LEDGER));
        if (!localStorage.getItem('vt_cash_closures')) localStorage.setItem('vt_cash_closures', JSON.stringify(SEED_CASH_CLOSURES));
        if (!localStorage.getItem('vt_audit_logs')) {
            localStorage.setItem('vt_audit_logs', JSON.stringify([
                { id: 'log-1', user_id: 'usr-1', accion: 'Inicializar', detalle: 'Carga inicial de base de datos e inyección de semillas v2.0', created_at: new Date().toISOString() }
            ]));
        }
        if (!localStorage.getItem('vt_points_rule')) {
            localStorage.setItem('vt_points_rule', JSON.stringify({
                spend_per_point: 10000,
                point_value: 1000
            }));
        }
    }
    get(table) { return JSON.parse(localStorage.getItem(`vt_${table}`)); }
    save(table, data) { localStorage.setItem(`vt_${table}`, JSON.stringify(data)); }
    add(table, item) {
        const data = this.get(table);
        item.id = `${table.substring(0, 3)}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        data.push(item);
        this.save(table, data);
        return item;
    }
    addAuditLog(userId, action, detail) {
        const log = {
            id: `log-${Date.now()}`,
            user_id: userId,
            accion: action,
            detalle: detail,
            created_at: new Date().toISOString()
        };
        const logs = this.get('audit_logs');
        logs.unshift(log);
        this.save('audit_logs', logs.slice(0, 200)); // Cap logs history
    }
}

const db = new DatabaseManager();

// ==========================================
// 📱 GLOBAL STATE VARIABLES
// ==========================================
let session = null; 
let currentModule = 'dashboard'; 
let posCart = [];
let selectedCustomerForPOS = null;
let pointsToRedeemInPOS = 0;
let pointsValueDiscount = 0;
let calendarOffsetWeeks = 0;
let calendarSelectedBarber = 'all';
let currentActiveMobileDay = new Date().getDay(); 

// ==========================================
// 🔔 SIMULATED NOTIFICATION TOAST SYSTEMS
// ==========================================
function showWhatsAppNotification(phone, message) {
    const container = document.getElementById('whatsapp-toast-container');
    const toast = document.createElement('div');
    toast.className = 'whatsapp-toast';
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    toast.innerHTML = `
        <div class="wa-header">
            <div class="wa-brand"><i class="fab fa-whatsapp"></i> WhatsApp Notify</div>
            <span class="wa-time">${timeString}</span>
        </div>
        <div class="wa-body">
            <div class="wa-sender">💈 Barbería Vintage</div>
            <div class="wa-message">${message}</div>
        </div>
        <div class="wa-footer">
            <span>Enviado a: ${phone}</span>
            <i class="fas fa-check-double" style="color:#53bdeb"></i>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 9000);
}

function showSystemToast(type, text) {
    const container = document.getElementById('system-toast-container');
    const toast = document.createElement('div');
    toast.className = 'system-toast';
    let icon = 'fa-circle-info';
    let color = 'var(--color-info)';
    if (type === 'success') { icon = 'fa-circle-check'; color = 'var(--color-success)'; }
    if (type === 'error') { icon = 'fa-circle-exclamation'; color = 'var(--color-danger)'; }
    
    toast.innerHTML = `<i class="fas ${icon}" style="color:${color}"></i> <span>${text}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.add ? toast.classList.add('show') : toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ==========================================
// 🔐 SESSION & AUTHENTICATION SYSTEMS
// ==========================================
function switchLoginTab(roleType) {
    document.querySelectorAll('.login-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(`tab-${roleType}`).classList.add('active');
    
    if (roleType === 'staff') {
        document.getElementById('login-form-staff').style.display = 'block';
        document.getElementById('login-form-client').style.display = 'none';
    } else {
        document.getElementById('login-form-staff').style.display = 'none';
        document.getElementById('login-form-client').style.display = 'block';
    }
}

function togglePass(inputId) {
    const el = document.getElementById(inputId);
    if (el.type === 'password') {
        el.type = 'text';
    } else {
        el.type = 'password';
    }
}

function loginStaff() {
    const userOrDoc = document.getElementById('staff-doc').value.trim();
    const pass = document.getElementById('staff-pass').value.trim();
    
    if (!userOrDoc || !pass) {
        showSystemToast('error', 'Por favor complete todos los campos');
        return;
    }
    
    const users = db.get('users');
    const matched = users.find(u => (u.usuario === userOrDoc || u.documento === userOrDoc) && u.activo);
    
    if (matched && Hash.decrypt(matched.clave_hash) === pass) {
        setSession(matched);
        showSystemToast('success', `¡Bienvenido de vuelta, ${matched.nombre}!`);
        db.addAuditLog(matched.id, 'Inicio Sesión', 'Acceso exitoso al panel corporativo.');
    } else {
        showSystemToast('error', 'Credenciales incorrectas o usuario inactivo');
    }
}

function loginClient() {
    const cedula = document.getElementById('client-cedula').value.trim();
    const pass = document.getElementById('client-pass').value.trim();
    
    if (!cedula || !pass) {
        showSystemToast('error', 'Por favor complete todos los campos');
        return;
    }
    
    const clients = db.get('customers');
    const matched = clients.find(c => c.cedula === cedula && c.activo);
    
    if (matched && Hash.decrypt(matched.clave_hash) === pass) {
        setSession({ ...matched, rol: 'client' });
        showSystemToast('success', `¡Hola, ${matched.nombre}!`);
        db.addAuditLog(matched.id, 'Inicio Sesión Cliente', 'Acceso exitoso al portal auto-servicio.');
    } else {
        showSystemToast('error', 'Cédula o clave incorrecta');
    }
}

function checkSession() {
    const saved = sessionStorage.getItem('vt_session');
    if (saved) {
        try {
            const userObj = JSON.parse(saved);
            setSession(userObj);
        } catch (e) {
            console.error('Error parsing session data');
        }
    } else {
        // If not logged in, ensure login screen is visible
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('app-container').classList.add('hidden');
    }
}

function setSession(userObj) {
    session = userObj;
    sessionStorage.setItem('vt_session', JSON.stringify(session));
    
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    
    // Reset state values
    posCart = [];
    selectedCustomerForPOS = null;
    pointsToRedeemInPOS = 0;
    pointsValueDiscount = 0;
    
    updateHeader();
    buildSidebar();
    
    // Choose initial target module based on role
    if (session.rol === 'client') {
        switchModule('client-portal');
    } else if (session.rol === 'barber') {
        switchModule('barber-agenda');
    } else {
        switchModule('dashboard');
    }
}

function logout() {
    db.addAuditLog(session ? session.id : 'unknown', 'Cierre Sesión', 'El usuario salió voluntariamente del sistema.');
    session = null;
    sessionStorage.removeItem('vt_session');
    
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
    document.getElementById('staff-doc').value = '';
    document.getElementById('staff-pass').value = '';
    document.getElementById('client-cedula').value = '';
    document.getElementById('client-pass').value = '';
}

function updateHeader() {
    const avatar = document.getElementById('header-avatar');
    const nameEl = document.getElementById('header-name');
    const roleEl = document.getElementById('header-role');
    
    if (!session) return;
    
    avatar.textContent = session.nombre[0].toUpperCase();
    nameEl.textContent = session.nombre;
    
    const rolesMap = {
        'superadmin': 'Super Administrador',
        'admin': 'Administrador',
        'barber': 'Barbero Profesional',
        'client': 'Cliente Frecuente'
    };
    roleEl.textContent = rolesMap[session.rol] || 'Usuario';
    
    if (session.rol === 'client') {
        avatar.style.background = 'var(--color-info)';
        avatar.style.color = '#fff';
    } else {
        avatar.style.background = 'var(--color-gold)';
        avatar.style.color = '#000';
    }
}

// ==========================================
// 📁 NAVIGATION SIDEBAR CREATION
// ==========================================
const ALL_MODULES = [
    { id: 'dashboard', nombre: 'Panel Global', icon: 'fa-chart-pie', roles: ['superadmin'] },
    { id: 'pos', nombre: 'POS / Caja', icon: 'fa-cash-register', roles: ['superadmin', 'admin'] },
    { id: 'agenda', nombre: 'Agenda General', icon: 'fa-calendar-check', roles: ['superadmin', 'admin'] },
    { id: 'barber_panel', nombre: 'Mi Panel', icon: 'fa-cut', roles: ['barber'] },
    { id: 'client_panel', nombre: 'Mi Perfil', icon: 'fa-user', roles: ['client'] },
    { id: 'users', nombre: 'Usuarios y Roles', icon: 'fa-users-cog', roles: ['superadmin'] },
    { id: 'services', nombre: 'Servicios y Precios', icon: 'fa-tags', roles: ['superadmin'] },
    { id: 'loyalty', nombre: 'Fidelización', icon: 'fa-star', roles: ['superadmin'] },
    { id: 'reports', nombre: 'Reportes', icon: 'fa-file-invoice-dollar', roles: ['superadmin', 'admin'] }
];

function buildSidebar() {
    const session = getSession();
    if (!session) return;
    
    const menuEl = document.getElementById('sidebar-menu');
    menuEl.innerHTML = '';
    
    // Filter modules based on user role
    const allowedModules = ALL_MODULES.filter(mod => mod.roles.includes(session.rol));
    
    allowedModules.forEach((mod, index) => {
        const a = document.createElement('a');
        a.href = '#';
        a.className = 'nav-link';
        a.dataset.id = mod.id;
        a.innerHTML = `<i class="fas ${mod.icon}"></i> ${mod.nombre}`;
        
        a.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
            a.classList.add('active');
            switchModule(mod.id);
            // On mobile, close sidebar when clicking a link
            document.getElementById('sidebar').classList.remove('active');
        });
        
        menuEl.appendChild(a);
        
        // Auto-select first module
        if (index === 0) {
            a.classList.add('active');
            switchModule(mod.id);
        }
    });
}

function switchModule(modId) {
    const container = document.getElementById('main-content');
    container.innerHTML = ''; // Clear current content
    
    const titleMap = ALL_MODULES.find(m => m.id === modId)?.nombre || 'Módulo';
    
    // Render the header and container
    const viewHtml = `
        <div class="view-header">
            <h1 class="view-title">${titleMap}</h1>
            <p class="view-subtitle">Gestión y control de ${titleMap.toLowerCase()}</p>
        </div>
        <div id="module-body" class="module-body">
            <!-- Content will be injected here by specific renderers -->
        </div>
    `;
    container.innerHTML = viewHtml;
    const body = document.getElementById('module-body');
    
    // Dispatch to specific renderer
    switch (modId) {
        case 'dashboard': renderDashboard(body); break;
        case 'pos': renderPOS(body); break;
        case 'agenda': renderAgenda(body); break;
        case 'barber_panel': renderBarberPanel(body); break;
        case 'client_panel': renderClientPanel(body); break;
        case 'users': renderUsersAdmin(body); break;
        case 'services': renderServicesAdmin(body); break;
        case 'loyalty': renderLoyaltyAdmin(body); break;
        case 'reports': renderReports(body); break;
        default: body.innerHTML = `<div class="glass-card"><p>Módulo en construcción.</p></div>`;
    }
}

// ==========================================
// 📁 MODULE RENDERERS
// ==========================================

function renderDashboard(container) {
    const sales = DatabaseManager.get('sales');
    const appointments = DatabaseManager.get('appointments');
    const totalVentas = sales.reduce((sum, s) => sum + s.total, 0);
    const completadas = appointments.filter(a => a.estado === 'completado').length;
    
    container.innerHTML = `
        <div class="kpi-grid">
            <div class="glass-card kpi-card">
                <div class="kpi-icon"><i class="fas fa-dollar-sign"></i></div>
                <div class="kpi-details">
                    <span class="kpi-title">Ingresos Totales (Mes)</span>
                    <span class="kpi-value">$${totalVentas.toLocaleString()}</span>
                </div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-icon"><i class="fas fa-cut"></i></div>
                <div class="kpi-details">
                    <span class="kpi-title">Servicios Realizados</span>
                    <span class="kpi-value">${completadas}</span>
                </div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-icon"><i class="fas fa-users"></i></div>
                <div class="kpi-details">
                    <span class="kpi-title">Nuevos Clientes</span>
                    <span class="kpi-value">12</span>
                </div>
            </div>
        </div>
        
        <div class="chart-container glass-card" style="margin-top: 2rem;">
            <h3 style="margin-bottom: 1rem; color: var(--color-gold);">Evolución de Ingresos</h3>
            <svg class="analytics-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
                <!-- Grid Lines -->
                <line class="grid-line" x1="0" y1="50" x2="800" y2="50" />
                <line class="grid-line" x1="0" y1="100" x2="800" y2="100" />
                <line class="grid-line" x1="0" y1="150" x2="800" y2="150" />
                <!-- Trend Line -->
                <path class="chart-line" d="M0,180 Q100,150 200,160 T400,100 T600,60 T800,20" />
                <!-- Data Points -->
                <circle class="chart-point" cx="200" cy="160" r="5"/>
                <circle class="chart-point" cx="400" cy="100" r="5"/>
                <circle class="chart-point" cx="600" cy="60" r="5"/>
                <circle class="chart-point" cx="800" cy="20" r="5"/>
            </svg>
        </div>
    `;
}

function renderPOS(container) {
    const services = DatabaseManager.get('services').filter(s => s.activo);
    const users = DatabaseManager.get('users').filter(u => u.rol === 'barber');
    
    let servicesHtml = services.map(s => `
        <div class="glass-card service-select-card" onclick="alert('Añadir al carrito: ${s.nombre}')" style="cursor: pointer; text-align:center; padding: 1rem;">
            <h4 style="margin:0; color:var(--text-main);">${s.nombre}</h4>
            <p style="color:var(--color-gold); font-size:1.2rem; font-weight:600; margin-top:0.5rem;">$${s.precio_actual.toLocaleString()}</p>
        </div>
    `).join('');
    
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
            <div class="pos-catalog">
                <h3 style="margin-bottom:1rem;">Servicios Disponibles</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 1rem;">
                    ${servicesHtml}
                </div>
            </div>
            
            <div class="pos-cart glass-card">
                <h3 style="margin-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">Caja / Cobro</h3>
                <div class="form-group">
                    <label>Cliente (Cédula)</label>
                    <input type="text" class="input-modern" placeholder="Buscar cliente..." />
                </div>
                <div class="form-group">
                    <label>Barbero que atendió</label>
                    <select class="input-modern">
                        <option value="">Seleccione barbero...</option>
                        ${users.map(u => `<option value="${u.id}">${u.nombre}</option>`).join('')}
                    </select>
                </div>
                
                <div style="margin: 2rem 0; border-top: 1px dashed rgba(255,255,255,0.2); padding-top:1rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Subtotal</span>
                        <span>$0</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: 700; color: var(--color-gold);">
                        <span>Total</span>
                        <span>$0</span>
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%;">Cobrar y Generar Factura</button>
            </div>
        </div>
    `;
}

function renderAgenda(container) {
    const apps = DatabaseManager.get('appointments');
    let appsHtml = apps.map(a => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 1rem;">${a.fecha.split('T')[0]} ${a.fecha.split('T')[1]}</td>
            <td style="padding: 1rem;">Cliente #${a.customer_id}</td>
            <td style="padding: 1rem;">Servicio #${a.service_id}</td>
            <td style="padding: 1rem;"><span class="badge ${a.estado === 'completado' ? 'badge-success' : 'badge-warning'}">${a.estado.toUpperCase()}</span></td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="glass-card">
            <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                <h3>Calendario de Citas</h3>
                <button class="btn btn-primary"><i class="fas fa-plus"></i> Nueva Cita</button>
            </div>
            <div style="overflow-x:auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid rgba(255,255,255,0.1); color: var(--text-muted);">
                            <th style="padding: 1rem;">Fecha y Hora</th>
                            <th style="padding: 1rem;">Cliente</th>
                            <th style="padding: 1rem;">Servicio</th>
                            <th style="padding: 1rem;">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${appsHtml}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderBarberPanel(container) {
    const session = getSession();
    // In a real app, query by barber_id
    container.innerHTML = `
        <div class="kpi-grid">
            <div class="glass-card kpi-card">
                <div class="kpi-icon"><i class="fas fa-cut"></i></div>
                <div class="kpi-details">
                    <span class="kpi-title">Motiladas Hoy</span>
                    <span class="kpi-value">5</span>
                </div>
            </div>
            <div class="glass-card kpi-card">
                <div class="kpi-icon"><i class="fas fa-coins"></i></div>
                <div class="kpi-details">
                    <span class="kpi-title">Mi Comisión Hoy</span>
                    <span class="kpi-value">$100,000</span>
                </div>
            </div>
        </div>
        <div class="glass-card" style="margin-top:2rem;">
            <h3>Mis Citas de Hoy</h3>
            <p style="color: var(--text-muted); margin-top: 1rem;">No tienes citas pendientes para hoy.</p>
        </div>
    `;
}

function renderClientPanel(container) {
    const session = getSession();
    container.innerHTML = `
        <div class="glass-card" style="text-align:center; padding: 3rem 1rem;">
            <div style="width: 100px; height: 100px; background: var(--color-gold); color: #000; border-radius: 50%; display: flex; align-items:center; justify-content:center; font-size: 3rem; margin: 0 auto 1rem auto; font-weight: bold;">
                ${session.nombre[0].toUpperCase()}
            </div>
            <h2>Hola, ${session.nombre}</h2>
            <p style="color: var(--text-muted);">Nivel de Fidelidad: <strong>Miembro VIP</strong></p>
            
            <div style="margin-top: 2rem; display: inline-block; background: rgba(255,255,255,0.05); padding: 1.5rem 3rem; border-radius: 15px; border: 1px solid rgba(255,255,255,0.1);">
                <span style="font-size: 1rem; color: var(--text-muted); display:block; margin-bottom: 0.5rem;">Tienes acumulados</span>
                <span style="font-size: 2.5rem; font-weight: 800; color: var(--color-gold);">1,250 Pts</span>
            </div>
            
            <div style="margin-top: 3rem;">
                <button class="btn btn-primary" style="margin-right: 1rem;"><i class="fas fa-calendar-plus"></i> Agendar Cita</button>
                <button class="btn btn-secondary"><i class="fas fa-gift"></i> Ver Recompensas</button>
            </div>
        </div>
    `;
}

function renderUsersAdmin(container) {
    const users = DatabaseManager.get('users');
    let usersHtml = users.map(u => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 1rem;">${u.nombre}</td>
            <td style="padding: 1rem;">${u.documento}</td>
            <td style="padding: 1rem;">
                <span class="badge" style="background: rgba(255,255,255,0.1);">${u.rol}</span>
            </td>
            <td style="padding: 1rem;">
                <button class="btn" style="padding: 0.25rem 0.5rem; font-size:0.8rem; background:rgba(255,255,255,0.1);">Editar</button>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="glass-card">
            <div style="display:flex; justify-content:space-between; margin-bottom: 1rem;">
                <h3>Gestión de Usuarios</h3>
                <button class="btn btn-primary"><i class="fas fa-user-plus"></i> Nuevo Usuario</button>
            </div>
            <div style="overflow-x:auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="border-bottom: 2px solid rgba(255,255,255,0.1); color: var(--text-muted);">
                            <th style="padding: 1rem;">Nombre</th>
                            <th style="padding: 1rem;">Documento</th>
                            <th style="padding: 1rem;">Rol</th>
                            <th style="padding: 1rem;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${usersHtml}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function renderServicesAdmin(container) {
    const services = DatabaseManager.get('services');
    let servHtml = services.map(s => `
        <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <div>
                <h4 style="margin:0; font-size: 1.1rem;">${s.nombre}</h4>
                <p style="margin:0; color:var(--text-muted); font-size:0.9rem;">Comisión Barbero: ${s.comision_barbero}% | Duración: ${s.duracion_minutos} min</p>
            </div>
            <div style="text-align: right;">
                <span style="display:block; font-size: 1.25rem; font-weight:bold; color:var(--color-gold); margin-bottom:0.25rem;">$${s.precio_actual.toLocaleString()}</span>
                <span class="badge badge-success">Activo</span>
            </div>
        </div>
    `).join('');

    container.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2rem;">
            <h3 style="margin:0;">Catálogo de Servicios</h3>
            <button class="btn btn-primary"><i class="fas fa-plus"></i> Añadir Servicio</button>
        </div>
        <div>
            ${servHtml}
        </div>
    `;
}

function renderLoyaltyAdmin(container) {
    container.innerHTML = `
        <div class="glass-card">
            <h3>Reglas de Fidelización (Puntos)</h3>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Configura cuántos puntos equivale a dinero real y cómo se acumulan.</p>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div>
                    <div class="form-group">
                        <label>Valor de 1 Punto (Equivalencia $)</label>
                        <input type="number" class="input-modern" value="10" />
                    </div>
                    <div class="form-group">
                        <label>Vencimiento de puntos (meses)</label>
                        <input type="number" class="input-modern" value="12" />
                    </div>
                    <button class="btn btn-primary">Guardar Reglas</button>
                </div>
            </div>
        </div>
    `;
}

function renderReports(container) {
    container.innerHTML = `
        <div class="glass-card" style="text-align:center; padding: 4rem 1rem;">
            <i class="fas fa-file-excel" style="font-size: 3rem; color: var(--color-gold); margin-bottom: 1rem;"></i>
            <h3>Módulo de Reportes Contables</h3>
            <p style="color: var(--text-muted); max-width: 400px; margin: 1rem auto;">Descarga en Excel los reportes de ventas, comisiones de barberos y cierres de caja diarios.</p>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button class="btn btn-primary">Reporte del Día</button>
                <button class="btn btn-secondary">Reporte Mensual</button>
            </div>
        </div>
    `;
}

// Initial Bootstrapper
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
});
