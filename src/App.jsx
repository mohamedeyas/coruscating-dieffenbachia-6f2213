import { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard, ShoppingCart, Package, Users, FileText, Settings,
  TrendingUp, Plus, Trash2, Edit2, Search, Printer, Download, X,
  ArrowUpRight, ArrowDownRight, Boxes,
  CreditCard, Banknote, Smartphone, IndianRupee, BarChart2,
  Bell, Menu, Eye,
  CheckCircle, AlertCircle,
  Save, Upload, Phone, Mail, MapPin, Building2,
  Hash, BadgePercent,
  LogOut, Receipt, Calendar
} from "lucide-react";

const LOGO_SVG = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="100%" style="stop-color:#7c3aed"/>
    </linearGradient>
    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b"/>
      <stop offset="100%" style="stop-color:#ef4444"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="20" fill="url(#bg)"/>
  <text x="60" y="50" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="36" font-weight="900" fill="#ffffff">S</text>
  <text x="60" y="78" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#93c5fd" letter-spacing="2">DIGITAL</text>
  <rect x="20" y="85" width="80" height="4" rx="2" fill="url(#g1)"/>
  <circle cx="20" cy="95" r="4" fill="#f59e0b"/>
  <circle cx="60" cy="95" r="4" fill="#22c55e"/>
  <circle cx="100" cy="95" r="4" fill="#ec4899"/>
</svg>`;

const BRAND = {
  blue: "#1e40af", blueLight: "#3b82f6", blueBg: "#eff6ff",
  green: "#16a34a", greenLight: "#22c55e", greenBg: "#f0fdf4",
  orange: "#ea580c", orangeLight: "#f97316", orangeBg: "#fff7ed",
  pink: "#db2777", pinkLight: "#ec4899", pinkBg: "#fdf2f8",
  purple: "#7c3aed", purpleLight: "#8b5cf6", purpleBg: "#f5f3ff",
  dark: "#0f172a", gray: "#64748b", grayLight: "#f1f5f9", border: "#e2e8f0"
};

// Fresh install — no demo data. Everything starts empty / at zero.
const initialProducts = [];
const initialCustomers = [];
const initialSales = [];
const initialExpenses = [];

function Logo({ size = 40, className = "", src }) {
  if (src) {
    return (
      <img src={src} alt="Shop logo" className={className}
        style={{ width: size, height: size, objectFit: "contain", borderRadius: Math.round(size * 0.16), flexShrink: 0, background: "#fff" }} />
    );
  }
  return (
    <div className={className} style={{ width: size, height: size, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
  );
}

function StatCard({ label, value, sub, icon: Icon, color, trend, trendVal }) {
  const colors = {
    blue: { bg: BRAND.blueBg, icon: BRAND.blueLight, text: BRAND.blue },
    green: { bg: BRAND.greenBg, icon: BRAND.greenLight, text: BRAND.green },
    orange: { bg: BRAND.orangeBg, icon: BRAND.orangeLight, text: BRAND.orange },
    purple: { bg: BRAND.purpleBg, icon: BRAND.purpleLight, text: BRAND.purple },
  };
  const c = colors[color] || colors.blue;
  return (
    <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ background: c.bg, borderRadius: 12, padding: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={22} color={c.icon} />
        </div>
        {trendVal && (
          <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: trend === "up" ? BRAND.green : BRAND.orange }}>
            {trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{trendVal}
          </span>
        )}
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: BRAND.dark, lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, color: BRAND.gray, marginTop: 4 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: c.text, marginTop: 2, fontWeight: 600 }}>{sub}</div>}
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 10, width: "100%",
      padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer",
      background: active ? BRAND.blue : "transparent",
      color: active ? "#fff" : BRAND.dark, fontWeight: active ? 600 : 500,
      fontSize: 14, transition: "all 0.15s", textAlign: "left", position: "relative"
    }}>
      <Icon size={18} />
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && badge !== null && badge !== "" && (
        <span style={{ background: active ? "#fff" : BRAND.orange, color: active ? BRAND.orange : "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 11, fontWeight: 700 }}>{badge}</span>
      )}
    </button>
  );
}

function Modal({ open, onClose, title, children, width = 600 }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: width, maxHeight: "90vh", overflow: "auto", boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${BRAND.border}` }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: BRAND.dark }}>{title}</h3>
          <button onClick={onClose} style={{ border: "none", background: BRAND.grayLight, borderRadius: 8, padding: 6, cursor: "pointer", display: "flex" }}><X size={18} /></button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, required, prefix }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: BRAND.dark, marginBottom: 6 }}>{label}{required && <span style={{ color: BRAND.orange }}> *</span>}</label>}
      <div style={{ display: "flex", alignItems: "center", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, overflow: "hidden", background: "#fff" }}>
        {prefix && <span style={{ padding: "0 12px", color: BRAND.gray, background: BRAND.grayLight, borderRight: `1px solid ${BRAND.border}`, height: "100%", display: "flex", alignItems: "center", fontSize: 14 }}>{prefix}</span>}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={{ flex: 1, padding: "10px 14px", border: "none", outline: "none", fontSize: 14, color: BRAND.dark, background: "transparent" }} />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options, required }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: BRAND.dark, marginBottom: 6 }}>{label}{required && <span style={{ color: BRAND.orange }}> *</span>}</label>}
      <select value={value} onChange={onChange} style={{ width: "100%", padding: "10px 14px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, fontSize: 14, color: BRAND.dark, background: "#fff", outline: "none" }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function Badge({ status }) {
  const map = {
    "Paid": { bg: BRAND.greenBg, color: BRAND.green },
    "Partial": { bg: BRAND.orangeBg, color: BRAND.orange },
    "Unpaid": { bg: "#fef2f2", color: "#dc2626" },
    "Active": { bg: BRAND.greenBg, color: BRAND.green },
    "Inactive": { bg: BRAND.grayLight, color: BRAND.gray },
  };
  const s = map[status] || map["Active"];
  return <span style={{ background: s.bg, color: s.color, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{status}</span>;
}

function DateRangeFilter({ from, to, onFrom, onTo, onClear }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, padding: "8px 12px" }}>
        <Calendar size={14} color={BRAND.gray} />
        <input type="date" value={from} onChange={e => onFrom(e.target.value)}
          style={{ border: "none", outline: "none", fontSize: 13, color: BRAND.dark, background: "transparent" }} />
      </div>
      <span style={{ fontSize: 12, color: BRAND.gray }}>to</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, padding: "8px 12px" }}>
        <Calendar size={14} color={BRAND.gray} />
        <input type="date" value={to} onChange={e => onTo(e.target.value)}
          style={{ border: "none", outline: "none", fontSize: 13, color: BRAND.dark, background: "transparent" }} />
      </div>
      {(from || to) && (
        <button onClick={onClear} style={{ display: "flex", alignItems: "center", gap: 4, border: "none", background: BRAND.grayLight, color: BRAND.gray, borderRadius: 10, padding: "8px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          <X size={13} />Clear
        </button>
      )}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, logoUrl }) {
  const [user, setUser] = useState("admin");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      if (user === "admin" && pass === "admin123") { onLogin(); }
      else { setErr("Invalid credentials. Use admin / admin123"); setLoading(false); }
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${BRAND.blue} 0%, ${BRAND.purple} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(236,72,153,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34,197,94,0.15) 0%, transparent 50%)" }} />
      <div style={{ position: "relative", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)", borderRadius: 24, padding: "40px 40px", width: "100%", maxWidth: 420, border: "1px solid rgba(255,255,255,0.25)", boxShadow: "0 30px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <div style={{ padding: 8, background: "rgba(255,255,255,0.2)", borderRadius: 20 }}>
              <Logo size={72} src={logoUrl} />
            </div>
          </div>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 800, margin: 0 }}>Sakthi Digital Flex</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 }}>POS Billing & Inventory Management System</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Username</label>
          <input value={user} onChange={e => setUser(e.target.value)} placeholder="admin"
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
          <input value={pass} onChange={e => { setPass(e.target.value); setErr(""); }} type="password" placeholder="••••••••"
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
        </div>
        {err && <div style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)", borderRadius: 10, padding: "10px 14px", color: "#fca5a5", fontSize: 13, marginBottom: 16 }}>{err}</div>}
        <button onClick={handleLogin} disabled={loading}
          style={{ width: "100%", padding: "14px", background: loading ? "rgba(255,255,255,0.3)" : "#fff", color: loading ? "rgba(255,255,255,0.5)" : BRAND.blue, borderRadius: 12, border: "none", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textAlign: "center", marginTop: 20 }}>Demo: admin / admin123</p>
      </div>
    </div>
  );
}

