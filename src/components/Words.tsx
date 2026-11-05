import type { ElementType } from "react";

/** Splits text into masked words for the scroll reveal. Real text stays in the DOM. */
export default function Words({
  text,
  as: Tag = "span",
  className,
  id,
  step = 45,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <Tag className={`reveal${className ? ` ${className}` : ""}`} id={id} data-reveal="">
      {words.map((w, i) => (
        <span key={i}>
          <span className="w"><span className="wi" style={{ transitionDelay: `${i * step}ms` }}>{w}</span></span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
