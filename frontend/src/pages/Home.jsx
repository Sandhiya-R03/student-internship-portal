import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="hero">
        <div>
          <span className="eyebrow">STUDENT INTERNSHIP PORTAL</span>
          <h1>Find your next <span>internship opportunity.</span></h1>
          <p>
            Discover internships, connect with companies and track your applications
            from one simple platform.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/internships">Find Internships</Link>
            <Link className="button secondary" to="/register">Create Account</Link>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-icon">🎓</div>
          <h3>Build. Apply. Grow.</h3>
          <p>Turn your skills into real-world experience.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <span className="eyebrow">HOW IT WORKS</span>
          <h2>Three simple steps</h2>
        </div>
        <div className="feature-grid">
          <div className="card"><span className="step">01</span><h3>Create Profile</h3><p>Add your skills, education and resume.</p></div>
          <div className="card"><span className="step">02</span><h3>Find & Apply</h3><p>Search internships that match your interests.</p></div>
          <div className="card"><span className="step">03</span><h3>Track Progress</h3><p>Follow your application status in one place.</p></div>
        </div>
      </section>
    </div>
  );
}
