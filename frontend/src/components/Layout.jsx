import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer className="footer">
        <div>
          <strong>InternHub</strong>
          <p>Student Internship Portal</p>
        </div>
        <p>© 2026 InternHub. Academic project.</p>
      </footer>
    </>
  );
}
