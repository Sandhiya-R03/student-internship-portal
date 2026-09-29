import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import InternshipCard from "../components/InternshipCard";

export default function Internships() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/internships/", { params: { search, work_mode: mode } });
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) load();
    else setLoading(false);
  }, [user]);

  if (!user) return <div className="empty-page"><h2>Login to browse internships</h2></div>;

  return (
    <div className="container section">
      <div className="page-heading">
        <div><span className="eyebrow">OPPORTUNITIES</span><h1>Find internships</h1><p>Search opportunities based on your skills and interests.</p></div>
      </div>
      <div className="search-panel">
        <input placeholder="Search title, company or skill..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&load()}/>
        <select value={mode} onChange={e=>{setMode(e.target.value); setTimeout(load, 0)}}>
          <option value="">All work modes</option><option>Online</option><option>Offline</option><option>Hybrid</option>
        </select>
        <button className="button primary" onClick={load}>Search</button>
      </div>
      {loading ? <p>Loading internships...</p> : items.length ? <div className="internship-grid">{items.map(i=><InternshipCard key={i.id} internship={i}/>)}</div> : <div className="empty-card">No internships found.</div>}
    </div>
  );
}
