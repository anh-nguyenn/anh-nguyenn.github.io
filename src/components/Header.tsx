import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <Link className="site-logo" href="/" aria-label="Jerry Nguyen Tuan Anh, home">
          Jerry Nguyen
        </Link>
        <nav aria-label="Primary navigation">
          <Link href="/#work">Work</Link>
          <Link href="/#education">Education</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
