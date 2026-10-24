import Link from "next/link";

export default function Header() {
  return (
    <header className="status-bar">
      <div className="status-inner container">
        <Link className="brand" href="/" aria-label="Jerry Nguyen, home">
          JN<span aria-hidden="true">/</span>WAFER
        </Link>
        <p className="status-line">Applied ML · Analytics · Operations</p>
        <nav aria-label="Primary navigation">
          <Link href="/#record">Record</Link>
          <Link href="/#recognition">Inspection</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