// ─── DASHBOARD (fully computed from live data — starts at zero) ───────────────
function Dashboard({ products, customers, sales, logoUrl }) {
  const todayStr = new Date().toISOString().slice(0, 10);
  const todaySales = sales.filter(s => s.date === todayStr);
  const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);
  const ordersToday = todaySales.length;
  const pendingBills = sales.filter(s => s.status !== "Paid").length;

  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const totalSales = sales.length;
  const totalCustomers = customers.length;
  const pendingAmount = sales.reduce((sum, s) => sum + (s.total - s.paid), 0);

  // Last 6 months, all zero until real sales come in
  const now = new Date();
  const chartData = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const label = d.toLocaleDateString("en-IN", { month: "short" });
    const monthKey = d.toISOString().slice(0, 7);
    const monthTotal = sales.filter(s => s.date && s.date.slice(0, 7) === monthKey).reduce((sum, s) => sum + s.total, 0);
    return { m: label, s: monthTotal };
  });
  const maxS = Math.max(1, ...chartData.map(d => d.s));

  // Category breakdown from products actually sold; empty when no sales
  const catTotals = {};
  sales.forEach(s => {
    (s.lines || []).forEach(l => {
      const p = products.find(pr => pr.name === l.desc);
      const cat = p ? p.category : "Other";
      catTotals[cat] = (catTotals[cat] || 0) + l.qty * l.rate;
    });
  });
  const catSum = Object.values(catTotals).reduce((a, b) => a + b, 0);
  const catColors = [BRAND.blueLight, BRAND.greenLight, BRAND.orangeLight, BRAND.pinkLight, BRAND.purpleLight];
  const cats = Object.entries(catTotals).map(([name, amt], i) => ({
    name, pct: catSum ? Math.round((amt / catSum) * 100) : 0, color: catColors[i % catColors.length]
  }));

  return (
    <div>
      <div style={{ background: `linear-gradient(135deg, ${BRAND.blue} 0%, ${BRAND.purple} 100%)`, borderRadius: 20, padding: "28px 28px", marginBottom: 24, color: "#fff", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: 20, top: -10, opacity: 0.1 }}><Logo size={120} src={logoUrl} /></div>
        <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.8 }}>Welcome back, Admin 👋</p>
        <h2 style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 800 }}>Sakthi Digital Flex</h2>
        <p style={{ margin: 0, fontSize: 13, opacity: 0.75 }}>POS Billing & Inventory Management System</p>
        <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 18px" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>₹{todayRevenue.toLocaleString("en-IN")}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Today's Revenue</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 18px" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{ordersToday}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Orders Today</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 18px" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{pendingBills}</div>
            <div style={{ fontSize: 11, opacity: 0.8 }}>Pending Bills</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Revenue" value={`₹${totalRevenue.toLocaleString("en-IN")}`} icon={IndianRupee} color="blue" sub="all time" />
        <StatCard label="Total Sales" value={String(totalSales)} icon={ShoppingCart} color="green" sub="all time" />
        <StatCard label="Total Customers" value={String(totalCustomers)} icon={Users} color="orange" sub="on record" />
        <StatCard label="Pending Amount" value={`₹${pendingAmount.toLocaleString("en-IN")}`} icon={AlertCircle} color="purple" sub="to collect" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: BRAND.dark }}>Monthly Revenue</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160 }}>
            {chartData.map(d => (
              <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ fontSize: 10, color: BRAND.gray, fontWeight: 600 }}>₹{(d.s / 1000).toFixed(0)}k</div>
                <div style={{ width: "100%", height: `${Math.max(4, (d.s / maxS) * 100)}%`, background: d.s > 0 ? BRAND.blue : BRAND.grayLight, borderRadius: "6px 6px 0 0", transition: "all 0.3s", border: d.s > 0 ? "none" : `1px solid ${BRAND.border}`, minHeight: 4 }} />
                <div style={{ fontSize: 11, color: BRAND.gray }}>{d.m}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: BRAND.dark }}>Sales by Category</h3>
          {cats.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: BRAND.gray, fontSize: 13 }}>No sales yet</div>
          ) : cats.map(c => (
            <div key={c.name} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: BRAND.dark, fontWeight: 500 }}>{c.name}</span>
                <span style={{ color: BRAND.gray, fontWeight: 600 }}>{c.pct}%</span>
              </div>
              <div style={{ background: BRAND.grayLight, borderRadius: 4, height: 7, overflow: "hidden" }}>
                <div style={{ width: `${c.pct}%`, height: "100%", background: c.color, borderRadius: 4, transition: "width 0.8s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: BRAND.dark }}>Recent Sales</h3>
        {sales.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: BRAND.gray, fontSize: 13 }}>No sales yet — completed sales will show up here.</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${BRAND.grayLight}` }}>
                {["Invoice", "Customer", "Date", "Amount", "Status"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 12, color: BRAND.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sales.slice(-5).reverse().map(s => (
                <tr key={s.id} style={{ borderBottom: `1px solid ${BRAND.grayLight}` }}>
                  <td style={{ padding: "12px", fontSize: 13, fontWeight: 700, color: BRAND.blue }}>{s.id}</td>
                  <td style={{ padding: "12px", fontSize: 13, color: BRAND.dark }}>{s.customer}</td>
                  <td style={{ padding: "12px", fontSize: 13, color: BRAND.gray }}>{s.date}</td>
                  <td style={{ padding: "12px", fontSize: 13, fontWeight: 700, color: BRAND.dark }}>₹{s.total.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "12px" }}><Badge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── POS / NEW SALE ───────────────────────────────────────────────────────────
function POSPage({ products, customers, sales, setSales }) {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [selCustomer, setSelCustomer] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [payMode, setPayMode] = useState("Cash");
  const [success, setSuccess] = useState(false);
  const [catFilter, setCatFilter] = useState("All");
  const [lastInvoice, setLastInvoice] = useState(null);
  const [showPrint, setShowPrint] = useState(false);

  const cats = ["All", ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p =>
    (catFilter === "All" || p.category === catFilter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const addToCart = (p) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      if (ex) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) setCart(prev => prev.filter(i => i.id !== id));
    else setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const gstTotal = cart.reduce((sum, i) => sum + (i.price * i.qty * i.gst / 100), 0);
  const discAmt = subtotal * discount / 100;
  const total = subtotal + gstTotal - discAmt;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const invNum = `INV-${String(sales.length + 1).padStart(3, "0")}`;
    const today = new Date().toISOString().slice(0, 10);
    const custName = selCustomer ? selCustomer.name : "Walk-in Customer";
    const invoice = {
      id: invNum,
      date: today,
      customer: custName,
      customerObj: selCustomer,
      total,
      paid: total,
      status: "Paid",
      items: cart.length,
      payMode,
      lines: cart.map(i => ({ desc: i.name, hsn: i.hsn, qty: i.qty, unit: i.unit, rate: i.price, gst: i.gst })),
    };
    setSales(prev => [...prev, invoice]);
    setLastInvoice(invoice);
    setSuccess(true);
  };

  const startNewSale = () => {
    setSuccess(false);
    setShowPrint(false);
    setCart([]);
    setDiscount(0);
    setSelCustomer(null);
    setLastInvoice(null);
  };

  const payModes = [
    { label: "Cash", icon: Banknote },
    { label: "UPI", icon: Smartphone },
    { label: "Card", icon: CreditCard },
    { label: "Credit", icon: FileText },
  ];

  if (showPrint && lastInvoice) return (
    <div>
      <InvoicePrint inv={lastInvoice} autoPrint onClose={startNewSale} />
    </div>
  );

  if (success) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, gap: 20 }}>
      <div style={{ background: BRAND.greenBg, borderRadius: "50%", width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CheckCircle size={44} color={BRAND.green} />
      </div>
      <h2 style={{ color: BRAND.dark, margin: 0 }}>Sale Completed!</h2>
      <p style={{ color: BRAND.gray, margin: 0 }}>Invoice {lastInvoice?.id} generated successfully</p>
      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 12, padding: "12px 24px", fontWeight: 700, fontSize: 20, color: BRAND.dark }}>₹{total.toFixed(2)}</div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => setShowPrint(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", background: BRAND.blue, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          <Printer size={16} />Print Bill
        </button>
        <button onClick={startNewSale} style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 22px", background: BRAND.grayLight, color: BRAND.dark, border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          <Plus size={16} />New Sale
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, height: "calc(100vh - 140px)" }}>
      <div style={{ overflow: "auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, padding: "8px 14px", gap: 8 }}>
            <Search size={16} color={BRAND.gray} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ border: "none", outline: "none", fontSize: 14, flex: 1, color: BRAND.dark }} />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ padding: "8px 12px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, fontSize: 13, color: BRAND.dark, background: "#fff", outline: "none" }}>
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.gray, background: "#fff", border: `1.5px dashed ${BRAND.border}`, borderRadius: 16 }}>
            <Package size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
            <div style={{ fontSize: 14, marginBottom: 4 }}>No products yet</div>
            <div style={{ fontSize: 12 }}>Add products from the Products page to start billing.</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {filtered.map(p => (
              <button key={p.id} onClick={() => addToCart(p)}
                style={{ background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 14, padding: 16, cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
                <div style={{ background: BRAND.blueBg, borderRadius: 10, height: 60, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <Boxes size={28} color={BRAND.blueLight} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: BRAND.gray, marginBottom: 6 }}>{p.category}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: BRAND.blue }}>₹{p.price}<span style={{ fontSize: 11, fontWeight: 400, color: BRAND.gray }}>/{p.unit}</span></div>
                <div style={{ fontSize: 11, color: BRAND.green, marginTop: 2 }}>GST {p.gst}%</div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${BRAND.grayLight}`, background: BRAND.grayLight }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.dark, marginBottom: 10 }}>New Sale</div>
          <select style={{ width: "100%", padding: "8px 12px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, fontSize: 13, color: BRAND.dark, background: "#fff", outline: "none" }}
            onChange={e => setSelCustomer(customers.find(c => c.id === parseInt(e.target.value)))}>
            <option value="">Walk-in Customer</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: "12px 20px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: BRAND.gray }}>
              <ShoppingCart size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
              <div style={{ fontSize: 14 }}>Add products to cart</div>
            </div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: `1px solid ${BRAND.grayLight}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{item.name}</div>
                <div style={{ fontSize: 12, color: BRAND.gray }}>₹{item.price}/{item.unit} • GST {item.gst}%</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 26, height: 26, border: `1px solid ${BRAND.border}`, borderRadius: 6, background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>-</button>
                <span style={{ fontSize: 14, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 26, height: 26, border: `1px solid ${BRAND.border}`, borderRadius: 6, background: BRAND.blue, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: BRAND.dark, minWidth: 60, textAlign: "right" }}>₹{(item.price * item.qty).toFixed(0)}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: `1px solid ${BRAND.grayLight}`, padding: "12px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: BRAND.gray }}>
            <span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: BRAND.gray }}>
            <span>GST</span><span>₹{gstTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 13, color: BRAND.gray }}>Discount %</span>
            <input type="number" value={discount} onChange={e => setDiscount(Math.min(100, Math.max(0, +e.target.value)))}
              style={{ width: 70, padding: "4px 8px", border: `1.5px solid ${BRAND.border}`, borderRadius: 8, fontSize: 13, textAlign: "right", outline: "none" }} />
          </div>
          {discount > 0 && <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6, color: BRAND.green }}>
            <span>Discount</span><span>-₹{discAmt.toFixed(2)}</span>
          </div>}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: BRAND.dark, borderTop: `2px solid ${BRAND.grayLight}`, paddingTop: 10, marginBottom: 12 }}>
            <span>Total</span><span>₹{total.toFixed(2)}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {payModes.map(pm => (
              <button key={pm.label} onClick={() => setPayMode(pm.label)}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px", borderRadius: 10, border: `2px solid ${payMode === pm.label ? BRAND.blue : BRAND.border}`, background: payMode === pm.label ? BRAND.blueBg : "#fff", color: payMode === pm.label ? BRAND.blue : BRAND.gray, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                <pm.icon size={15} />{pm.label}
              </button>
            ))}
          </div>

          <button onClick={handleCheckout} disabled={cart.length === 0}
            style={{ width: "100%", padding: "14px", background: cart.length > 0 ? BRAND.blue : BRAND.grayLight, color: cart.length > 0 ? "#fff" : BRAND.gray, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: cart.length > 0 ? "pointer" : "not-allowed" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <CheckCircle size={18} />Complete Sale • ₹{total.toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
function ProductsPage({ products, setProducts }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editProd, setEditProd] = useState(null);
  const [form, setForm] = useState({ name: "", category: "Flex Printing", price: "", unit: "sqft", stock: "", hsn: "", gst: 18 });

  const cats = ["Flex Printing", "Digital Printing", "Offset Printing", "Advertising", "Designing"];
  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setForm({ name: "", category: "Flex Printing", price: "", unit: "sqft", stock: "", hsn: "", gst: 18 }); setEditProd(null); setShowAdd(true); };
  const openEdit = (p) => { setForm({ ...p }); setEditProd(p); setShowAdd(true); };
  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (editProd) setProducts(prev => prev.map(p => p.id === editProd.id ? { ...form, id: editProd.id, price: +form.price, stock: +form.stock, gst: +form.gst } : p));
    else setProducts(prev => [...prev, { ...form, id: Date.now(), price: +form.price, stock: +form.stock, gst: +form.gst }]);
    setShowAdd(false);
  };
  const handleDel = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, padding: "8px 14px", gap: 8, flex: 1, maxWidth: 360 }}>
          <Search size={16} color={BRAND.gray} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" style={{ border: "none", outline: "none", fontSize: 14, flex: 1 }} />
        </div>
        <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.blue, color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={16} />Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.gray, background: "#fff", border: `1.5px dashed ${BRAND.border}`, borderRadius: 16 }}>
          <Package size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, marginBottom: 4 }}>No products yet</div>
          <div style={{ fontSize: 12 }}>Click "Add Product" to build your catalog.</div>
        </div>
      ) : (
        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: BRAND.grayLight }}>
                {["Product", "Category", "Price", "Unit", "Stock", "GST", "HSN", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: BRAND.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${BRAND.grayLight}`, background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 600, color: BRAND.dark }}>{p.name}</td>
                  <td style={{ padding: "13px 16px" }}><span style={{ background: BRAND.blueBg, color: BRAND.blue, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{p.category}</span></td>
                  <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 700, color: BRAND.dark }}>₹{p.price}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.gray }}>{p.unit}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: p.stock < 10 ? "#dc2626" : BRAND.dark, fontWeight: p.stock < 10 ? 700 : 400 }}>{p.stock}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.gray }}>{p.gst}%</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.gray }}>{p.hsn}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(p)} style={{ background: BRAND.blueBg, color: BRAND.blue, border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}><Edit2 size={13} />Edit</button>
                      <button onClick={() => handleDel(p.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}><Trash2 size={13} />Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title={editProd ? "Edit Product" : "Add Product"}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div style={{ gridColumn: "1/-1" }}><Input label="Product Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="e.g. Flex Banner Printing" /></div>
          <Select label="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} options={cats.map(c => ({ value: c, label: c }))} />
          <Input label="Price (₹)" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} type="number" required placeholder="0.00" />
          <Input label="Unit" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} placeholder="sqft / pc / job" />
          <Input label="Stock Quantity" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} type="number" placeholder="0" />
          <Select label="GST Rate" value={form.gst} onChange={e => setForm(f => ({ ...f, gst: +e.target.value }))} options={[{value:0,label:"0%"},{value:5,label:"5%"},{value:12,label:"12%"},{value:18,label:"18%"},{value:28,label:"28%"}]} />
          <div style={{ gridColumn: "1/-1" }}><Input label="HSN Code" value={form.hsn} onChange={e => setForm(f => ({ ...f, hsn: e.target.value }))} placeholder="e.g. 4911" /></div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <button onClick={() => setShowAdd(false)} style={{ padding: "10px 20px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: "10px 20px", background: BRAND.blue, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Save Product</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── CUSTOMERS ────────────────────────────────────────────────────────────────
function CustomersPage({ customers, setCustomers }) {
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editCust, setEditCust] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", gstin: "", type: "Individual" });
  const [delId, setDelId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filtered = customers.filter(c =>
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search) || c.email.toLowerCase().includes(search.toLowerCase())) &&
    (!fromDate || !c.addedOn || c.addedOn >= fromDate) &&
    (!toDate || !c.addedOn || c.addedOn <= toDate)
  );

  const openAdd = () => { setForm({ name: "", phone: "", email: "", address: "", gstin: "", type: "Individual" }); setEditCust(null); setShowAdd(true); };
  const openEdit = (c) => { setForm({ ...c }); setEditCust(c); setShowAdd(true); };

  const handleSave = () => {
    if (!form.name) return;
    if (editCust) setCustomers(prev => prev.map(c => c.id === editCust.id ? { ...c, ...form, id: editCust.id } : c));
    else setCustomers(prev => [...prev, { ...form, id: Date.now(), addedOn: new Date().toISOString().slice(0, 10) }]);
    setShowAdd(false);
    setEditCust(null);
    setForm({ name: "", phone: "", email: "", address: "", gstin: "", type: "Individual" });
  };

  const confirmDelete = () => {
    setCustomers(prev => prev.filter(c => c.id !== delId));
    setDelId(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, padding: "8px 14px", gap: 8, flex: 1, maxWidth: 360 }}>
          <Search size={16} color={BRAND.gray} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search customers…" style={{ border: "none", outline: "none", fontSize: 14, flex: 1 }} />
        </div>
        <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.green, color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={16} />Add Customer
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <DateRangeFilter from={fromDate} to={toDate} onFrom={setFromDate} onTo={setToDate} onClear={() => { setFromDate(""); setToDate(""); }} />
      </div>

      {customers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.gray, background: "#fff", border: `1.5px dashed ${BRAND.border}`, borderRadius: 16 }}>
          <Users size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, marginBottom: 4 }}>No customers yet</div>
          <div style={{ fontSize: 12 }}>Click "Add Customer" to build your customer list.</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {filtered.map(c => (
            <div key={c.id} style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 20 }}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: BRAND.blueBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: BRAND.blue }}>{c.name[0]}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.dark }}>{c.name}</div>
                  <span style={{ background: c.type === "Business" ? BRAND.purpleBg : BRAND.orangeBg, color: c.type === "Business" ? BRAND.purple : BRAND.orange, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{c.type}</span>
                </div>
              </div>
              <div style={{ fontSize: 13, color: BRAND.gray, display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                {c.phone && <span style={{ display: "flex", gap: 6 }}><Phone size={13} color={BRAND.gray} />{c.phone}</span>}
                {c.email && <span style={{ display: "flex", gap: 6 }}><Mail size={13} color={BRAND.gray} />{c.email}</span>}
                {c.address && <span style={{ display: "flex", gap: 6 }}><MapPin size={13} color={BRAND.gray} />{c.address}</span>}
                {c.gstin && <span style={{ display: "flex", gap: 6 }}><Hash size={13} color={BRAND.gray} />GSTIN: {c.gstin}</span>}
              </div>
              <div style={{ display: "flex", gap: 8, borderTop: `1px solid ${BRAND.grayLight}`, paddingTop: 12 }}>
                <button onClick={() => openEdit(c)} style={{ flex: 1, background: BRAND.blueBg, color: BRAND.blue, border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 12, fontWeight: 600 }}><Edit2 size={13} />Edit</button>
                <button onClick={() => setDelId(c.id)} style={{ flex: 1, background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 8, padding: "7px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontSize: 12, fontWeight: 600 }}><Trash2 size={13} />Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={showAdd} onClose={() => { setShowAdd(false); setEditCust(null); }} title={editCust ? "Edit Customer" : "Add Customer"}>
        <Input label="Customer Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Full name / company name" />
        <Input label="Phone" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 99999 99999" />
        <Input label="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" placeholder="email@example.com" />
        <Input label="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Full address" />
        <Input label="GSTIN (optional)" value={form.gstin} onChange={e => setForm(f => ({ ...f, gstin: e.target.value }))} placeholder="33XXXXX1234X1ZX" />
        <Select label="Customer Type" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} options={[{value:"Individual",label:"Individual"},{value:"Business",label:"Business"}]} />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <button onClick={() => { setShowAdd(false); setEditCust(null); }} style={{ padding: "10px 20px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: "10px 20px", background: BRAND.green, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>{editCust ? "Save Changes" : "Save Customer"}</button>
        </div>
      </Modal>

      <Modal open={!!delId} onClose={() => setDelId(null)} title="Delete Customer" width={400}>
        <p style={{ fontSize: 14, color: BRAND.dark, marginTop: 0 }}>Delete this customer? This cannot be undone.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button onClick={() => setDelId(null)} style={{ padding: "10px 20px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Cancel</button>
          <button onClick={confirmDelete} style={{ padding: "10px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── INVOICES ─────────────────────────────────────────────────────────────────
function InvoicePrint({ inv, onClose, autoPrint }) {
  const lines = inv.lines && inv.lines.length ? inv.lines : [];
  const subtotal = lines.reduce((s, l) => s + l.qty * l.rate, 0);
  const gstTotal = lines.reduce((s, l) => s + l.qty * l.rate * l.gst / 100, 0);
  const total = subtotal + gstTotal;
  const cust = inv.customerObj;

  useEffect(() => {
    if (!autoPrint) return;
    const t = setTimeout(() => window.print(), 350);
    return () => clearTimeout(t);
  }, [autoPrint]);

  return (
    <div className="print-area" style={{ fontFamily: "Arial, sans-serif", color: "#111", maxWidth: 700, margin: "0 auto" }}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; max-width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>
      <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginBottom: 16 }}>
        <button onClick={() => window.print()} style={{ display: "flex", alignItems: "center", gap: 6, background: BRAND.blue, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><Printer size={14} />Print</button>
        <button onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 6, background: BRAND.grayLight, color: BRAND.dark, border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}><X size={14} />Close</button>
      </div>
      <div style={{ border: "2px solid #1e40af", borderRadius: 8, overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)", padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 60, height: 60, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 1 }}>SAKTHI DIGITAL FLEX</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Digital Printing • Flex Printing • Offset • Advertising & Designing</div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 12, opacity: 0.85 }}>
            <div>Sungagate, Kulithalai</div>
            <div>Karur District, Tamil Nadu – 639104</div>
            <div>📞 +91 70949 49064 / +91 96265 05233</div>
            <div>✉ sakthidigital2026@gmail.com</div>
          </div>
        </div>

        <div style={{ background: "#f8faff", padding: "12px 28px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #dce8ff" }}>
          <div><span style={{ fontWeight: 700, color: "#1e40af", fontSize: 18 }}>TAX INVOICE</span></div>
          <div style={{ textAlign: "right", fontSize: 13 }}>
            <div><strong>Invoice No:</strong> {inv.id}</div>
            <div><strong>Date:</strong> {inv.date}</div>
          </div>
        </div>

        <div style={{ padding: "16px 28px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 4 }}>Bill To</div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{inv.customer}</div>
            <div style={{ fontSize: 13, color: "#374151" }}>{cust?.address || ""}</div>
            {cust?.phone && <div style={{ fontSize: 13, color: "#374151" }}>{cust.phone}</div>}
            {cust?.gstin && <div style={{ fontSize: 13, color: "#374151" }}>GSTIN: {cust.gstin}</div>}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", marginBottom: 4 }}>Payment</div>
            <Badge status={inv.status} />
          </div>
        </div>

        <div style={{ padding: "16px 28px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1e40af", color: "#fff" }}>
                <th style={{ padding: "10px 12px", textAlign: "left" }}>#</th>
                <th style={{ padding: "10px 12px", textAlign: "left" }}>Description</th>
                <th style={{ padding: "10px 12px", textAlign: "center" }}>HSN</th>
                <th style={{ padding: "10px 12px", textAlign: "center" }}>Qty</th>
                <th style={{ padding: "10px 12px", textAlign: "right" }}>Rate</th>
                <th style={{ padding: "10px 12px", textAlign: "center" }}>GST</th>
                <th style={{ padding: "10px 12px", textAlign: "right" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e5e7eb", background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                  <td style={{ padding: "10px 12px" }}>{i + 1}</td>
                  <td style={{ padding: "10px 12px", fontWeight: 500 }}>{l.desc}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#6b7280" }}>{l.hsn}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>{l.qty} {l.unit}</td>
                  <td style={{ padding: "10px 12px", textAlign: "right" }}>₹{l.rate}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#6b7280" }}>{l.gst}%</td>
                  <td style={{ padding: "10px 12px", textAlign: "right", fontWeight: 600 }}>₹{(l.qty * l.rate).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <div style={{ minWidth: 260, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ color: "#6b7280" }}>Subtotal</span><span style={{ fontWeight: 600 }}>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ color: "#6b7280" }}>GST Total</span><span style={{ fontWeight: 600 }}>₹{gstTotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", background: "#1e40af", color: "#fff", borderRadius: 8, paddingLeft: 12, paddingRight: 12, marginTop: 8 }}>
                <span style={{ fontWeight: 700 }}>TOTAL</span><span style={{ fontWeight: 800, fontSize: 16 }}>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24, borderTop: "1px dashed #d1d5db", paddingTop: 16, fontSize: 12, color: "#6b7280" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div style={{ fontWeight: 700, color: "#374151", marginBottom: 4 }}>Bank Details</div>
                <div>UPI: sakthidigital@upi</div>
                <div>Account: 123456789012</div>
                <div>IFSC: SBIN0001234</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, color: "#374151", marginBottom: 4 }}>For Sakthi Digital Flex</div>
                <div style={{ marginTop: 40, borderTop: "1px solid #9ca3af", display: "inline-block", paddingTop: 4, minWidth: 120 }}>Authorized Signatory</div>
              </div>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 12, fontSize: 11, color: "#9ca3af" }}>Thank you for your business! • sakthidigital2026@gmail.com</div>
        </div>
      </div>
    </div>
  );
}

function InvoicesPage({ sales, setSales }) {
  const [search, setSearch] = useState("");
  const [viewInv, setViewInv] = useState(null);
  const [printMode, setPrintMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [editInv, setEditInv] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [delId, setDelId] = useState(null);

  const statuses = ["All", "Paid", "Partial", "Unpaid"];
  const filtered = sales.filter(s =>
    (filter === "All" || s.status === filter) &&
    (s.id.toLowerCase().includes(search.toLowerCase()) || s.customer.toLowerCase().includes(search.toLowerCase())) &&
    (!fromDate || s.date >= fromDate) &&
    (!toDate || s.date <= toDate)
  );

  const openEdit = (s) => {
    setEditInv(s);
    setEditForm({ date: s.date, customer: s.customer, total: s.total, paid: s.paid, status: s.status });
  };

  const saveEdit = () => {
    if (!editForm) return;
    setSales(prev => prev.map(s => s.id === editInv.id ? {
      ...s,
      date: editForm.date,
      customer: editForm.customer,
      total: +editForm.total,
      paid: +editForm.paid,
      status: editForm.status,
    } : s));
    setEditInv(null);
    setEditForm(null);
  };

  const confirmDelete = () => {
    setSales(prev => prev.filter(s => s.id !== delId));
    setDelId(null);
  };

  if (viewInv) return (
    <div>
      <InvoicePrint inv={viewInv} autoPrint={printMode} onClose={() => { setViewInv(null); setPrintMode(false); }} />
    </div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, padding: "8px 14px", gap: 8, flex: 1, maxWidth: 340 }}>
          <Search size={16} color={BRAND.gray} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoices…" style={{ border: "none", outline: "none", fontSize: 14, flex: 1 }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              style={{ padding: "8px 14px", border: `1.5px solid ${filter === s ? BRAND.blue : BRAND.border}`, borderRadius: 10, background: filter === s ? BRAND.blueBg : "#fff", color: filter === s ? BRAND.blue : BRAND.gray, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <DateRangeFilter from={fromDate} to={toDate} onFrom={setFromDate} onTo={setToDate} onClear={() => { setFromDate(""); setToDate(""); }} />
      </div>

      {sales.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.gray, background: "#fff", border: `1.5px dashed ${BRAND.border}`, borderRadius: 16 }}>
          <FileText size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, marginBottom: 4 }}>No invoices yet</div>
          <div style={{ fontSize: 12 }}>Complete a sale in New Sale (POS) to generate your first invoice.</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.gray, background: "#fff", border: `1.5px dashed ${BRAND.border}`, borderRadius: 16 }}>
          <FileText size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14 }}>No invoices match your filters</div>
        </div>
      ) : (
        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: BRAND.grayLight }}>
                {["Invoice #", "Customer", "Date", "Items", "Total", "Paid", "Status", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: BRAND.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: `1px solid ${BRAND.grayLight}`, background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 800, color: BRAND.blue }}>{s.id}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 600, color: BRAND.dark }}>{s.customer}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.gray }}>{s.date}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.gray, textAlign: "center" }}>{s.items}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, fontWeight: 700, color: BRAND.dark }}>₹{s.total.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.green, fontWeight: 600 }}>₹{s.paid.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px" }}><Badge status={s.status} /></td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button onClick={() => setViewInv(s)} style={{ background: BRAND.blueBg, color: BRAND.blue, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Eye size={13} />View</button>
                      <button onClick={() => { setPrintMode(true); setViewInv(s); }} style={{ background: BRAND.greenBg, color: BRAND.green, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Printer size={13} />Print</button>
                      <button onClick={() => openEdit(s)} style={{ background: BRAND.orangeBg, color: BRAND.orange, border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Edit2 size={13} />Edit</button>
                      <button onClick={() => setDelId(s.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 7, padding: "5px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}><Trash2 size={13} />Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!editInv} onClose={() => { setEditInv(null); setEditForm(null); }} title={`Edit Invoice ${editInv?.id || ""}`}>
        {editForm && (
          <>
            <Input label="Customer" value={editForm.customer} onChange={e => setEditForm(f => ({ ...f, customer: e.target.value }))} />
            <Input label="Date" type="date" value={editForm.date} onChange={e => setEditForm(f => ({ ...f, date: e.target.value }))} />
            <Input label="Total (₹)" type="number" value={editForm.total} onChange={e => setEditForm(f => ({ ...f, total: e.target.value }))} />
            <Input label="Paid (₹)" type="number" value={editForm.paid} onChange={e => setEditForm(f => ({ ...f, paid: e.target.value }))} />
            <Select label="Status" value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))}
              options={[{ value: "Paid", label: "Paid" }, { value: "Partial", label: "Partial" }, { value: "Unpaid", label: "Unpaid" }]} />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
              <button onClick={() => { setEditInv(null); setEditForm(null); }} style={{ padding: "10px 20px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Cancel</button>
              <button onClick={saveEdit} style={{ padding: "10px 20px", background: BRAND.blue, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Save Changes</button>
            </div>
          </>
        )}
      </Modal>

      <Modal open={!!delId} onClose={() => setDelId(null)} title="Delete Invoice" width={400}>
        <p style={{ fontSize: 14, color: BRAND.dark, marginTop: 0 }}>Delete invoice <strong>{delId}</strong>? This cannot be undone.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button onClick={() => setDelId(null)} style={{ padding: "10px 20px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Cancel</button>
          <button onClick={confirmDelete} style={{ padding: "10px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── REPORTS (computed from live data — starts at zero) ───────────────────────
function ReportsPage({ products, customers, sales }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const sales_ = sales.filter(s =>
    (!fromDate || s.date >= fromDate) &&
    (!toDate || s.date <= toDate)
  );
  const hasRange = !!(fromDate || toDate);
  const rangeLabel = hasRange ? "selected range" : "all time";

  const totalSalesAmt = sales_.reduce((sum, s) => sum + s.total, 0);
  const totalInvoices = sales_.length;
  const paidAmt = sales_.reduce((sum, s) => sum + s.paid, 0);
  const outstanding = totalSalesAmt - paidAmt;
  const paidPct = totalSalesAmt ? ((paidAmt / totalSalesAmt) * 100).toFixed(1) : "0.0";
  const outPct = totalSalesAmt ? ((outstanding / totalSalesAmt) * 100).toFixed(1) : "0.0";

  const data = [
    { label: "Total Sales", value: `₹${totalSalesAmt.toLocaleString("en-IN")}`, icon: TrendingUp, color: "blue", sub: rangeLabel },
    { label: "Total Invoices", value: String(totalInvoices), icon: FileText, color: "green", sub: rangeLabel },
    { label: "Paid Amount", value: `₹${paidAmt.toLocaleString("en-IN")}`, icon: CheckCircle, color: "orange", sub: `${paidPct}% collected` },
    { label: "Outstanding", value: `₹${outstanding.toLocaleString("en-IN")}`, icon: AlertCircle, color: "purple", sub: `${outPct}% pending` },
  ];

  const now = new Date();
  const monthly = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (6 - i), 1);
    const label = d.toLocaleDateString("en-IN", { month: "short" });
    const monthKey = d.toISOString().slice(0, 7);
    const monthSales = sales_.filter(s => s.date && s.date.slice(0, 7) === monthKey).reduce((sum, s) => sum + s.total, 0);
    return { m: label, sales: monthSales, target: 0 };
  });
  const maxV = Math.max(1, ...monthly.flatMap(d => [d.sales, d.target]));

  const productTotals = {};
  sales_.forEach(s => (s.lines || []).forEach(l => {
    productTotals[l.desc] = (productTotals[l.desc] || 0) + l.qty * l.rate;
  }));
  const topAmtSum = Object.values(productTotals).reduce((a, b) => a + b, 0);
  const topProducts = Object.entries(productTotals)
    .sort((a, b) => b[1] - a[1]).slice(0, 5)
    .map(([name, amt]) => ({ name, amt, pct: topAmtSum ? +((amt / topAmtSum) * 100).toFixed(1) : 0 }));

  const payTotals = { Cash: 0, UPI: 0, Card: 0, Credit: 0 };
  sales_.forEach(s => { if (s.payMode && payTotals[s.payMode] !== undefined) payTotals[s.payMode] += s.total; });
  const payAmtSum = Object.values(payTotals).reduce((a, b) => a + b, 0);
  const payIcons = { Cash: Banknote, UPI: Smartphone, Card: CreditCard, Credit: FileText };
  const payColors = { Cash: BRAND.green, UPI: BRAND.blue, Card: BRAND.purple, Credit: BRAND.orange };
  const payMethods = Object.entries(payTotals).map(([method, amt]) => ({
    method, pct: payAmtSum ? Math.round((amt / payAmtSum) * 100) : 0, icon: payIcons[method], color: payColors[method]
  }));

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <DateRangeFilter from={fromDate} to={toDate} onFrom={setFromDate} onTo={setToDate} onClear={() => { setFromDate(""); setToDate(""); }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {data.map(d => <StatCard key={d.label} {...d} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: BRAND.dark }}>Monthly Sales</h3>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180 }}>
            {monthly.map(d => (
              <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", display: "flex", gap: 3, alignItems: "flex-end", height: 140 }}>
                  <div style={{ flex: 1, background: d.sales > 0 ? BRAND.blue : BRAND.grayLight, border: d.sales > 0 ? "none" : `1px solid ${BRAND.border}`, borderRadius: "4px 4px 0 0", height: `${Math.max(4, (d.sales / maxV) * 100)}%` }} />
                </div>
                <div style={{ fontSize: 10, color: BRAND.gray }}>{d.m}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 24 }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 15, fontWeight: 700, color: BRAND.dark }}>Top Products</h3>
          {topProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "24px 0", color: BRAND.gray, fontSize: 13 }}>No sales yet</div>
          ) : topProducts.map(p => (
            <div key={p.name} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                <span style={{ color: BRAND.dark, fontWeight: 500 }}>{p.name}</span>
                <span style={{ color: BRAND.gray }}>₹{p.amt.toLocaleString("en-IN")} <span style={{ color: BRAND.blue, fontWeight: 700 }}>({p.pct}%)</span></span>
              </div>
              <div style={{ background: BRAND.grayLight, borderRadius: 4, height: 6 }}>
                <div style={{ width: `${p.pct}%`, height: "100%", background: `linear-gradient(90deg, ${BRAND.blue}, ${BRAND.purple})`, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 24 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: BRAND.dark }}>Payment Method Breakdown</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {payMethods.map(m => (
            <div key={m.method} style={{ textAlign: "center", padding: 16, background: BRAND.grayLight, borderRadius: 12 }}>
              <m.icon size={24} color={m.color} style={{ marginBottom: 8 }} />
              <div style={{ fontSize: 24, fontWeight: 800, color: BRAND.dark }}>{m.pct}%</div>
              <div style={{ fontSize: 13, color: BRAND.gray }}>{m.method}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── EXPENSES ─────────────────────────────────────────────────────────────────
const EXPENSE_CATEGORIES = ["Materials & Supplies", "Rent", "Electricity", "Salaries", "Transport", "Maintenance", "Marketing", "Other"];

function ExpensesPage({ expenses, setExpenses }) {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editExp, setEditExp] = useState(null);
  const [delId, setDelId] = useState(null);
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState({ date: today, category: "Materials & Supplies", amount: "", note: "" });

  const filtered = expenses.filter(e =>
    (e.category.toLowerCase().includes(search.toLowerCase()) || (e.note || "").toLowerCase().includes(search.toLowerCase())) &&
    (!fromDate || e.date >= fromDate) &&
    (!toDate || e.date <= toDate)
  );
  const totalShown = filtered.reduce((sum, e) => sum + e.amount, 0);

  const openAdd = () => { setForm({ date: today, category: "Materials & Supplies", amount: "", note: "" }); setEditExp(null); setShowAdd(true); };
  const openEdit = (e) => { setForm({ date: e.date, category: e.category, amount: e.amount, note: e.note || "" }); setEditExp(e); setShowAdd(true); };

  const handleSave = () => {
    if (!form.amount || !form.date) return;
    if (editExp) setExpenses(prev => prev.map(e => e.id === editExp.id ? { ...e, ...form, amount: +form.amount } : e));
    else setExpenses(prev => [...prev, { id: Date.now(), ...form, amount: +form.amount }]);
    setShowAdd(false);
    setEditExp(null);
  };

  const confirmDelete = () => {
    setExpenses(prev => prev.filter(e => e.id !== delId));
    setDelId(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", background: "#fff", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, padding: "8px 14px", gap: 8, flex: 1, maxWidth: 320 }}>
          <Search size={16} color={BRAND.gray} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search expenses…" style={{ border: "none", outline: "none", fontSize: 14, flex: 1 }} />
        </div>
        <button onClick={openAdd} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.orange, color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          <Plus size={16} />Add Expense
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12, flexWrap: "wrap" }}>
        <DateRangeFilter from={fromDate} to={toDate} onFrom={setFromDate} onTo={setToDate} onClear={() => { setFromDate(""); setToDate(""); }} />
        <div style={{ background: BRAND.orangeBg, color: BRAND.orange, borderRadius: 12, padding: "10px 18px", fontWeight: 800, fontSize: 15 }}>
          Total: ₹{totalShown.toLocaleString("en-IN")}
        </div>
      </div>

      {expenses.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.gray, background: "#fff", border: `1.5px dashed ${BRAND.border}`, borderRadius: 16 }}>
          <Receipt size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, marginBottom: 4 }}>No expenses yet</div>
          <div style={{ fontSize: 12 }}>Click "Add Expense" to start tracking your shop expenses.</div>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: BRAND.gray, background: "#fff", border: `1.5px dashed ${BRAND.border}`, borderRadius: 16 }}>
          <Receipt size={40} color={BRAND.border} style={{ margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14 }}>No expenses match your filters</div>
        </div>
      ) : (
        <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: BRAND.grayLight }}>
                {["Date", "Category", "Note", "Amount", "Actions"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: 12, color: BRAND.gray, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...filtered].sort((a, b) => b.date.localeCompare(a.date)).map((e, i) => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${BRAND.grayLight}`, background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.gray }}>{e.date}</td>
                  <td style={{ padding: "13px 16px" }}><span style={{ background: BRAND.orangeBg, color: BRAND.orange, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{e.category}</span></td>
                  <td style={{ padding: "13px 16px", fontSize: 13, color: BRAND.dark }}>{e.note || "—"}</td>
                  <td style={{ padding: "13px 16px", fontSize: 14, fontWeight: 700, color: BRAND.dark }}>₹{e.amount.toLocaleString("en-IN")}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEdit(e)} style={{ background: BRAND.blueBg, color: BRAND.blue, border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}><Edit2 size={13} />Edit</button>
                      <button onClick={() => setDelId(e.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600 }}><Trash2 size={13} />Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={showAdd} onClose={() => { setShowAdd(false); setEditExp(null); }} title={editExp ? "Edit Expense" : "Add Expense"}>
        <Input label="Date" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} required />
        <Select label="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} options={EXPENSE_CATEGORIES.map(c => ({ value: c, label: c }))} />
        <Input label="Amount (₹)" type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required placeholder="0.00" />
        <Input label="Note (optional)" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="What was this for?" />
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
          <button onClick={() => { setShowAdd(false); setEditExp(null); }} style={{ padding: "10px 20px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Cancel</button>
          <button onClick={handleSave} style={{ padding: "10px 20px", background: BRAND.orange, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>{editExp ? "Save Changes" : "Save Expense"}</button>
        </div>
      </Modal>

      <Modal open={!!delId} onClose={() => setDelId(null)} title="Delete Expense" width={400}>
        <p style={{ fontSize: 14, color: BRAND.dark, marginTop: 0 }}>Delete this expense? This cannot be undone.</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 16 }}>
          <button onClick={() => setDelId(null)} style={{ padding: "10px 20px", border: `1.5px solid ${BRAND.border}`, borderRadius: 10, background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Cancel</button>
          <button onClick={confirmDelete} style={{ padding: "10px 20px", background: "#dc2626", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Delete</button>
        </div>
      </Modal>
    </div>
  );
}

// ─── SETTINGS / COMPANY PROFILE ───────────────────────────────────────────────
function SettingsPage({ logoUrl, setLogoUrl }) {
  const [tab, setTab] = useState("company");
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    shopName: "Sakthi Digital Flex",
    address: "",
    mobile1: "",
    mobile2: "",
    email: "",
    gstin: "",
    website: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    upi: "",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handleLogoPick = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const tabs = [
    { id: "company", label: "Company Profile", icon: Building2 },
    { id: "bank", label: "Bank & UPI", icon: CreditCard },
    { id: "gst", label: "GST & Tax", icon: BadgePercent },
    { id: "users", label: "Users", icon: Users },
  ];

  const F = ({ label, k, placeholder }) => (
    <Input label={label} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={placeholder} />
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 16, height: "fit-content" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer", background: tab === t.id ? BRAND.blueBg : "transparent", color: tab === t.id ? BRAND.blue : BRAND.gray, fontWeight: tab === t.id ? 700 : 500, fontSize: 13, marginBottom: 2 }}>
            <t.icon size={16} />{t.label}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 16, padding: 28 }}>
        {tab === "company" && (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: 20, background: BRAND.grayLight, borderRadius: 14 }}>
              <div style={{ position: "relative" }}>
                <Logo size={72} src={logoUrl} />
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleLogoPick} />
                <button onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  style={{ position: "absolute", bottom: -4, right: -4, background: BRAND.blue, color: "#fff", border: "none", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Upload size={12} /></button>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: BRAND.dark }}>{form.shopName || "Your Shop Name"}</div>
                <div style={{ fontSize: 13, color: BRAND.gray }}>Digital Printing & POS Billing System</div>
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ fontSize: 12, color: BRAND.blue, fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Upload logo</button>
                  {logoUrl && <button onClick={() => setLogoUrl(null)} style={{ fontSize: 12, color: "#dc2626", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0 }}>Remove logo</button>}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <div style={{ gridColumn: "1/-1" }}><F label="Shop Name" k="shopName" placeholder="Your shop name" /></div>
              <div style={{ gridColumn: "1/-1" }}><Input label="Address" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Full address" /></div>
              <F label="Mobile 1" k="mobile1" placeholder="+91 99999 99999" />
              <F label="Mobile 2" k="mobile2" placeholder="+91 99999 99999" />
              <div style={{ gridColumn: "1/-1" }}><F label="Email" k="email" placeholder="email@example.com" /></div>
              <F label="GSTIN" k="gstin" placeholder="33XXXXX1234X1ZX" />
              <F label="Website" k="website" placeholder="www.yourshop.com" />
            </div>
          </>
        )}
        {tab === "bank" && (
          <>
            <h3 style={{ margin: "0 0 20px", color: BRAND.dark }}>Bank & Payment Details</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <F label="Bank Name" k="bankName" placeholder="Bank name" />
              <F label="Account Number" k="accountNo" placeholder="Account number" />
              <F label="IFSC Code" k="ifsc" placeholder="IFSC code" />
              <div style={{ gridColumn: "1/-1" }}><F label="UPI ID" k="upi" placeholder="yourname@upi" /></div>
            </div>
          </>
        )}
        {tab === "gst" && (
          <div>
            <h3 style={{ margin: "0 0 20px", color: BRAND.dark }}>GST & Tax Settings</h3>
            <F label="GSTIN" k="gstin" placeholder="33XXXXX1234X1ZX" />
            <div style={{ background: BRAND.blueBg, borderRadius: 12, padding: 16, border: `1px solid #bfdbfe` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.blue, marginBottom: 8 }}>Default GST Rates</div>
              <div style={{ fontSize: 13, color: BRAND.dark }}>Flex / Digital Printing: 18% GST</div>
              <div style={{ fontSize: 13, color: BRAND.dark }}>Offset Printing: 12% GST</div>
              <div style={{ fontSize: 13, color: BRAND.dark }}>Designing Services: 18% GST</div>
            </div>
          </div>
        )}
        {tab === "users" && (
          <div>
            <h3 style={{ margin: "0 0 20px", color: BRAND.dark }}>User Management</h3>
            <div style={{ background: "#fff", border: `1px solid ${BRAND.border}`, borderRadius: 12, overflow: "hidden" }}>
              {[{ name: "Admin User", role: "Super Admin", email: "admin@sakthidigital.com" }].map((u, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${BRAND.grayLight}` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: BRAND.blueBg, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 14 }}>
                    <span style={{ fontWeight: 800, color: BRAND.blue }}>A</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: BRAND.dark }}>{u.name}</div>
                    <div style={{ fontSize: 13, color: BRAND.gray }}>{u.email}</div>
                  </div>
                  <span style={{ background: BRAND.purpleBg, color: BRAND.purple, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>{u.role}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab !== "users" && (
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20, paddingTop: 20, borderTop: `1px solid ${BRAND.grayLight}` }}>
            {saved && <span style={{ display: "flex", alignItems: "center", gap: 6, color: BRAND.green, fontWeight: 600, fontSize: 14 }}><CheckCircle size={16} />Saved!</span>}
            <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", background: BRAND.blue, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
              <Save size={16} />Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [products, setProducts] = useState(initialProducts);
  const [customers, setCustomers] = useState(initialCustomers);
  const [sales, setSales] = useState(initialSales);
  const [expenses, setExpenses] = useState(initialExpenses);
  const [logoUrl, setLogoUrl] = useState(null);
  const [notif, setNotif] = useState(false);

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} logoUrl={logoUrl} />;

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "pos", label: "New Sale (POS)", icon: ShoppingCart },
    { id: "invoices", label: "Invoices", icon: FileText },
    { id: "products", label: "Products", icon: Package, badge: products.length || undefined },
    { id: "customers", label: "Customers", icon: Users, badge: customers.length || undefined },
    { id: "expenses", label: "Expenses", icon: Receipt, badge: expenses.length || undefined },
    { id: "reports", label: "Reports", icon: BarChart2 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const pageTitle = nav.find(n => n.id === page)?.label || "Dashboard";

  return (
    <div style={{ display: "flex", height: "100vh", background: BRAND.grayLight, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 240 : 0, overflow: "hidden", transition: "width 0.25s", background: "#fff", borderRight: `1px solid ${BRAND.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${BRAND.grayLight}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <Logo size={44} src={logoUrl} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, color: BRAND.dark, lineHeight: 1.2 }}>Sakthi Digital Flex</div>
              <div style={{ fontSize: 10, color: BRAND.gray, lineHeight: 1.3 }}>Digital Printing & POS</div>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: "12px 10px", overflow: "auto" }}>
          <div style={{ fontSize: 10, color: BRAND.gray, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 4px 8px" }}>Main Menu</div>
          {nav.slice(0, 3).map(n => <SidebarItem key={n.id} {...n} active={page === n.id} onClick={() => setPage(n.id)} />)}
          <div style={{ fontSize: 10, color: BRAND.gray, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "12px 4px 8px" }}>Management</div>
          {nav.slice(3, 7).map(n => <SidebarItem key={n.id} {...n} active={page === n.id} onClick={() => setPage(n.id)} />)}
          <div style={{ fontSize: 10, color: BRAND.gray, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "12px 4px 8px" }}>System</div>
          {nav.slice(7).map(n => <SidebarItem key={n.id} {...n} active={page === n.id} onClick={() => setPage(n.id)} />)}
        </div>

        <div style={{ padding: "12px 16px", borderTop: `1px solid ${BRAND.grayLight}` }}>
          <button onClick={() => setLoggedIn(false)} style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", padding: "10px 14px", borderRadius: 10, border: "none", background: "#fef2f2", color: "#dc2626", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
            <LogOut size={16} />Sign Out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* HEADER */}
        <div style={{ background: "#fff", borderBottom: `1px solid ${BRAND.border}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ border: "none", background: "none", cursor: "pointer", display: "flex", padding: 4 }}>
            <Menu size={20} color={BRAND.gray} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Logo size={30} src={logoUrl} />
            <div style={{ fontSize: 15, fontWeight: 700, color: BRAND.dark }}>Sakthi Digital Flex</div>
            <span style={{ color: BRAND.gray }}>·</span>
            <div style={{ fontSize: 14, color: BRAND.gray }}>{pageTitle}</div>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 12, color: BRAND.gray, background: BRAND.grayLight, padding: "4px 10px", borderRadius: 8 }}>
            {new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
          </div>
          <button style={{ position: "relative", border: "none", background: BRAND.grayLight, borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Bell size={16} color={BRAND.gray} />
            {notif && <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderRadius: "50%", background: BRAND.orange, border: "2px solid #fff" }} />}
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND.grayLight, borderRadius: 10, padding: "6px 12px" }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: BRAND.blue, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#fff" }}>A</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: BRAND.dark }}>Admin</span>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: BRAND.dark }}>{pageTitle}</h1>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: BRAND.gray }}>
              {page === "dashboard" && "Overview of your business performance"}
              {page === "pos" && "Create a new sale and generate invoice instantly"}
              {page === "invoices" && "View, print, and manage all invoices"}
              {page === "products" && "Manage your product catalog and pricing"}
              {page === "customers" && "Manage your customer database"}
              {page === "expenses" && "Track and manage your shop expenses"}
              {page === "reports" && "Sales analytics and business insights"}
              {page === "settings" && "Configure your business profile and preferences"}
            </p>
          </div>

          {page === "dashboard" && <Dashboard products={products} customers={customers} sales={sales} logoUrl={logoUrl} />}
          {page === "pos" && <POSPage products={products} customers={customers} sales={sales} setSales={setSales} logoUrl={logoUrl} />}
          {page === "invoices" && <InvoicesPage sales={sales} setSales={setSales} logoUrl={logoUrl} />}
          {page === "products" && <ProductsPage products={products} setProducts={setProducts} />}
          {page === "customers" && <CustomersPage customers={customers} setCustomers={setCustomers} />}
          {page === "expenses" && <ExpensesPage expenses={expenses} setExpenses={setExpenses} />}
          {page === "reports" && <ReportsPage products={products} customers={customers} sales={sales} />}
          {page === "settings" && <SettingsPage logoUrl={logoUrl} setLogoUrl={setLogoUrl} />}
        </div>
      </div>
    </div>
  );
}
