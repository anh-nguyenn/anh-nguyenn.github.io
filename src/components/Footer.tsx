export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Jerry Nguyen</p>
        <div className="footer-links">
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
