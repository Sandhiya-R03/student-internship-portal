import { useEffect, useState } from "react";
import api from "../services/api";

export default function StudentProfile() {
  const [form, setForm] = useState({phone:"",college:"",department:"",year:3,cgpa:"",skills:"",linkedin:"",github:""});
  const [message,setMessage]=useState("");

  useEffect(()=>{api.get("/auth/student-profile/").then(r=>setForm({
    phone:r.data.phone||"",college:r.data.college||"",department:r.data.department||"",
    year:r.data.year||3,cgpa:r.data.cgpa||"",skills:r.data.skills||"",linkedin:r.data.linkedin||"",github:r.data.github||""
  }))},[]);

  const save=async e=>{
    e.preventDefault();
    const {data}=await api.put("/auth/student-profile/",form);
    setForm({...form,...data}); setMessage("Profile updated successfully.");
  };

  return <div className="container section narrow"><div className="page-heading"><div><span className="eyebrow">PROFILE</span><h1>Student Profile</h1></div></div>
    <form className="form-card wide" onSubmit={save}>
      {message&&<div className="alert success">{message}</div>}
      <div className="form-grid">
        <label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
        <label>College<input value={form.college} onChange={e=>setForm({...form,college:e.target.value})}/></label>
        <label>Department<input value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/></label>
        <label>Year<input type="number" min="1" max="5" value={form.year} onChange={e=>setForm({...form,year:e.target.value})}/></label>
        <label>CGPA<input type="number" min="0" max="10" step="0.01" value={form.cgpa} onChange={e=>setForm({...form,cgpa:e.target.value})}/></label>
        <label>LinkedIn<input value={form.linkedin} onChange={e=>setForm({...form,linkedin:e.target.value})}/></label>
        <label>GitHub<input value={form.github} onChange={e=>setForm({...form,github:e.target.value})}/></label>
      </div>
      <label>Skills<textarea rows="4" value={form.skills} onChange={e=>setForm({...form,skills:e.target.value})}/></label>
      <button className="button primary">Save Profile</button>
    </form>
  </div>;
}
