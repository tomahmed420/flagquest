"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { FALLBACK, Country } from "../../lib/countries";

const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function Learn() {
  const [countries, setCountries] = useState<Country[]>(FALLBACK);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");

  useEffect(() => {
    fetch("/api/countries")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setCountries(data))
      .catch(() => setCountries(FALLBACK));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      const matchesQuery = !q || c.name.toLowerCase().includes(q) || c.cca2.toLowerCase() === q;
      const matchesRegion = region === "All" || c.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [countries, query, region]);

  return (
    <main style={{ padding: "44px 0 80px" }}>
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div style={{ color: "#2563eb", fontWeight: 800 }}>LEARN</div>
          <h1 style={{ fontSize: "clamp(38px,6vw,56px)", letterSpacing: "-2px", margin: "8px 0 12px" }}>Explore countries</h1>
          <p style={{ color: "#667085", fontSize: 17 }}>Browse countries around the world, discover their flags, capitals and key facts.</p>
        </div>

        <div className="card" style={{ margin: "28px 0 14px", padding: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <Search size={20} color="#667085" />
          <input aria-label="Search countries" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${countries.length} countries...`} style={{ border: 0, outline: 0, width: "100%", fontSize: 16, background: "transparent" }} />
        </div>

        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 22 }}>
          <SlidersHorizontal size={18} style={{ flex: "0 0 auto", marginTop: 10 }} color="#667085" />
          {regions.map((r) => <button key={r} onClick={() => setRegion(r)} style={{ flex: "0 0 auto", border: "1px solid", borderColor: region === r ? "#2563eb" : "#e5e7eb", background: region === r ? "#eff6ff" : "white", color: region === r ? "#1d4ed8" : "#344054", borderRadius: 999, padding: "9px 14px", fontWeight: 750 }}>{r}</button>)}
        </div>

        <div style={{ marginBottom: 14, color: "#667085", fontSize: 14, fontWeight: 700 }}>{filtered.length} {filtered.length === 1 ? "country" : "countries"} found</div>
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center" }}><h2>No countries found</h2><p style={{ color: "#667085" }}>Try another search or region.</p></div>
        ) : (
          <div className="country-grid">{filtered.map((c) => (
            <Link href={`/learn/${c.cca2.toLowerCase()}`} key={c.cca2} className="card country-card" style={{ padding: 14, textDecoration: "none", color: "inherit" }}>
              <img src={c.flag} alt={`${c.name} flag`} className="flag" style={{ width: "100%", height: 105, display: "block" }} />
              <div style={{ fontWeight: 800, fontSize: 17, marginTop: 13 }}>{c.name}</div>
              <div style={{ color: "#667085", fontSize: 13, marginTop: 4 }}>{c.region}{c.capital?.[0] ? ` · ${c.capital[0]}` : ""}</div>
            </Link>
          ))}</div>
        )}
      </div>
    </main>
  );
}
