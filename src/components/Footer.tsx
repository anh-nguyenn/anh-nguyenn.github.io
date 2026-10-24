export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">JN/WAFER · Singapore</p>
        <p>© {new Date().getFullYear()} Jerry Nguyen Tuan Anh</p>
        <div className="footer-links" aria-label="Social links">
          <a href="https://github.com/jerrynguyentuananh" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/jerrynguyentuananh/" rel="noreferrer">LinkedIn</a>
          <a href="mailto:nguyentuananh.kmf@gmail.com">Email</a>
        </div>
      </div>
    </footer>
  );
}
