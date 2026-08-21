"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {ArrowLeft,Brain} from "lucide-react";
import {FALLBACK,Country} from "../../../lib/countries";
import {useLanguage} from "../../i18n";

function countryLabel(c:Country,lang:string){try{return new Intl.DisplayNames([lang==="bn"?"bn":"en"],{type:"region"}).of(c.cca2)||c.name}catch{return c.name}}
const regionBn:Record<string,string>={Africa:"আফ্রিকা",Americas:"আমেরিকা",Asia:"এশিয়া",Europe:"ইউরোপ",Oceania:"ওশেনিয়া"};

export default function CountryPage({params}:{params:Promise<{code:string}>}){
  const {lang,t}=useLanguage();
  const [countries,setCountries]=useState<Country[]>(FALLBACK);
  const [loading,setLoading]=useState(true);
  const [code,setCode]=useState("");

  useEffect(()=>{params.then(p=>setCode(p.code.toUpperCase()))},[params]);
  useEffect(()=>{fetch("/api/countries").then(r=>r.ok?r.json():Promise.reject()).then(data=>setCountries(data)).catch(()=>setCountries(FALLBACK)).finally(()=>setLoading(false))},[]);

  const c=countries.find(x=>x.cca2===code);
  if(loading)return <main className="container" style={{padding:"70px 0"}}><h1>{lang==="bn"?"তথ্য আনা হচ্ছে…":"Loading…"}</h1></main>;
  if(!c)return <main className="container" style={{padding:"70px 0"}}><h1>{t.notFound}</h1><Link href="/learn">{t.back}</Link></main>;

  const currency=c.currencies?Object.values(c.currencies)[0]:undefined;
  const languages=c.languages?Object.values(c.languages).join(", "):undefined;
  const localizedRegion=lang==="bn"?(regionBn[c.region]||c.region):c.region;

  return <main style={{padding:"44px 0 80px"}}><div className="container">
    <Link href="/learn" style={{display:"inline-flex",gap:7,alignItems:"center",textDecoration:"none",color:"#667085",fontWeight:700}}><ArrowLeft size={17}/> {t.back}</Link>
    <section className="card" style={{marginTop:22,padding:28,display:"grid",gridTemplateColumns:"minmax(260px,420px) 1fr",gap:36,alignItems:"center"}}>
      <img src={c.flag} alt={`${countryLabel(c,lang)} flag`} className="flag" style={{width:"100%",maxHeight:270}}/>
      <div><div style={{color:"#2563eb",fontWeight:800}}>{localizedRegion}</div><h1 style={{fontSize:50,letterSpacing:"-2px",margin:"8px 0"}}>{countryLabel(c,lang)}</h1><p style={{color:"#667085",fontSize:16}}>{lang==="bn"?"এই দেশ সম্পর্কে গুরুত্বপূর্ণ তথ্য জানুন।":c.officialName||`Learn about ${c.name}`}</p><Link href="/quiz" style={{display:"inline-flex",alignItems:"center",gap:8,marginTop:12,background:"#2563eb",color:"white",padding:"12px 16px",borderRadius:12,textDecoration:"none",fontWeight:800}}><Brain size={18}/> {t.test}</Link></div>
    </section>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:14,marginTop:18}}>{[[t.capital,c.capital?.join(", ")||"—"],[t.region,localizedRegion],[t.subregion,c.subregion||"—"],[t.population,c.population?.toLocaleString(lang==="bn"?"bn-BD":"en-US")||"—"],[t.currency,currency?`${currency.name}${currency.symbol?` (${currency.symbol})`:""}`:"—"],[t.languages,languages||"—"],[t.code,c.cca2]].map(([k,v])=><div className="card" key={k} style={{padding:20}}><div style={{fontSize:13,color:"#667085",fontWeight:700}}>{k}</div><div style={{fontSize:18,fontWeight:800,marginTop:7}}>{v}</div></div>)}</div>
  </div></main>
}
