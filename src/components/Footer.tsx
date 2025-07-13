import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="mt-4 py-6 text-center text-sm text-gray-500 px-4 border-t
            dark:border-gray-800 border-gray-300 dark:bg-black"
      id="footerGlanceOfMyStory"
    >
      <div className="flex justify-center gap-6 mb-2 text-lg">
        <Link
          href="https://github.com/jerrynguyentuananh"
          aria-label="GitHub"
          className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://www.linkedin.com/in/jerrynguyentuananh/"
          aria-label="LinkedIn"
          className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="mailto:nguyentuananh.kmf@gmail.com"
          target="_blank"
          aria-label="Email"
          className="hover:text-blue-500 transition-transform hover:scale-125 duration-200"
        >
          <FaEnvelope />
        </Link>
      </div>
    </footer>
  );
}
