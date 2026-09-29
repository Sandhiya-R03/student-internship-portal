import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function InternshipDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => { api.get(`/internships/${id}/`).then(r=>setItem(r.data)); }, [id]);

  const apply = async () => {
    try {
      await api.post(`/internships/${id}/apply/`);
      setMessage("Application submitted successfully.");
    } catch (e) {
      setMessage(e.response?.data?.detail || "Unable to apply.");
    }
  };

  if (!item) return <div className="container section">Loading...</div>;

  return (
    <div className="container section">
      <Link to="/internships">← Back to internships</Link>
      <div className="details-layout">
        <article className="card details-card">
          <span className="badge">{item.work_mode}</span>
          <h1>{item.title}</h1>
          <h3>{item.company_name}</h3>
          <div className="detail-meta"><span>📍 {item.location}</span><span>⏱ {item.duration}</span><span>💰 {item.stipend}</span></div>
          <h2>About the internship</h2><p>{item.description}</p>
          <h2>Required skills</h2><p>{item.skills}</p>
          <h2>Application deadline</h2><p>{item.deadline}</p>
        </article>
        <aside className="card apply-card">
          <h3>Ready to apply?</h3>
          <p>{item.openings} opening(s) available.</p>
          {user?.role === "student" ? <button className="button primary full" onClick={apply}>Apply Now</button> : <p className="muted">Login as a student to apply.</p>}
          {message && <div className="alert success">{message}</div>}
        </aside>
      </div>
    </div>
  );
}
