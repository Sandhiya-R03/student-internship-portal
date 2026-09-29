import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard(){
 const [stats,setStats]=useState({});
 const [data,setData]=useState([]);
 const [entity,setEntity]=useState("students");
 useEffect(()=>{api.get("/dashboard/").then(r=>setStats(r.data))},[]);
 useEffect(()=>{api.get(`/admin-data/${entity}/`).then(r=>setData(r.data))},[entity]);

 return <div className="container section">
  <div className="page-heading"><div><span className="eyebrow">ADMIN</span><h1>Portal Overview</h1><p>Manage users, companies, internships and applications.</p></div></div>
  <div className="stats-grid"><Stat label="Students" value={stats.students}/><Stat label="Companies" value={stats.companies}/><Stat label="Internships" value={stats.internships}/><Stat label="Applications" value={stats.applications}/></div>
  <div className="admin-tabs">{["students","companies","internships","applications"].map(x=><button className={entity===x?"active":""} onClick={()=>setEntity(x)} key={x}>{x}</button>)}</div>
  <div className="card table-card"><div className="table-wrap"><table><thead><tr>{data[0]&&Object.keys(data[0]).map(k=><th key={k}>{k.replaceAll("_"," ")}</th>)}</tr></thead><tbody>{data.map((row,i)=><tr key={i}>{Object.entries(row).map(([k,v])=><td key={k}>{String(v??"—")}</td>)}</tr>)}</tbody></table></div></div>
 </div>
}
function Stat({label,value}){return <div className="stat-card"><span>{label}</span><strong>{value??0}</strong></div>}
