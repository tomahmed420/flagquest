import {getIsoFallback} from "./iso-fallback";
export type Country={name:string;officialName?:string;cca2:string;flag:string;capital?:string[];region:string;subregion?:string;population?:number;currencies?:Record<string,{name:string;symbol?:string}>;languages?:Record<string,string>};

export const FALLBACK:Country[]=getIsoFallback("en");

export async function getCountries():Promise<Country[]>{
  try{
    const r=await fetch("https://restcountries.com/v3.1/all?fields=name,flags,cca2,capital,region,subregion,population,currencies,languages",{next:{revalidate:86400}});
    if(!r.ok) throw new Error(`Country API ${r.status}`);
    const data=await r.json();
    const countries=data.map((c:any)=>({name:c.name?.common,officialName:c.name?.official,cca2:c.cca2,flag:c.flags?.svg||c.flags?.png,capital:c.capital,region:c.region||"",subregion:c.subregion,population:c.population,currencies:c.currencies,languages:c.languages})).filter((c:Country)=>c.name&&c.cca2&&c.flag);
    if(countries.length<200) throw new Error("Incomplete country dataset");
    return countries.sort((a:Country,b:Country)=>a.name.localeCompare(b.name));
  }catch{return FALLBACK;}
}
