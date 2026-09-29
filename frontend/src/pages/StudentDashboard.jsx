import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function StudentDashboard() {
  const [stats, setStats] = useState({});
  const [apps, setApps] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/dashboard/"), api.get("/applications/mine/")]).then(([s,a]) => {
      setStats(s.data); setApps(a.data);
    });
  }, []);

  return (
    <div className="container section">
      <div className="page-heading"><div><span className="eyebrow">STUDENT DASHBOARD</span><h1>Welcome back 👋</h1><p>Keep track of your internship journey.</p></div><Link className="button primary" to="/internships">Browse Internships</Link></div>
      <div className="stats-grid">
        <Stat label="Applications" value={stats.total_applications}/><Stat label="Shortlisted" value={stats.shortlisted}/><Stat label="Interviews" value={stats.interviews}/><Stat label="Selected" value={stats.selected}/>
      </div>
      <div className="card table-card"><div className="card-header"><h2>My Applications</h2></div>
        {apps.length ? <div className="table-wrap"><table><thead><tr><th>Internship</th><th>Company</th><th>Date</th><th>Status</th></tr></thead><tbody>{apps.map(a=><tr key={a.id}><td>{a.internship_title}</td><td>{a.company_name}</td><td>{new Date(a.applied_date).toLocaleDateString()}</td><td><span className={`status ${a.status.toLowerCase()}`}>{a.status}</span></td></tr>)}</tbody></table></div> : <div className="empty-card">You have not applied to any internships yet.</div>}
      </div>
    </div>
  );
}
function Stat({label,value}) { return <div className="stat-card"><span>{label}</span><strong>{value ?? 0}</strong></div>; }
