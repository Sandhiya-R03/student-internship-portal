import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function CompanyDashboard() {
  const [stats,setStats]=useState({});
  const [apps,setApps]=useState([]);
  const [form,setForm]=useState({title:"",description:"",skills:"",location:"",work_mode:"Hybrid",duration:"3 Months",stipend:"₹8,000/month",openings:1,deadline:""});
  const [message,setMessage]=useState("");

  const load=()=>Promise.all([api.get("/dashboard/"),api.get("/applications/company/")]).then(([s,a])=>{setStats(s.data);setApps(a.data)});
  useEffect(()=>{load()},[]);

  const create=async e=>{
    e.preventDefault(); setMessage("");
    try { await api.post("/internships/",form); setMessage("Internship posted successfully."); setForm({...form,title:"",description:"",skills:"",location:"",deadline:""}); }
    catch(e){setMessage("Please check the form and try again.");}
  };

  const status=async(id,value)=>{await api.patch(`/applications/${id}/status/`,{status:value});load()};

  return <div className="container section">
    <div className="page-heading"><div><span className="eyebrow">COMPANY DASHBOARD</span><h1>Manage your internships</h1></div></div>
    <div className="stats-grid"><Stat label="Internships" value={stats.total_internships}/><Stat label="Active" value={stats.active_internships}/><Stat label="Applications" value={stats.total_applications}/><Stat label="Selected" value={stats.selected}/></div>
    <div className="two-col">
      <form className="form-card" onSubmit={create}><h2>Post Internship</h2>{message&&<div className="alert success">{message}</div>}
        <label>Title<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></label>
        <label>Description<textarea required rows="4" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></label>
        <label>Skills<input required value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></label>
        <label>Location<input required value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></label>
        <div className="form-grid"><label>Work Mode<select value={form.work_mode} onChange={e=>setForm({...form,work_mode:e.target.value})}><option>Online</option><option>Offline</option><option>Hybrid</option></select></label><label>Deadline<input type="date" required value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/></label></div>
        <div className="form-grid"><label>Duration<input value={form.duration} onChange={e=>setForm({...form,duration:e.target.value})}/></label><label>Stipend<input value={form.stipend} onChange={e=>setForm({...form,stipend:e.target.value})}/></label></div>
        <label>Openings<input type="number" min="1" value={form.openings} onChange={e=>setForm({...form,openings:e.target.value})}/></label>
        <button className="button primary full">Post Internship</button>
      </form>
      <div className="card table-card"><div className="card-header"><h2>Applications</h2></div>{apps.length?<div className="table-wrap"><table><thead><tr><th>Student</th><th>Internship</th><th>Status</th><th>Update</th></tr></thead><tbody>{apps.map(a=><tr key={a.id}><td>{a.student_name}</td><td>{a.internship_title}</td><td><span className={`status ${a.status.toLowerCase()}`}>{a.status}</span></td><td><select value={a.status} onChange={e=>status(a.id,e.target.value)}>{["Applied","Shortlisted","Interview","Selected","Rejected"].map(s=><option key={s}>{s}</option>)}</select></td></tr>)}</tbody></table></div>:<div className="empty-card">No applications yet.</div>}</div>
    </div>
  </div>;
}
function Stat({label,value}){return <div className="stat-card"><span>{label}</span><strong>{value??0}</strong></div>}
