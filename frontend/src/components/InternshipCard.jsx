import { Link } from "react-router-dom";

export default function InternshipCard({ internship }) {
  return (
    <article className="card internship-card">
      <div className="card-top">
        <span className="badge">{internship.work_mode}</span>
        <span className="muted">{internship.location}</span>
      </div>
      <h3>{internship.title}</h3>
      <p className="company">{internship.company_name}</p>
      <p className="muted">{internship.skills}</p>
      <div className="card-meta">
        <span>⏱ {internship.duration}</span>
        <span>💰 {internship.stipend}</span>
      </div>
      <Link className="button primary full" to={`/internships/${internship.id}`}>
        View Details
      </Link>
    </article>
  );
}
